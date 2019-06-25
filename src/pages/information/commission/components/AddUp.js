import React from 'react';
import { Spin, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString, getRequest } from '@/utils/api';

import { AddCommissionRate, UpCommissionRate, CommissionRateInfo } from '@/services/Order';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let commissionRate = await getRequest(`${CommissionRateInfo}?id=${this.props.id}`);
      commissionRate = commissionRate.data;
      this.props.form.setFieldsValue({
        amountStart: commissionRate.amountStart,
        amountEnd: commissionRate.amountEnd,
        proportion: commissionRate.proportion,
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
        data = await postRequest(UpCommissionRate, json);
      } else {
        data = await postRequest(AddCommissionRate, json);
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
                <FormItem label="起始金额" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('amountStart', {
                    rules: [
                      {
                        required: true,
                        message: '请输入起始金额',
                      },
                    ],
                  })(<Input placeholder="请输入起始金额" />)}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                <FormItem label="结束金额" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('amountEnd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入结束金额',
                      },
                    ],
                  })(<Input placeholder="请输入结束金额" />)}
                </FormItem>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="佣金比例" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('proportion', {
                    rules: [
                      {
                        required: true,
                        message: '请输入佣金比例',
                      },
                    ],
                  })(<Input placeholder="请输入佣金比例" />)}
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
