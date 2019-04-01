import React from 'react';
import { Spin, Button, Input, Form, Radio, Upload, Icon, notification } from 'antd';
import RichText from '../../../components/RichText';
import { getRequest, postRequest, jsonString, http } from '@/utils/api';

import { PAYMENT_DETAIL, PAYMENT_ADD, PAYMENT_EDIT } from '@/services/SysInterface';

const styles = require('./NoticeAdd.less');

class NoticeAdd extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      fileList: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.id > 0) {
      const data = await getRequest(`${PAYMENT_DETAIL}?id=${this.props.id}`);
      if (data.status === 200) {
        this.props.form.setFieldsValue({
          entryName: data.data.entryName.toString(),
          paymentInstructions: data.data.paymentInstructions.toString(),
          paymentObject: data.data.paymentObject,
          releaseStatus: data.data.releaseStatus,
        });
        this.setState({ list: data.data.list });
      }
    }
  };

  /**
   * 上传附件
   */
  upLoadChange = info => {
    if (info.file.status !== 'uploading') {
      this.setState({ fileList: info.fileList });
    }
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
      this.setState({
        buttonLoading: true,
      });
      const json = this.props.form.getFieldsValue();
      jsonString(json);
      json.list = this.state.list;
      let data = {};
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(PAYMENT_EDIT, json);
      } else {
        data = await postRequest(PAYMENT_ADD, json);
      }
      this.setState({
        buttonLoading: false,
      });
      if (data.status === 200) {
        notification.success({ message: data.msg });
        this.props.callback(true);
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
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
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>通告信息</span>
            </div>

            <Form.Item label="类型" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('releaseStatus', {
                rules: [
                  {
                    required: true,
                    message: '请选择类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>新闻</Radio>
                  <Radio value={1}>公告</Radio>
                  <Radio value={2}>通知</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <div className={styles.rowDom}>
              <span>
                <span style={{ color: 'f00' }}>*</span>发送人：
              </span>
              <span>请选择</span>
            </div>

            <Form.Item label="标题" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('entryName', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input disabled={this.props.id > 0} placeholder="请输入标题" />)}
            </Form.Item>

            <div className={styles.rowDom}>
              <span>
                <span style={{ color: 'f00' }}>*</span>内容：
              </span>
              <div className={styles.colDom}>
                <RichText />
              </div>
            </div>

            <div className={styles.rowDom}>
              <span>
                <span style={{ color: 'f00' }}>*</span>上传附件：
              </span>
              <div className={styles.colDom}>
                <Upload action={`${http}/file/fileUploader`} onChange={this.upLoadChange}>
                  {this.state.fileList < 1 && (
                    <Button>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  )}
                </Upload>
              </div>
            </div>

            <Form.Item label="是否立即发布" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('paymentObject', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否立即发布',
                  },
                ],
              })(
                <Radio.Group disabled={this.props.id > 0}>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
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

const NoticeAddComponent = Form.create()(NoticeAdd);

export default NoticeAddComponent;
