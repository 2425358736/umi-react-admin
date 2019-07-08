/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Cascader, Radio } from 'antd';
import { postRequest, jsonString, getRequest } from '@/utils/api';

import { GetRegionPeople, UpHeadquartersPeople, AddRegionPeople, GetRegion } from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionTree: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    const regionTree = await getRequest(GetRegion);
    this.setState({
      regionTree: regionTree.data,
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let store = await getRequest(`${GetRegionPeople}?id=${this.props.id}`);
      store = store.data;
      let regionIdArr = [];
      if (store.parentContinuity) {
        regionIdArr = store.parentContinuity.split(',');
      }
      this.props.form.setFieldsValue({
        regionId: regionIdArr,
        realName: store.realName,
        jobNumber: store.jobNumber,
        gender: store.gender.toString(),
        idNumber: store.idNumber,
        phone: store.phone,
        remarks: store.remarks,
        loginName: store.loginName,
        qq: store.qq,
        email: store.email,
      });
      this.setState({ loading: false });
    } else {
      this.props.form.setFieldsValue({
        password: '666666',
      });
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
      const regionIds = json.regionId.split(',');
      json.regionId = parseInt(regionIds[regionIds.length - 1], 10);
      json.userType = 1;
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpHeadquartersPeople, json);
      } else {
        data = await postRequest(AddRegionPeople, json);
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
    const that = this;
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
            <div className={styles.titleDom}>
              <span />
              <span>区域信息</span>
            </div>
            <FormItem label="工号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('jobNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入工号',
                  },
                ],
              })(<Input placeholder="请输入工号" />)}
            </FormItem>

            <FormItem label="区域" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('regionId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属区域',
                  },
                ],
              })(
                <Cascader options={this.state.regionTree} placeholder="所属区域" changeOnSelect />
              )}
            </FormItem>

            <div className={styles.titleDom}>
              <span />
              <span>个人信息</span>
            </div>
            <FormItem label="姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('realName', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ],
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="性别" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">男</Radio>
                  <Radio value="1">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="身份证号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('idNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号',
                  },
                ],
              })(<Input placeholder="请输入身份证号" />)}
            </FormItem>
            <FormItem label="手机号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                ],
              })(<Input placeholder="请输入手机号" />)}
            </FormItem>
            <FormItem label="QQ" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('qq', {
                rules: [
                  {
                    required: false,
                    message: '请输入qq',
                  },
                ],
              })(<Input placeholder="请输入qq" />)}
            </FormItem>
            <FormItem label="邮箱" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    message: '请输入邮箱',
                  },
                ],
              })(<Input placeholder="请输入邮箱" />)}
            </FormItem>
            <FormItem label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('remarks', {
                rules: [
                  {
                    required: false,
                    message: '请输入备注',
                  },
                ],
              })(<Input placeholder="请输入备注" />)}
            </FormItem>
            <div className={styles.titleDom}>
              <span />
              <span>用户信息</span>
            </div>
            <FormItem label="用户名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('loginName', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            {that.props.id === undefined && (
              <FormItem label="密码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ],
                })(<Input placeholder="请输入密码" />)}
              </FormItem>
            )}
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
