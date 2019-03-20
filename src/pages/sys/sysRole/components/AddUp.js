// 系统设置 - 角色添加编辑
import React from 'react';
import { Tree, Button, Form, Input, Icon, notification, Row, Col, TreeSelect } from 'antd';
import styled from 'styled-components';
import { postRequest } from '@/utils/api';
import {
  SYS_UP_ROLE,
  SYS_ADD_ROLE,
  SYS_PER_TREE,
  SYS_ROLE_INFO,
  SYS_D_TREE,
} from '@/services/SysInterface';

const { TreeNode } = Tree;
const FormItem = Form.Item;

const MenuBox = styled.div`
  border: 1px solid #d9d9d9;
  word-wrap: break-word;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: auto;
  height: 363px;
`;
class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perList: [],
      havePerList: [],
      departmentList: [],
      buttonLoading: false,
    };
  }

  componentWillMount = () => {
    this.initial();
  };

  havePerList = per => {
    const { havePerList } = this.state;
    if (havePerList.indexOf(per) >= 0) {
      havePerList.splice(havePerList.indexOf(per), 1);
    } else {
      havePerList.push(per);
    }
    this.setState({
      havePerList,
    });
  };

  recursion = per => (
    <TreeNode
      title={
        <Button
          size="small"
          style={
            this.state.havePerList.indexOf(per.id) >= 0
              ? {
                  backgroundColor: 'red',
                  color: 'antiquewhite',
                }
              : null
          }
          onClick={() => this.havePerList(per.id)}
        >
          <Icon
            style={{
              color:
                this.state.havePerList.indexOf(per.id) >= 0
                  ? null
                  : per.perType === 2
                  ? '#fa9a32'
                  : per.perType === 3
                  ? '#1bb4b4'
                  : '#4290f7',
            }}
            type={
              per.perImg
                ? per.perImg
                : per.perType === 0
                ? 'appstore'
                : per.perType === 1
                ? 'pic-right'
                : 'poweroff'
            }
          />
          {per.perName}
        </Button>
      }
      key={per.id}
    >
      {per.children.map(per1 => this.recursion(per1))}
    </TreeNode>
  );

  initial = async () => {
    // 部门列表
    const department = await postRequest(SYS_D_TREE);
    // 权限列表
    const perList = await postRequest(SYS_PER_TREE);

    this.setState({
      perList: perList.data,
      departmentList: department.data,
    });

    // 修改
    if (this.props.id > 0) {
      // 角色信息
      const roleInfo = await postRequest(`${SYS_ROLE_INFO}/${this.props.id}`);
      const listArr = [];
      roleInfo.data.listPermission.forEach(per => {
        listArr.push(per.id);
      });
      this.setState({
        havePerList: listArr,
      });
      this.props.form.setFieldsValue({
        departmentId: roleInfo.data.departmentId.toString(),
        roleName: roleInfo.data.roleName,
        roleNumber: roleInfo.data.roleNumber,
        remarks: roleInfo.data.remarks,
      });
    } else {
      this.props.form.setFieldsValue({
        departmentId: this.props.departmentId.toString(),
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
      json.perIds = this.state.havePerList.toString();
      let data = '';
      const listPermission = [];
      json.perIds.split(',').forEach(id => {
        listPermission.push({ id });
      });
      json.listPermission = listPermission;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(SYS_UP_ROLE, json);
      } else {
        data = await postRequest(SYS_ADD_ROLE, json);
      }
      if (data.status === 200) {
        notification.success({ message: data.msg });
        this.props.callback(true);
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
      this.setState({
        buttonLoading: false,
      });
    }
  };

  handleCancel = () => {
    this.props.callback(false);
  };

  departmentList = arr => {
    const arr1 = [];
    arr.forEach(json => {
      arr1.push(
        <TreeNode value={json.id} title={json.departmentName} key={json.id}>
          {this.departmentList(json.children)}
        </TreeNode>
      );
    });
    return arr1;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '15px 0 0 10%', overflow: 'hidden' }}>
        <Form layout="horizontal">
          <Row>
            <Col span={12}>
              <FormItem label="所属部门" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('departmentId', {
                  rules: [
                    {
                      required: true,
                      message: '请选择所属部门',
                    },
                  ],
                })(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    showCheckedStrategy="SHOW_PARENT"
                    searchPlaceholder="请选择所属部门"
                    treeDefaultExpandAll
                  >
                    {this.departmentList(this.state.departmentList)}
                  </TreeSelect>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="角色名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('roleName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写角色名称',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="角色编号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('roleNumber', {
                  rules: [
                    {
                      required: true,
                      message: '请填写角色编号',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="角色说明" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('remarks', {
                  rules: [
                    {
                      required: true,
                      message: '请填写角色说明',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="权限设置" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('permissionVoList')(
                  <MenuBox>
                    <Tree showLine defaultExpandAll>
                      {this.state.perList.map(per => this.recursion(per))}
                    </Tree>
                  </MenuBox>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div style={{ float: 'right', margin: '0 70px 20px 0' }}>
          <Button
            onClick={this.handleCancel}
            style={{ backgroundColor: 'rgba(243, 243, 243, 1)', color: '#666666', marginRight: 20 }}
          >
            取消
          </Button>
          <Button
            loading={this.state.buttonLoading}
            onClick={this.handleSubmit}
            type="primary"
            style={{}}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}
const AddUpCom = Form.create()(AddUp);
export default AddUpCom;
