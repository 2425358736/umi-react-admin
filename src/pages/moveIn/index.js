import React from 'react';
import { Spin, Button, Input, Form, Select, notification } from 'antd';
import moment from 'moment';
import UploadImg from '../../components/UpLoad/UploadImage';
import MemList from './components/MemList';
import { postRequest, verVal, IdentityCodeValid } from '@/utils/api';

import { SYS_Dict, MOVE_IN } from '@/services/SysInterface';

const styles = require('./index.less');

class MoveIn extends React.Component {
  homePicture = '';

  indexPictures = '';

  constructor(props) {
    super(props);
    this.state = {
      queueArr: [],
      moveInTypeArr: [],
      buttonLoading: false,
      loading: false,
      getList: false,
      listNull: false,
    };
  }

  componentDidMount = () => {
    this.init();
  };

  /**
   * 初始化数据
   */
  init = async () => {
    this.setState({ loading: true });
    // 几队列表
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      this.setState({ queueArr: queueArr.data });
    }
    // 迁入类型列表
    const moveInTypeArr = await postRequest(`${SYS_Dict}/11`);
    if (moveInTypeArr.status === 200) {
      this.setState({ moveInTypeArr: moveInTypeArr.data });
    }

    this.setState({ loading: false });
  };

  /**
   * 户主页上传图片回调
   */
  uploadCallback = url => {
    this.homePicture = url;
  };

  /**
   * 索引页上传图片回调
   */
  uploadCallback2 = url => {
    this.indexPictures = url;
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
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    const obj = this.props.form.getFieldsValue();
    let { moveInDate } = obj;
    if (moveInDate) {
      moveInDate = moment(moveInDate, 'YYYYMMDD').format('YYYY-MM-DD');
      if (moveInDate === 'Invalid date') {
        adopt = false;
        moveInDate = null;
        notification.error({ message: '迁入日期格式不正确，示例（2019年01月25日）：20190125' });
      }
    }
    if (adopt) {
      if (!verVal(this.homePicture)) {
        notification.error({ message: '请上传户主页' });
        return;
      }
      if (!verVal(this.indexPictures)) {
        notification.error({ message: '请上传索引页' });
        return;
      }
      await this.setState({ getList: true });
      let flag = true;
      const list = [...this.state.list];
      for (let i = 0, len = list.length; i < len; i += 1) {
        if (!verVal(list[i].fullName)) {
          notification.error({ message: `请输入姓名` });
          flag = false;
          return;
        }
        if (!verVal(list[i].nationalities)) {
          notification.error({ message: `请选择民族` });
          flag = false;
          return;
        }
        if (!verVal(list[i].idNumber) || !IdentityCodeValid(list[i].idNumber)) {
          notification.error({ message: `${list[i].idNumber}身份证号不正确` });
          flag = false;
          return;
        }
        if (!verVal(list[i].memberPictures)) {
          notification.error({ message: `请上传${list[i].fullName}的个人单页` });
          flag = false;
          return;
        }
      }
      if (!flag) {
        return;
      }
      this.setState({
        buttonLoading: true,
      });
      let json = this.props.form.getFieldsValue();
      json = {
        ...json,
        list: this.state.list,
        homePicture: this.homePicture,
        indexPictures: this.indexPictures,
        moveInDate,
      };
      const data = await postRequest(MOVE_IN, json);
      this.setState({
        buttonLoading: false,
      });
      if (data.status === 200) {
        this.props.form.resetFields();
        this.homePicture = '';
        this.indexPictures = '';
        this.setState({
          listNull: true,
        });
        notification.success({ message: data.msg });
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.moveInWrap}>
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>户口簿信息</span>
            </div>
            <Form.Item
              className={styles.inputDom}
              label="几队"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('troops', {
                rules: [
                  {
                    required: true,
                    message: '请选择几队',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择几队" optionFilterProp="children">
                  {this.state.queueArr.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.dataLabel}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              className={styles.inputDom}
              label="户别"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('householdType', {
                rules: [
                  {
                    required: true,
                    message: '请选择户别',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择户别" optionFilterProp="children">
                  <Select.Option key={0} value={0}>
                    家庭户
                  </Select.Option>
                  <Select.Option key={1} value={1}>
                    集体户
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              className={styles.inputDom}
              label="户号"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('householdRegisterNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入户号',
                  },
                ],
              })(<Input placeholder="请输入户号" />)}
            </Form.Item>
            <Form.Item
              className={styles.inputDom}
              label="住址"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('homeAddress', {
                rules: [
                  {
                    required: true,
                    message: '请输入住址',
                  },
                ],
              })(<Input placeholder="请输入住址" />)}
            </Form.Item>
            <Form.Item
              className={styles.inputDom}
              label="迁入日期"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('moveInDate', {
                rules: [
                  {
                    required: false,
                    message: '请输入迁入日期',
                  },
                ],
              })(<Input placeholder="请输入迁入日期" />)}
            </Form.Item>
            <Form.Item
              className={styles.inputDom}
              label="迁入类型"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('moveInType', {
                rules: [
                  {
                    required: false,
                    message: '请选择迁入类型',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择迁入类型" optionFilterProp="children">
                  {this.state.moveInTypeArr.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.dataLabel}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <div className={styles.uploadWrap}>
              <h4>
                <span className={styles.starDom}>*</span>证件上传：
              </h4>
              <div className={styles.imgWrap}>
                <UploadImg fileList={this.homePicture} callback={this.uploadCallback} />
                <p>户主页</p>
              </div>
              <div className={styles.imgWrap}>
                <UploadImg fileList={this.indexPictures} callback={this.uploadCallback2} />
                <p>索引页</p>
              </div>
            </div>
          </Form>
          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>成员列表</span>
          </div>
          <MemList
            getList={this.state.getList}
            onListCall={this.onListCall}
            listNull={this.state.listNull}
          />
          <div className={styles.btnGroup}>
            <Button
              className={styles.submitBtn}
              loading={this.state.buttonLoading}
              onClick={this.handleSubmit}
              type="primary"
            >
              提交
            </Button>
            {/* <Button onClick={this.handleCancel} className={styles.cancelBtn}> */}
            {/* 取消 */}
            {/* </Button> */}
          </div>
        </div>
      </Spin>
    );
  }
}

const MoveInComponent = Form.create()(MoveIn);

export default MoveInComponent;
