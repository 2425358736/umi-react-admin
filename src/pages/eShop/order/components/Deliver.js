import React from 'react';
import { Button, Input, Form, notification, Select } from 'antd';
import { postRequest } from '@/utils/api';

import { EShopOrderDeliver } from '../Service';

import { SYS_Dict } from '@/services/SysInterface';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class Deliver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      measureArr: [],
    };
  }

  componentWillMount = () => {
    this.getDict();
  };

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
  };

  getDict = async () => {
    const measureArr = await postRequest(`${SYS_Dict}/22`);
    this.setState({
      measureArr: measureArr.data,
    });
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
      json.id = this.props.id;
      const data = await postRequest(EShopOrderDeliver, json);
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
    const { buttonLoading, measureArr } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formWrap}>
        <Form style={{ marginTop: '45px' }}>
          <FormItem label="快递公司" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            {getFieldDecorator('logisticsId', {
              rules: [
                {
                  required: true,
                  message: '请选择快递公司',
                },
              ],
            })(
              <Select showSearch placeholder="请选择快递公司" optionFilterProp="children">
                {measureArr.map(d => (
                  <Select.Option key={d.id}>{d.dataLabel}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem label="快递单号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            {getFieldDecorator('logisticsNumber', {
              rules: [
                {
                  required: true,
                  message: '请输入快递单号',
                },
              ],
            })(<Input placeholder="请输入快递单号" />)}
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
    );
  }
}

const DeliverComponent = Form.create()(Deliver);

export default DeliverComponent;
