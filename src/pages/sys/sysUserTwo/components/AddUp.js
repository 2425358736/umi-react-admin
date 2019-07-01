import React from 'react';
import { Spin, Checkbox, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { SYS_INFO, SYS_UP_USER, SYS_ADD_USER, SYS_ROLE_LIST } from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    const RoleList = await postRequest(`${SYS_ROLE_LIST}`, { type: 1, query: {} });
    this.setState({
      roles: RoleList.data.list,
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let user = await postRequest(`${SYS_INFO}/${this.props.id}`);
      user = user.data;
      this.props.form.setFieldsValue({
        departmentIds: user.departmentIds.toString().split(','),
        realName: user.realName,
        email: user.email,
        loginName: user.loginName,
        phone: user.phone,
        roleIds: user.roleIds.toString().split(','),
        remarks: user.remarks,
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
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(SYS_UP_USER, json);
      } else {
        data = await postRequest(SYS_ADD_USER, json);
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
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>基本信息</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
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
              </div>
              <div className={styles.colDom}>
                <FormItem label="手机" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机',
                      },
                    ],
                  })(<Input placeholder="请输入手机" />)}
                </FormItem>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="真实姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('realName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入真实姓名',
                      },
                    ],
                  })(<Input placeholder="请输入真实姓名" />)}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                <FormItem label="邮箱" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: '请输入邮箱',
                      },
                    ],
                  })(<Input placeholder="请输入邮箱" />)}
                </FormItem>
              </div>
            </div>

            {/* 分割线 */}

            <div className={styles.titleDom}>
              <span />
              <span>其他</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem
                  label="所属角色"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  className={styles.roleListDiv}
                >
                  {getFieldDecorator('roleIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择所属角色',
                      },
                    ],
                  })(
                    <Checkbox.Group>
                      {this.state.roles.map((role, i) => {
                        const j = i;
                        return (
                          <Checkbox key={j} value={role.id.toString()}>
                            {role.roleName}
                          </Checkbox>
                        );
                      })}
                    </Checkbox.Group>
                  )}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                <FormItem label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('remarks')(<Input.TextArea autosize={{ minRows: 7 }} />)}
                </FormItem>
              </div>
            </div>
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
