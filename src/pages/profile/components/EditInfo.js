import React from 'react';
import { Button, Input, Form, Row, Col, message } from 'antd';
import { postRequest, jsonString } from '@/utils/api';
import styles from './EditInfo.less';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    };
  }

  componentDidMount = async () => {
    this.initialization();
  };

  initialization = async () => {
    this.props.form.resetFields();
    if (this.props.id > 0) {
      const data = await postRequest('/system/getUserDetailedId', { id: this.props.id });
      const formData = data.data;
      this.props.form.setFieldsValue({
        name: formData.name,
        gender: formData.gender,
        idNumber: formData.idNumber,
        qqNumber: formData.qqNumber,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
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
      if (this.props.id > 0) {
        json.id = this.props.id;
        const data = await postRequest('/system/upUserBasicInfor', json);
        message.success(`${data.message}`);
        if (data.code !== 140) {
          this.props.callback({ type: 'submit' });
        }
      }
      this.setState({
        buttonLoading: false,
      });
    }
  };

  handleCancel = () => {
    this.props.callback({ type: 'cancel' });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.infoWrap}>
        <Form layout="horizontal">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="真实姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('roleNames', {})(<Input placeholder="请输入姓名" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('phone', {})(<Input placeholder="请输入手机" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="邮箱" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('email', {})(<Input placeholder="请输入邮箱" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={styles.btnGroup}>
          <Button
            loading={this.state.buttonLoading}
            onClick={this.handleSubmit}
            type="primary"
            className={styles.submitBtn}
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

const EditInfoComponent = Form.create()(EditInfo);

export default EditInfoComponent;
