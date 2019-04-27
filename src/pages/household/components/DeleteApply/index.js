import React from 'react';
import moment from 'moment';
import { Spin, Button, Form, Select, Input, notification } from 'antd';
import NowMemList from './components/NowMemList';
import { getRequest, postRequest, deleteRequest, IdentityCodeValid } from '@/utils/api';

import { HOUSEHOLD_DETAIL, DELETE_MEMBER, SYS_Dict } from '@/services/SysInterface';

const styles = require('./index.less');

class DeleteApply extends React.Component {
  indexPictures = '';

  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
      moveOutTypeArr: [],
      buttonLoading: false,
      loading: false,
      getList: false,
    };
  }

  componentDidMount = async () => {
    // 迁出类型列表
    const moveOutTypeArr = await postRequest(`${SYS_Dict}/12`);
    if (moveOutTypeArr.status === 200) {
      this.setState({ moveOutTypeArr: moveOutTypeArr.data });
    }
    const data = await getRequest(`${HOUSEHOLD_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      this.indexPictures = data.data.indexPictures;
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  /**
   * 列表回调
   */
  onListCall = list => {
    this.setState({
      list,
      getList: false,
    });
  };

  /**
   * 提交
   */
  handleSubmit = async () => {
    await this.setState({ getList: true });
    let flag = true;
    this.state.list.forEach(item => {
      if (!IdentityCodeValid(item.idNumber)) {
        notification.error({ message: `${item.idNumber}身份证号不正确` });
        flag = false;
      }
    });

    let moveOutDate = this.props.form.getFieldValue('moveOutDate');
    const moveOutType = this.props.form.getFieldValue('moveOutType');

    if (moveOutDate) {
      moveOutDate = moment(moveOutDate, 'YYYYMMDD').format('YYYY-MM-DD');
      if (moveOutDate === 'Invalid date') {
        flag = false;
        moveOutDate = null;
        notification.error({ message: '迁出日期格式不正确，示例（2019年01月25日）：20190125' });
      }
    }

    if (!flag) {
      return;
    }
    this.setState({
      buttonLoading: true,
    });

    const data = await deleteRequest(
      `${DELETE_MEMBER}?id=${this.props.id}&moveOutDate=${moveOutDate}&moveOutType=${moveOutType}`
    );
    this.setState({
      buttonLoading: false,
    });
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.props.callback(true);
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
      this.props.callback(false);
    }
  };

  /**
   * 取消
   */
  handleCancel = () => {
    this.props.callback(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fetchData } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.subApplyWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>户口簿信息</span>
          </div>
          <ul className={styles.applyUl}>
            <li>
              <span>编号:</span>
              <span>{fetchData.householdNumber}</span>
            </li>
            <li>
              <span>几队:</span>
              <span>{fetchData.troopsStr}</span>
            </li>
            <li>
              <span>户别:</span>
              <span>{fetchData.householdTypeStr}</span>
            </li>
            <li>
              <span>户号:</span>
              <span>{fetchData.householdRegisterNumber}</span>
            </li>
            <li>
              <span>住址:</span>
              <span>{fetchData.homeAddress}</span>
            </li>
            <li>
              <span>证件:</span>
              <ul>
                <li>
                  <div className={styles.imgWrap}>
                    <img src={fetchData.homePicture} alt="" />
                  </div>
                  <p>户主页</p>
                </li>
                <li>
                  <div className={styles.imgWrap}>
                    <img src={fetchData.homePicture} alt="" />
                  </div>
                  <p>索引页</p>
                </li>
              </ul>
            </li>
          </ul>

          <div className={styles.formWrap}>
            <Form>
              <Form.Item
                className={styles.inputDom}
                label="迁出日期"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                {getFieldDecorator('moveOutDate', {
                  rules: [
                    {
                      required: false,
                      message: '请输入迁出日期',
                    },
                  ],
                })(<Input placeholder="请输入迁出日期" />)}
              </Form.Item>
              <Form.Item
                className={styles.inputDom}
                label="迁出类型"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                {getFieldDecorator('moveOutType', {
                  rules: [
                    {
                      required: false,
                      message: '请选择迁出类型',
                    },
                  ],
                })(
                  <Select showSearch placeholder="请选择迁出类型" optionFilterProp="children">
                    {this.state.moveOutTypeArr.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.dataLabel}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Form>
          </div>

          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>当前成员列表</span>
          </div>
          {fetchData && fetchData.id > 0 && (
            <NowMemList
              list={fetchData.listMember}
              getList={this.state.getList}
              onListCall={this.onListCall}
            />
          )}

          {/* 分割线 */}

          <div className={styles.btnGroup}>
            <Button
              className={styles.submitBtn}
              loading={this.state.buttonLoading}
              onClick={this.handleSubmit}
              type="primary"
            >
              提交
            </Button>
            <Button onClick={this.handleCancel} className={styles.cancelBtn}>
              取消
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}

const DeleteApplyComponent = Form.create()(DeleteApply);
export default DeleteApplyComponent;
