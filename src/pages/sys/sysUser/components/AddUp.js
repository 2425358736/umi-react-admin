import React from 'react';
import { Spin, Checkbox, Button, Input, Form, notification, TreeSelect } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import {
  SYS_INFO,
  SYS_D_TREE,
  SYS_D_ROLE,
  SYS_UP_USER,
  SYS_ADD_USER,
} from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;
const { TreeNode } = TreeSelect;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      buttonLoading: false,
      loading: false,
      department: [],
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    const departmentList = await postRequest(SYS_D_TREE);

    this.setState({
      department: departmentList.data,
    });
    this.props.form.resetFields();
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let user = await postRequest(`${SYS_INFO}/${this.props.id}`);
      user = user.data;
      const RoleList = await postRequest(`${SYS_D_ROLE}/${user.departmentIds || 0}`);
      this.setState({
        roles: RoleList.data,
      });
      this.props.form.setFieldsValue({
        departmentIds: user.departmentIds.toString().split(','),
        jobNum: user.jobNum,
        email: user.email,
        loginName: user.loginName,
        phone: user.phone,
        roleIds: user.roleIds.toString().split(','),
        remarks: user.remarks,
      });
      this.setState({ loading: false });
    }
  };

  departmentId = async value => {
    const RoleList = await postRequest(`${SYS_D_ROLE}/${value.length > 0 ? value.toString() : 0}`);
    this.setState({
      roles: RoleList.data,
    });
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

  departmentNameTree = departmentArr => {
    const arr = [];
    if (departmentArr.length > 0) {
      departmentArr.forEach((d, j) => {
        arr[j] = (
          <TreeNode value={d.id} title={d.departmentName} key={d.id}>
            {this.departmentNameTree(d.children)}
          </TreeNode>
        );
      });
    }
    return arr;
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
                <FormItem label="工号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('jobNum', {
                    rules: [
                      {
                        required: true,
                        message: '请输入工号',
                      },
                    ],
                  })(<Input placeholder="请输入工号" />)}
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
                <FormItem label="所属部门" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('departmentIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择所属部门',
                      },
                    ],
                  })(
                    <TreeSelect
                      showSearch
                      placeholder="请选择所属部门"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={this.departmentId}
                    >
                      {this.departmentNameTree(this.state.department)}
                    </TreeSelect>
                  )}
                </FormItem>
              </div>
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
            </div>
            <div className={styles.rowDom} style={{ width: '50%' }}>
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
