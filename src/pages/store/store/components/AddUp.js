/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Radio, Cascader } from 'antd';
import { postRequest, requestParameterProcessing, getRequest } from '@/utils/api';

import { GetRegion, GetStore, UpStore, AddStore } from '../Service';

import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import province from './province';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionTree: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    const regionTree = await getRequest(GetRegion);
    this.setState({
      regionTree: regionTree.data,
    });
    this.props.form.setFieldsValue({
      storeType: '0',
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let store = await getRequest(`${GetStore}?id=${this.props.id}`);
      store = store.data;

      const provinceArr = [];
      if (store.province != null) {
        provinceArr.push(store.province);
      }
      if (store.city != null) {
        provinceArr.push(store.city);
      }
      if (store.area != null) {
        provinceArr.push(store.area);
      }

      let regionIdArr = [];
      if (store.parentContinuity) {
        regionIdArr = store.parentContinuity.split(',');
      }
      this.props.form.setFieldsValue({
        regionId: regionIdArr,
        storeName: store.storeName,
        storeType: store.storeType.toString(),
        storeNumber: store.storeNumber,
        province: provinceArr,
        detailedAddress: store.detailedAddress,
        storePublicity: store.storePublicity,
        picture: store.picture,
        publicityPicture: store.publicityPicture,
        remarks: store.remarks,
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
      const regionIds = json.regionId.split(',');
      json.regionId = regionIds[regionIds.length - 1];

      const province = json.province.split(',');
      if (province.length > 2) {
        json.area = province[2];
      }
      if (province.length > 1) {
        json.city = province[1];
      }
      if (province.length > 0) {
        json.province = province[0];
      }
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpStore, json);
      } else {
        data = await postRequest(AddStore, json);
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
            <FormItem label="类型" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storeType', {
                rules: [
                  {
                    required: true,
                    message: '请选择门店类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">直营店</Radio>
                  <Radio value="1">加盟店</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="所属区域" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('regionId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属区域',
                  },
                ],
              })(
                <Cascader options={this.state.regionTree} placeholder="所属区域" changeOnSelect />
              )}
            </FormItem>

            <FormItem label="门店名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storeName', {
                rules: [
                  {
                    required: true,
                    message: '请输入门店名称',
                  },
                ],
              })(<Input placeholder="请输入门店名称" />)}
            </FormItem>

            <FormItem label="门店编号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storeNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入门店编号',
                  },
                ],
              })(<Input placeholder="请输入门店编号" />)}
            </FormItem>

            <FormItem label="门店标题图" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('picture', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传门店标题图',
                  },
                ],
              })(<UploadPicture number={1} />)}
            </FormItem>

            <FormItem label="门店展示图" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('publicityPicture', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传门店展示图',
                  },
                ],
              })(<UploadPicture number={10} />)}
            </FormItem>

            <FormItem label="省市区" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('province', {
                rules: [
                  {
                    required: true,
                    message: '请选择省市区',
                  },
                ],
              })(<Cascader options={province} placeholder="请选择省市区" changeOnSelect />)}
            </FormItem>

            <FormItem label="详细地址" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('detailedAddress')(<Input.TextArea autosize={{ minRows: 7 }} />)}
            </FormItem>

            <FormItem label="官宣" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('storePublicity')(<Input.TextArea autosize={{ minRows: 7 }} />)}
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
