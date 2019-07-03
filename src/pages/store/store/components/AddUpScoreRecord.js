/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Radio } from 'antd';
import { postRequest, jsonString, getRequest } from '@/utils/api';

import { GetChargeProject, UpChargeProject, AddChargeProject } from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let info = await getRequest(`${GetChargeProject}?id=${this.props.id}`);
      info = info.data;

      this.props.form.setFieldsValue({
        chargeProjectName: info.chargeProjectName,
        price: info.price,
        describe: info.describe,
        type: info.type.toString(),
      });
      this.setState({ loading: false });
    }
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
      jsonString(json);
      json.storeId = this.props.storeId;
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpChargeProject, json);
      } else {
        data = await postRequest(AddChargeProject, json);
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

  handleCancel = () => {
    this.props.callback(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.loading}>
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
            <FormItem label="类别" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择类别',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">诊疗</Radio>
                  <Radio value="1">其他</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('chargeProjectName', {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input placeholder="请输入名称" />)}
            </FormItem>

            <FormItem label="价格" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: '请输入价格',
                  },
                ],
              })(<Input placeholder="请输入价格" />)}
            </FormItem>

            <FormItem label="描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('describe')(<Input.TextArea autosize={{ minRows: 7 }} />)}
            </FormItem>
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

const AddUpComponent = Form.create()(AddUp);

export default AddUpComponent;
