// 系统设置 - 岗位添加编辑
import React from 'react';
import { Tree, Button, Form, Input, Icon, notification, Row, Col, TreeSelect } from 'antd';
import { postRequest, getRequest } from '@/utils/api';
import { UP_POSITION, ADD_POSITION, POSITION_INFO, DEPARTMENT_TREE } from '@/services/member';

const { TreeNode } = Tree;
const FormItem = Form.Item;
class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      havePerList: [],
      buttonLoading: false,
      departmentList: [],
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
    const department = await getRequest(DEPARTMENT_TREE);

    this.setState({
      departmentList: department.data,
    });

    // 修改
    if (this.props.id > 0) {
      // 角色信息
      const positionInfo = await postRequest(`${POSITION_INFO}/${this.props.id}`);
      const listArr = [];
      this.setState({
        havePerList: listArr,
      });
      this.props.form.setFieldsValue({
        departmentId: positionInfo.data.departmentId.toString(),
        positionName: positionInfo.data.positionName,
        positionNumber: positionInfo.data.positionNumber,
        remarks: positionInfo.data.remarks,
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
        data = await postRequest(UP_POSITION, json);
      } else {
        data = await postRequest(ADD_POSITION, json);
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
              <FormItem label="岗位名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('positionName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写岗位名称',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="岗位编号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('positionNumber', {
                  rules: [
                    {
                      required: true,
                      message: '请填写岗位编号',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="岗位说明" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('remarks', {
                  rules: [
                    {
                      required: true,
                      message: '请填写岗位说明',
                    },
                  ],
                })(<Input />)}
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
