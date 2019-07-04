/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Select, Cascader } from 'antd';
import { postRequest, jsonString, getRequest } from '@/utils/api';

import { CommodityCategoryListTree, GetCommodity, UpCommodity, AddCommodity } from '../Service';

import { SYS_Dict } from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTree: [],
      measureArr: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentWillMount = () => {
    this.getDict();
  };

  componentDidMount() {
    this.initialization();
  }

  getDict = async () => {
    const measureArr = await postRequest(`${SYS_Dict}/20`);
    this.setState({
      measureArr: measureArr.data,
    });
  };

  initialization = async () => {
    this.props.form.resetFields();
    const categoryTree = await getRequest(CommodityCategoryListTree);
    this.setState({
      categoryTree: categoryTree.data,
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let commodity = await getRequest(`${GetCommodity}?id=${this.props.id}`);
      commodity = commodity.data;
      let categoryIdArr = [];
      if (commodity.parentContinuity) {
        categoryIdArr = commodity.parentContinuity.split(',');
      }
      this.props.form.setFieldsValue({
        categoryId: categoryIdArr,
        commodityName: commodity.commodityName,
        measure: commodity.measure.toString(),
        costPrice: commodity.costPrice,
        sellingPrice: commodity.sellingPrice,
        effect: commodity.effect,
        remarks: commodity.remarks,
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
      const categoryIds = json.categoryId.split(',');
      json.categoryId = categoryIds[categoryIds.length - 1];

      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpCommodity, json);
      } else {
        data = await postRequest(AddCommodity, json);
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
            <FormItem label="商品名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('commodityName', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品名称',
                  },
                ],
              })(<Input placeholder="请输入商品名称" />)}
            </FormItem>

            <FormItem label="所属分类" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('categoryId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属分类',
                  },
                ],
              })(
                <Cascader
                  options={this.state.categoryTree}
                  placeholder="请选择所属分类"
                  changeOnSelect
                />
              )}
            </FormItem>

            <FormItem label="单位" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('measure', {
                rules: [
                  {
                    required: true,
                    message: '请选择单位',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择单位" optionFilterProp="children">
                  {this.state.measureArr.map(d => (
                    <Select.Option key={d.id}>{d.dataLabel}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="成本价" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('costPrice', {
                rules: [
                  {
                    required: true,
                    message: '请输入成本价',
                  },
                ],
              })(<Input placeholder="请输入成本价" />)}
            </FormItem>

            <FormItem label="售价" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('sellingPrice', {
                rules: [
                  {
                    required: true,
                    message: '请输入售价',
                  },
                ],
              })(<Input placeholder="请输入售价" />)}
            </FormItem>

            <FormItem label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('remarks')(<Input.TextArea autosize={{ minRows: 7 }} />)}
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
