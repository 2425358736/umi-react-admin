import React from 'react';
import { Spin, Button, Input, Form, notification, Select } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { Recharge } from '@/services/Finance';

const styles = require('./AddScoreRecord.less');

const FormItem = Form.Item;

class RechargeCom extends React.Component {
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
      json.equipmentDealerId = this.props.equipmentDealerId;
      jsonString(json);
      const data = await postRequest(Recharge, json);
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
                <FormItem label="充值类型" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('transactionMode', {
                    rules: [
                      {
                        required: true,
                        message: '请选择充值类型',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择充值类型" optionFilterProp="children">
                      <Select.Option key={1}>线下充值(入余额)</Select.Option>
                      <Select.Option key={2}>体验金充值(入体验金)</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="充值金额" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('transactionAmount', {
                    rules: [
                      {
                        required: true,
                        message: '请输入加充值金额',
                      },
                    ],
                  })(<Input placeholder="请输入加充值金额" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="充值描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('transactionDescription', {
                    rules: [
                      {
                        required: true,
                        message: '请输入充值描述',
                      },
                    ],
                  })(<Input placeholder="请输入充值描述" />)}
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

const RechargeComForm = Form.create()(RechargeCom);

export default RechargeComForm;
