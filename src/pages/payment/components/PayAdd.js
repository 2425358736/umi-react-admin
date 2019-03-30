import React from 'react';
import { Spin, Button, Input, Form, Radio, notification } from 'antd';
import { getRequest, postRequest, jsonString } from '@/utils/api';

import { PAYMENT_DETAIL, PAYMENT_ADD, PAYMENT_EDIT } from '@/services/SysInterface';

const styles = require('./PayAdd.less');

class PayAdd extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      list: [
        {
          money: '',
          unit: '',
        },
      ],
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
   * 添加缴费标准
   */
  addList = () => {
    const { list } = this.state;
    const listClone = JSON.parse(JSON.stringify(list));
    listClone.push({
      money: '',
      unit: '',
    });
    this.setState({ list: listClone });
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
              <span>项目信息</span>
            </div>

            <Form.Item label="项目名称" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('entryName', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目名称',
                  },
                ],
              })(<Input disabled={this.props.id > 0} placeholder="请输入项目名称" />)}
            </Form.Item>

            <Form.Item label="项目说明" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('paymentInstructions', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目说明',
                  },
                ],
              })(<Input.TextArea autosize={{ minRows: 4 }} placeholder="请输入项目说明" />)}
            </Form.Item>

            {this.state.list.map((item, index) => {
              const that = this;
              return (
                <div className={styles.rowDom} key={index.toString()}>
                  <span>
                    <span style={{ color: 'f00' }}>*</span>缴费标准：
                  </span>
                  <div className={styles.colDom}>
                    <Input
                      value={item.money}
                      disabled={this.props.id > 0}
                      onChange={e => {
                        const { list } = that.state;
                        list[index].money = e.target.value;
                        this.setState({
                          list,
                        });
                      }}
                    />
                  </div>
                  <div className={styles.colDom}>
                    <Input
                      value={item.unit}
                      disabled={this.props.id > 0}
                      onChange={e => {
                        const { list } = that.state;
                        list[index].unit = e.target.value;
                        this.setState({
                          list,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {!this.props.id > 0 && (
              <div onClick={this.addList} className={styles.addDiv}>
                + 添加
              </div>
            )}

            <Form.Item label="缴费对象" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('paymentObject', {
                rules: [
                  {
                    required: true,
                    message: '请选择缴费对象',
                  },
                ],
              })(
                <Radio.Group disabled={this.props.id > 0}>
                  <Radio value={0}>每户</Radio>
                  <Radio value={1}>个人</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="状态" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('releaseStatus', {
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
