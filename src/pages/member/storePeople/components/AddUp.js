/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Select, Radio } from 'antd';
import { postRequest, getRequest, requestParameterProcessing } from '@/utils/api';
import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import { GetStorePeople, UpHeadquartersPeople, AddRegionPeople, StoreAllList } from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      storeArr: [],
      storeId: '',
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    const data = await getRequest(`${StoreAllList}`);
    this.setState({
      storeArr: data.data,
    });
    this.props.form.resetFields();
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let store = await getRequest(`${GetStorePeople}?id=${this.props.id}`);
      store = store.data;
      this.props.form.setFieldsValue({
        picture: store.picture,
        workingYears: store.workingYears,
        briefIntroduction: store.briefIntroduction,
        storeId: store.storeId.toString(),
        storeUserType: store.storeUserType.toString(),
        realName: store.realName,
        jobNumber: store.jobNumber,
        gender: store.gender.toString(),
        idNumber: store.idNumber,
        phone: store.phone,
        remarks: store.remarks,
        loginName: store.loginName,
        qq: store.qq,
        email: store.email,
        password: '******',
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
      requestParameterProcessing(json);
      // jsonString(json);
      json.storeId = parseInt(this.state.storeId, 10);
      json.userType = 2;
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

  storeOnChange = value => {
    this.setState({
      storeId: parseInt(value, 10),
    });
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

            <FormItem label="所属门店" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storeId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属门店',
                  },
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择所属门店"
                  optionFilterProp="children"
                  onChange={this.storeOnChange}
                >
                  {this.state.storeArr.map(d => (
                    <Select.Option key={d.id}>{d.storeName}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="所属岗位" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storeUserType', {
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
                  <Select.Option key={0}>店长</Select.Option>
                  <Select.Option key={1}>导诊</Select.Option>
                  <Select.Option key={2}>技师</Select.Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="简介" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('briefIntroduction', {
                rules: [
                  {
                    required: true,
                    message: '请输入简介',
                  },
                ],
              })(<Input placeholder="请输入简介" />)}
            </FormItem>

            <FormItem label="工龄" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('workingYears', {
                rules: [
                  {
                    required: true,
                    message: '请输入工龄',
                  },
                ],
              })(<Input placeholder="请输入工龄" />)}
            </FormItem>

            <FormItem label="员工头像" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('picture', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传员工头像',
                  },
                ],
              })(<UploadPicture number={1} />)}
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
