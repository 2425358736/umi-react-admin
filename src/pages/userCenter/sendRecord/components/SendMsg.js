import React from 'react';
import { Form, Input, Select, Button, Popconfirm, Radio, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { SYS_SEND_INFO, SYS_USER_LIST } from '@/services/SysInterface';

const styles = require('./SendMsg.less');

const RadioGroup = Radio.Group;
const { Option } = Select;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      sysUserList: [],
    };
  }

  componentWillMount = () => {
    this.init();
  };

  componentDidMount = () => {
    this.props.form.setFieldsValue({
      informationChannel: '0',
    });
  };

  init = async () => {
    this.props.form.resetFields();
    const data = await postRequest(SYS_USER_LIST, { type: 1, query: {} });
    if (data.status === 200) {
      this.setState({
        sysUserList: data.data.list,
      });
    }
  };

  submit = async () => {
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
      const data = await postRequest(SYS_SEND_INFO, json);
      if (data.status === 200) {
        notification.success({ message: data.msg });
        this.props.callback(true);
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
      this.setState({
        buttonLoading: false,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.sendMsgWrap}>
        <Form layout="horizontal">
          <Form.Item label="发送方式" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            {getFieldDecorator('informationChannel')(
              <RadioGroup>
                <Radio value="0">站内信</Radio>
                <Radio value="1">短信</Radio>
                <Radio value="2">微信</Radio>
                <Radio value="3">移动端推送</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item label="消息类型" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            {getFieldDecorator('informationType')(
              <Select>
                <Option value="0">通知</Option>
                <Option value="1">消息</Option>
                <Option value="2">待办</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="收件人" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            {getFieldDecorator('receiverIds')(
              <Select mode="multiple" optionFilterProp="title">
                {this.state.sysUserList.map(json => (
                  <Option key={json.id} value={json.id} title={json.loginName}>
                    {`${json.loginName}(${json.realName})`}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="标题" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            {getFieldDecorator('informationTitle')(<Input />)}
          </Form.Item>

          <Form.Item label="内容" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            {getFieldDecorator('informationContent')(<Input.TextArea rows={4} />)}
          </Form.Item>
        </Form>
        <div className={styles.btnGroup}>
          <Popconfirm
            title="确定发送吗?"
            onConfirm={() => {
              this.submit();
            }}
          >
            <Button
              className={styles.submitBtn}
              loading={this.state.buttonLoading}
              type="primary"
              htmlType="submit"
            >
              发送
            </Button>
          </Popconfirm>
          <Button
            className={styles.cancelBtn}
            onClick={() => {
              this.props.form.resetFields();
            }}
            type="primary"
            htmlType="submit"
          >
            清空
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(AddUp);
