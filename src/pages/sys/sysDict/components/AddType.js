import React from 'react';
import { Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

const styles = require('./Add.less');

class AddType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.record && this.props.record.id > 0) {
      this.props.form.resetFields();
      const { record } = this.props;
      this.props.form.setFieldsValue({
        typeTitle: record.typeTitle,
        typeCode: record.typeCode,
        typeSpecification: record.typeSpecification,
      });
    }
  }

  /**
   * 提交
   */
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
      if (this.props.record && this.props.record.id > 0) {
        json.id = this.props.record.id;
        data = await postRequest('/sys/upSysDictType', json);
      } else {
        data = await postRequest('/sys/addSysDictType', json);
      }
      if (data.status === 200) {
        this.props.callback('refresh');
        notification.success({ message: data.msg });
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
      this.setState({
        buttonLoading: false,
      });
    }
  };

  /**
   * 取消
   */
  handleCancel = () => {
    this.props.callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.sendMsgWrap}>
        <Form layout="horizontal">
          <Form.Item label="类型标题" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('typeTitle', {
              rules: [
                {
                  required: true,
                  message: '类型标题',
                },
              ],
            })(<Input placeholder="请输入类型标题" />)}
          </Form.Item>
          <Form.Item label="类型编号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('typeCode', {
              rules: [
                {
                  required: true,
                  message: '类型编号',
                },
              ],
            })(<Input placeholder="请输入类型编号" />)}
          </Form.Item>
          <Form.Item label="类型说明" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('typeSpecification', {
              rules: [
                {
                  required: true,
                  message: '类型说明',
                },
              ],
            })(<Input placeholder="请输入类型说明" />)}
          </Form.Item>
        </Form>
        <div className={styles.btnGroup}>
          <Button
            className={styles.submitBtn}
            loading={this.state.buttonLoading}
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
          >
            提交
          </Button>
          <Button
            className={styles.cancelBtn}
            onClick={this.handleCancel}
            type="primary"
            htmlType="submit"
          >
            取消
          </Button>
        </div>
      </div>
    );
  }
}

const AddUpComponent = Form.create()(AddType);

export default AddUpComponent;
