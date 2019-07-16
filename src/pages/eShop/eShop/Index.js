import React from 'react';
import { Button, Input, Form, Row, Col, notification, InputNumber } from 'antd';
import { getRequest, postRequest, jsonString } from '@/utils/api';
import styles from './Index.less';
import { GetEShop, UpEShop } from './Service';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      disabled: true,
    };
  }

  componentDidMount = async () => {
    this.initialization();
  };

  initialization = async () => {
    this.props.form.resetFields();
    const data = await getRequest(`${GetEShop}?id=1`);
    const formData = data.data;
    this.props.form.setFieldsValue({
      shopDescribe: formData.shopDescribe,
      shipmentCost: formData.shipmentCost,
      freeFreightAmount: formData.freeFreightAmount,
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
      jsonString(json);
      json.id = 1;
      const data = await postRequest(UpEShop, json);
      notification.success({ message: data.msg });
      this.setState({
        buttonLoading: false,
        disabled: true,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.state;
    return (
      <div className={styles.profileDiv}>
        <Form layout="horizontal">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="商城描述" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('shopDescribe', {
                  rules: [
                    {
                      required: true,
                      message: '请输入商城描述',
                    },
                  ],
                })(
                  <Input.TextArea
                    disabled={disabled}
                    placeholder="请输入商城描述"
                    autosize={{ minRows: 7 }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="运费" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('shipmentCost', {
                  rules: [
                    {
                      required: true,
                      message: '请输入运费',
                    },
                  ],
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    disabled={disabled}
                    style={{ width: '400px' }}
                    placeholder="请输入运费"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="免运费金额" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('freeFreightAmount', {
                  rules: [
                    {
                      required: true,
                      message: '请输入免运费金额',
                    },
                  ],
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    disabled={disabled}
                    style={{ width: '400px' }}
                    placeholder="请输入免运费金额"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={styles.btnGroup}>
          {disabled && (
            <Button
              loading={this.state.buttonLoading}
              onClick={() => {
                this.setState({
                  disabled: !disabled,
                });
              }}
              style={{
                left: '200px',
                top: '40px',
              }}
              type="primary"
              className={styles.submitBtn}
            >
              编辑
            </Button>
          )}
          {!disabled && (
            <Button
              loading={this.state.buttonLoading}
              onClick={this.handleSubmit}
              type="primary"
              className={styles.submitBtn}
              style={{
                top: '40px',
                left: '150px',
              }}
            >
              提交
            </Button>
          )}
          {!disabled && (
            <Button
              onClick={() => {
                this.setState({
                  disabled: true,
                });
              }}
              className={styles.cancelBtn}
              style={{
                top: '40px',
                left: '190px',
              }}
            >
              取消
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
