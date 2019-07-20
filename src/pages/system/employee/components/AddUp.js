import React from 'react';
import { Spin, Button, Input, Form, notification } from 'antd';
import { postRequest, getRequest, jsonString } from '@/utils/api';
import { addOrUpEmployee, employeeInfo } from '../Service';

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
      let user = await getRequest(employeeInfo, { id: this.props.id });
      user = user.data;
      this.props.form.setFieldsValue({
        userName: user.userName,
        officephone: user.officephone,
        mobilePhone: user.mobilePhone,
        displayorder: user.displayorder,
        password: user.password,
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
        data = await postRequest(addOrUpEmployee, json);
      } else {
        data = await postRequest(addOrUpEmployee, json);
      }
      this.setState({
        buttonLoading: false,
      });
      if (data.code === 200) {
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
                <FormItem label="用户名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('userName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                    ],
                  })(<Input placeholder="请输入用户名" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="办公室电话" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('officephone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入办公室电话',
                      },
                    ],
                  })(<Input placeholder="请输入办公室电话" />)}
                </FormItem>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="移动电话" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('mobilePhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入移动电话',
                      },
                    ],
                  })(<Input placeholder="请输入移动电话" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="显示顺序" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('displayorder', {
                    rules: [
                      {
                        required: true,
                        message: '请输入显示顺序',
                      },
                    ],
                  })(<Input placeholder="请输入显示顺序" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="密码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input placeholder="请输入密码" />)}
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
