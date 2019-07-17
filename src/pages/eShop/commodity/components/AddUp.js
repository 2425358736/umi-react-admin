/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Input, Form, notification, Select, Cascader, Radio } from 'antd';
import { postRequest, requestParameterProcessing, getRequest } from '@/utils/api';
import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import {
  EShopCommodityCategoryTree,
  GetEShopCommodity,
  UpEShopCommodity,
  AddEShopCommodity,
  CommodityList,
} from '../Service';

import { SYS_Dict } from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTree: [],
      measureArr: [],
      commodityArr: [],
      buttonLoading: false,
      loading: false,
    };
  }

  componentWillMount = () => {
    this.getDict();
    this.getCommodityArr();
    this.getEShopCommodityCategoryTree();
  };

  componentDidMount() {
    this.initialization();
  }

  getDict = async () => {
    const measureArr = await postRequest(`${SYS_Dict}/21`);
    this.setState({
      measureArr: measureArr.data,
    });
  };

  getCommodityArr = async () => {
    const commodityArr = await postRequest(CommodityList, { type: 1, query: {} });
    this.setState({
      commodityArr: commodityArr.data.list,
    });
  };

  getEShopCommodityCategoryTree = async () => {
    const categoryTree = await getRequest(EShopCommodityCategoryTree);
    this.setState({
      categoryTree: categoryTree.data,
    });
  };

  initialization = async () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      isSell: '0',
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let commodity = await getRequest(`${GetEShopCommodity}?id=${this.props.id}`);
      commodity = commodity.data;
      let categoryIdArr = [];
      if (commodity.parentContinuity) {
        categoryIdArr = commodity.parentContinuity.split(',');
      }
      this.props.form.setFieldsValue({
        commodityId: commodity.commodityId.toString(),
        shopCommodityName: commodity.shopCommodityName,
        shopCommodityCategoryId: categoryIdArr,
        specs: commodity.specs.toString(),
        shopSalesPrice: commodity.shopSalesPrice,
        shopCommodityDescribe: commodity.shopCommodityDescribe,
        isSell: commodity.isSell.toString(),
        commodityPictures: commodity.commodityPictures,
        commodityCirculatePictures: commodity.commodityCirculatePictures,
        commodityExplainPictures: commodity.commodityExplainPictures,
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
      const shopCommodityCategoryId = json.shopCommodityCategoryId.split(',');
      json.shopCommodityCategoryId = shopCommodityCategoryId[shopCommodityCategoryId.length - 1];

      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpEShopCommodity, json);
      } else {
        data = await postRequest(AddEShopCommodity, json);
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
    const { categoryTree, measureArr, commodityArr, buttonLoading, loading } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={loading}>
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
            <FormItem label="选择商品" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('commodityId', {
                rules: [
                  {
                    required: true,
                    message: '请选择商品',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择商品" optionFilterProp="children">
                  {commodityArr.map(d => (
                    <Select.Option key={d.id}>{d.commodityName}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="商城商品名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('shopCommodityName', {
                rules: [
                  {
                    required: true,
                    message: '请输入商城商品名称',
                  },
                ],
              })(<Input placeholder="请输入商城商品名称" />)}
            </FormItem>

            <FormItem label="商城商品分类" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('shopCommodityCategoryId', {
                rules: [
                  {
                    required: true,
                    message: '请选择商城商品分类',
                  },
                ],
              })(
                <Cascader options={categoryTree} placeholder="请选择商城商品分类" changeOnSelect />
              )}
            </FormItem>

            <FormItem label="规格" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('specs', {
                rules: [
                  {
                    required: true,
                    message: '请选择规格',
                  },
                ],
              })(
                <Select showSearch placeholder="请选择规格" optionFilterProp="children">
                  {measureArr.map(d => (
                    <Select.Option key={d.id}>{d.dataLabel}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label="商城售价" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('shopSalesPrice', {
                rules: [
                  {
                    required: true,
                    message: '请商城售价',
                  },
                ],
              })(<Input addonAfter="元" placeholder="请商城售价" />)}
            </FormItem>

            <FormItem label="商品描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('shopCommodityDescribe')(
                <Input.TextArea autosize={{ minRows: 7 }} />
              )}
            </FormItem>

            <FormItem label="是否上架" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('isSell', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否上架',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">是</Radio>
                  <Radio value="1">否</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="商城商品图" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('commodityPictures', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传商城商品图',
                  },
                ],
              })(<UploadPicture number={1} />)}
            </FormItem>

            <FormItem label="商品轮播图" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('commodityCirculatePictures', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传商品轮播图',
                  },
                ],
              })(<UploadPicture number={4} />)}
            </FormItem>

            <FormItem label="商品说明图" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('commodityExplainPictures', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传商品说明图',
                  },
                ],
              })(<UploadPicture number={4} />)}
            </FormItem>
          </Form>
          <div className={styles.btnGroup}>
            <Button
              className={styles.submitBtn}
              loading={buttonLoading}
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
