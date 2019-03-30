import React from 'react';
import { Spin, Button, Input, Form, Radio, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { ADD_GROUP } from '@/services/SysInterface';

const styles = require('./PayAdd.less');

class PayAdd extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      sex: 1,
    });
  }

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
      json.memberId = this.memberId;
      const data = await postRequest(ADD_GROUP, json);
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
              <span>项目信息</span>
            </div>

            <Form.Item label="项目名称" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('idNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目名称',
                  },
                ],
              })(<Input placeholder="请输入项目名称" />)}
            </Form.Item>

            <Form.Item label="项目说明" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('idNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目说明',
                  },
                ],
              })(<Input.TextArea autosize={{ minRows: 4 }} placeholder="请输入项目说明" />)}
            </Form.Item>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="缴费标准" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,
                        message: '请输入缴费标准',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('nationalities', {
                    rules: [
                      {
                        required: true,
                        message: '请输入缴费标准',
                      },
                    ],
                  })(<Input style={{ width: '404px' }} />)}
                </Form.Item>
              </div>
            </div>

            <Form.Item label="缴费对象" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: '请选择缴费对象',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>个人</Radio>
                  <Radio value={1}>每户</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="状态" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: '请选择状态',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>发布</Radio>
                  {this.props.id > 0 ? (
                    <Radio value={2}>结束</Radio>
                  ) : (
                    <Radio value={0}>不发布</Radio>
                  )}
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

const PayAddComponent = Form.create()(PayAdd);

export default PayAddComponent;
