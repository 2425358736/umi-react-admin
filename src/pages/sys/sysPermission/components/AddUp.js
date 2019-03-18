import React from 'react';
import { Radio, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { SYS_ADD_PER, SYS_UP_PER } from '@/services/SysInterface';

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

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
        perName: info.perName,
        permissionCode: info.permissionCode,
        perType: info.perType,
        perUrl: info.perUrl,
        perImg: info.perImg,
        sort: info.sort,
        parentName: info.parentName ? info.parentName : '菜单结构',
        remarks: info.remarks,
      });
    } else {
      this.props.form.setFieldsValue({
        parentName: info.perName,
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
        data = await postRequest(SYS_UP_PER, json);
      } else {
        json.parentId = this.props.info.id;
        data = await postRequest(SYS_ADD_PER, json);
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
      <div style={{ marginLeft: '10%', overflow: 'hidden' }}>
        <Form style={{ marginTop: 20 }} layout="horizontal">
          <FormItem label="权限名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('perName', {
              rules: [
                {
                  required: true,
                  message: '请输入权限名称!',
                },
              ],
            })(<Input placeholder="请输入权限名称" />)}
          </FormItem>
          <FormItem label="权限标识" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('permissionCode', {
              rules: [
                {
                  required: true,
                  message: '请输入权限标识!',
                },
              ],
            })(<Input placeholder="请输入权限标识" />)}
          </FormItem>
          <FormItem label="权限级别" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('perType', {
              rules: [
                {
                  required: true,
                  message: '请选择权限级别!',
                },
              ],
            })(
              <RadioGroup>
                <Radio value={0}>目录</Radio>
                <Radio value={1}>页面</Radio>
                <Radio value={2}>按钮</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="权限地址" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('perUrl')(<Input placeholder="请输入权限地址" />)}
          </FormItem>
          <FormItem label="图标" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('perImg')(<Input />)}
          </FormItem>
          <FormItem label="排列顺序" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('sort')(<Input />)}
          </FormItem>
          <FormItem label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('remarks')(<Input />)}
          </FormItem>
          <FormItem label="父级菜单" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('parentName')(<Input disabled />)}
          </FormItem>
        </Form>
        <div style={{ float: 'right', marginRight: '8%', marginTop: 20 }}>
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
