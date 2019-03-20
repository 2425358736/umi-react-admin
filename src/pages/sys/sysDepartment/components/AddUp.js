import React from 'react';
import { Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { SYS_ADD_D, SYS_UP_D } from '@/services/SysInterface';

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    const { type, info } = this.props;
    this.props.form.resetFields();
    if (type === 'up') {
      this.props.form.setFieldsValue({
        departmentName: info.departmentName,
        departmentNumber: info.departmentNumber,
        parentName: info.parentName ? info.parentName : '部门结构',
        remarks: info.remarks,
      });
    } else {
      this.props.form.setFieldsValue({
        parentName: info.departmentName,
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
      let data;
      if (this.props.type === 'up') {
        json.id = this.props.info.id;
        json.parentId = this.props.info.parentId;
        data = await postRequest(SYS_UP_D, json);
      } else {
        json.parentId = this.props.info.id;
        data = await postRequest(SYS_ADD_D, json);
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
      <div style={{ margin: '15px 0 0 10%', overflow: 'hidden' }}>
        <Form style={{ marginTop: 20 }} layout="horizontal">
          <FormItem label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('departmentName', {
              rules: [
                {
                  required: true,
                  message: '请输入部门名称!',
                },
              ],
            })(<Input placeholder="请输入部门名称" />)}
          </FormItem>
          <FormItem label="部门编号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('departmentNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入部门编号!',
                },
              ],
            })(<Input placeholder="请输入部门编号" />)}
          </FormItem>
          <FormItem label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('remarks')(<Input />)}
          </FormItem>
          <FormItem label="父级部门" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('parentName')(<Input disabled />)}
          </FormItem>
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

const AddUpComponent = Form.create()(AddUp);

export default AddUpComponent;
