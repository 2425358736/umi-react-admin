/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Cascader, Select, Radio } from 'antd';
import { postRequest, jsonString, getRequest } from '@/utils/api';

import {
  GetDepartment,
  GetHeadquartersPeople,
  UpHeadquartersPeople,
  AddHeadquartersPeople,
  POSITION_LIST,
} from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentTree: [],
      buttonLoading: false,
      loading: false,
      positionArr: [],
      positionId: '',
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    const departmentTree = await getRequest(GetDepartment);
    this.setState({
      departmentTree: departmentTree.data,
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let store = await getRequest(`${GetHeadquartersPeople}?id=${this.props.id}`);
      store = store.data;
      const data = await postRequest(`${POSITION_LIST}/${store.departmentId}`);
      this.setState({
        positionArr: data.data,
      });
      let departmentIdArr = [];
      if (store.departmentContinuity) {
        departmentIdArr = store.departmentContinuity.split(',');
      }
      this.props.form.setFieldsValue({
        departmentId: departmentIdArr,
        realName: store.realName,
        jobNumber: store.jobNumber,
        gender: store.gender.toString(),
        idNumber: store.idNumber,
        phone: store.phone,
        remarks: store.remarks,
        loginName: store.loginName,
        qq: store.qq,
        email: store.email,
        positionId: store.positionId.toString(),
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
      const departmentIds = json.departmentId.split(',');
      json.departmentId = departmentIds[departmentIds.length - 1];
      json.userType = 0;
      json.positionId = this.state.positionId;
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpHeadquartersPeople, json);
      } else {
        data = await postRequest(AddHeadquartersPeople, json);
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

  departmentOnChange = async value => {
    this.props.form.setFieldsValue({
      positionId: '',
    });
    const departmentId = value.length > 0 ? value[value.length - 1] : 0;
    const data = await postRequest(`${POSITION_LIST}/${departmentId}`);
    if (data.status === 200) {
      this.setState({
        positionArr: data.data,
      });
    }
  };

  positionOnChange = value => {
    this.setState({
      positionId: parseInt(value, 10),
    });
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
              <span>任职信息</span>
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

            <FormItem label="部门" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('departmentId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属部门',
                  },
                ],
              })(
                <Cascader
                  options={this.state.departmentTree}
                  onChange={this.departmentOnChange}
                  placeholder="所属部门"
                  changeOnSelect
                />
              )}
            </FormItem>

            <FormItem label="岗位" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('positionId', {
                rules: [
                  {
                    required: true,
                    message: '请选择岗位',
                  },
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择岗位"
                  optionFilterProp="children"
                  onChange={this.positionOnChange}
                >
                  {this.state.positionArr.map(d => (
                    <Select.Option key={d.id}>{d.positionName}</Select.Option>
                  ))}
                </Select>
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
