import React from 'react';
import { Spin, Button, Input, Form, Select, notification } from 'antd';
import UploadImg from '../../components/UpLoad/UploadImage';
import MemList from './components/MemList';
import { postRequest, jsonString, verVal } from '@/utils/api';

import { SYS_Dict, MOVE_IN } from '@/services/SysInterface';

const styles = require('./index.less');

class MoveIn extends React.Component {
  homePicture = '';

  indexPictures = '';

  constructor(props) {
    super(props);
    this.state = {
      queueArr: [],
      buttonLoading: false,
      loading: false,
      getList: false,
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
    // 大队列表
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      this.setState({ queueArr: queueArr.data });
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
      this.state.list.forEach(item => {
        if (item.idNumber.toString().length < 14) {
          flag = false;
        }
      });
      if (!flag) {
        notification.error({ message: '请输入正确的身份证号' });
        return;
      }
      this.setState({
        buttonLoading: true,
      });
      let json = this.props.form.getFieldsValue();
      jsonString(json);
      json = {
        ...json,
        list: this.state.list,
        homePicture: this.homePicture,
        indexPictures: this.indexPictures,
      };
      const data = await postRequest(MOVE_IN, json);
      this.setState({
        buttonLoading: false,
      });
      if (data.status === 200) {
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
          <MemList getList={this.state.getList} onListCall={this.onListCall} />
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
