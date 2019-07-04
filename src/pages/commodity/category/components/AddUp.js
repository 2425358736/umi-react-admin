import React from 'react';
import { Button, Input, Form, notification } from 'antd';
import { AddCommodityCategory, UpCommodityCategory } from '../Service';
import { postRequest, jsonString } from '@/utils/api';

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
        categoryName: info.categoryName,
        categoryNumber: info.categoryNumber,
        sort: info.sort,
        parentName: info.parentName ? info.parentName : '产品分类',
        remarks: info.remarks,
      });
    } else {
      this.props.form.setFieldsValue({
        parentName: info.categoryName,
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
        data = await postRequest(UpCommodityCategory, json);
      } else {
        json.parentId = this.props.info.id;
        if (this.props.info.parentContinuity) {
          json.parentContinuity = this.props.info.parentContinuity;
        }
        data = await postRequest(AddCommodityCategory, json);
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
          <FormItem label="分类名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('categoryName', {
              rules: [
                {
                  required: true,
                  message: '请输入分类名称!',
                },
              ],
            })(<Input placeholder="请输入分类名称" />)}
          </FormItem>
          <FormItem label="权限编号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('categoryNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入权限编号',
                },
              ],
            })(<Input placeholder="请输入权限编号" />)}
          </FormItem>
          <FormItem label="排列顺序" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('sort')(<Input />)}
          </FormItem>
          <FormItem label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('remarks')(<Input />)}
          </FormItem>
          <FormItem label="父级分类" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('parentName')(<Input disabled />)}
          </FormItem>
        </Form>
        <div style={{ float: 'right', margin: '0 70px 10px 0' }}>
          <Button
            onClick={this.handleCancel}
            style={{ backgroundColor: 'rgba(243, 243, 243, 1)', color: '#666666', margin: '20px' }}
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
