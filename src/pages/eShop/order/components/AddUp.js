/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Select } from 'antd';
import { postRequest, getRequest } from '@/utils/api';

import { GetEShopOrder, EShopOrderModify } from '../Service';

import { SYS_Dict } from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measureArr: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentWillMount = () => {
    this.getDict();
  };

  componentDidMount() {
    this.initialization();
  }

  getDict = async () => {
    const measureArr = await postRequest(`${SYS_Dict}/22`);
    this.setState({
      measureArr: measureArr.data,
    });
  };

  initialization = async () => {
    this.props.form.resetFields();
    this.setState({ loading: true });
    let data = await getRequest(`${GetEShopOrder}?id=${this.props.id}`);
    data = data.data;
    this.props.form.setFieldsValue({
      receiveName: data.receiveName,
      receivePhone: data.receivePhone,
      receiveAddress: data.receiveAddress,
      logisticsId: data.logisticsId.toString(),
      logisticsNumber: data.logisticsNumber,
    });
    this.setState({ loading: false });
  };

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
      json.id = this.props.id;
      const data = await postRequest(EShopOrderModify, json);
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

  handleCancel = () => {
    this.props.callback(false);
  };

  render() {
    const { measureArr, buttonLoading, loading } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={loading}>
        <div className={styles.formWrap}>
          <Form
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 },
            }}
          >
            <FormItem label="收货人" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('receiveName', {
                rules: [
                  {
                    required: true,
                    message: '请输入收货人',
                  },
                ],
              })(<Input placeholder="请输入收货人" />)}
            </FormItem>

            <FormItem label="收货人手机号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('receivePhone', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                ],
              })(<Input placeholder="请输入手机号" />)}
            </FormItem>

            <FormItem label="收货地址" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('receiveAddress', {
                rules: [
                  {
                    required: true,
                    message: '请输入收货地址',
                  },
                ],
              })(<Input.TextArea placeholder="请输入收货地址" autosize={{ minRows: 7 }} />)}
            </FormItem>

            <FormItem label="物流公司" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('logisticsId', {
                rules: [
                  {
                    required: true,
                    message: '请选择物流公司',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择物流公司" optionFilterProp="children">
                  {measureArr.map(d => (
                    <Select.Option key={d.id}>{d.dataLabel}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="物流单号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('logisticsNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入物流单号',
                  },
                ],
              })(<Input placeholder="请输入物流单号" />)}
            </FormItem>
          </Form>
          <div className={styles.btnGroup}>
            <Button
              className={styles.submitBtn}
              loading={buttonLoading}
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

const AddUpComponent = Form.create()(AddUp);

export default AddUpComponent;
