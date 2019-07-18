import React from 'react';
import { Button, Input, Form, notification } from 'antd';
import { postRequest } from '@/utils/api';

import { EShopOrderToVoid } from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class ToVoid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    };
  }

  componentWillMount = () => {};

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
      json.shopOrderId = this.props.id;
      json.operateType = 5;
      const data = await postRequest(EShopOrderToVoid, json);
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
    const { buttonLoading } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formWrap}>
        <Form style={{ marginTop: '45px' }}>
          <FormItem label="作废描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            {getFieldDecorator('shopCommodityDescribe', {
              rules: [
                {
                  required: true,
                  message: '请输入作废描述',
                },
              ],
            })(<Input.TextArea autosize={{ minRows: 7 }} />)}
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

const EShopOrderToVoidComponent = Form.create()(ToVoid);

export default EShopOrderToVoidComponent;
