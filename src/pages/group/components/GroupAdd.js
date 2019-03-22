import React from 'react';
import { Spin, DatePicker, Button, Input, Form, Radio, Select, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { SYS_Dict, SYS_ADD_USER } from '@/services/SysInterface';

const styles = require('./GroupAdd.less');

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      nationArr: [],
      branchArr: [],
      groupArr: [],
    };
  }

  componentDidMount() {
    this.initialization();
    this.props.form.setFieldsValue({
      sex: 0,
    });
  }

  initialization = async () => {
    // 民族列表
    const nationArr = await postRequest(`${SYS_Dict}/8`);
    if (nationArr.status === 200) {
      this.setState({ nationArr: nationArr.data });
    }
    // 支部列表
    const branchArr = await postRequest(`${SYS_Dict}/10`);
    if (branchArr.status === 200) {
      this.setState({ branchArr: branchArr.data });
    }
    // 小组
    const groupArr = await postRequest(`${SYS_Dict}/9`);
    if (groupArr.status === 200) {
      this.setState({ groupArr: groupArr.data });
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
      const data = await postRequest(SYS_ADD_USER, json);
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
              <span>个人信息</span>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="身份证号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('idNumber', {
                    rules: [
                      {
                        required: true,
                        message: '请输入身份证号',
                      },
                    ],
                  })(<Input placeholder="请输入身份证号" />)}
                </Form.Item>
                <span className={styles.checkDom}>检索</span>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('fullName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名',
                      },
                    ],
                  })(<Input placeholder="请输入姓名" />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="性别" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,
                        message: '请选择性别',
                      },
                    ],
                  })(
                    <Radio.Group>
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="民族" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: '请输入民族',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择民族" optionFilterProp="children">
                      {this.state.nationArr.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.dataLabel}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="政治面貌" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('idNumber', {})(<Input placeholder="党员" disabled />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="手机号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('phoneNumber', {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号',
                      },
                    ],
                  })(<Input placeholder="请输入手机号" />)}
                </Form.Item>
              </div>
            </div>

            {/* 分割线 */}

            <div className={styles.titleDom}>
              <span />
              <span>组织信息</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="入党日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('departmentIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择入党日期',
                      },
                    ],
                  })(<DatePicker style={{ width: '100%' }} placeholder="请选择入党日期" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item
                  label="入党支部"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  className={styles.roleListDiv}
                >
                  {getFieldDecorator('roleIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择入党支部',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择入党支部" optionFilterProp="children">
                      {this.state.branchArr.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.dataLabel}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item
                  label="当前支部"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  className={styles.roleListDiv}
                >
                  {getFieldDecorator('roleIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择当前支部',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择当前支部" optionFilterProp="children">
                      {this.state.branchArr.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.dataLabel}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item
                  label="小组"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  className={styles.roleListDiv}
                >
                  {getFieldDecorator('roleIds', {
                    rules: [
                      {
                        required: true,
                        message: '请选择小组',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择小组" optionFilterProp="children">
                      {this.state.groupArr.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.dataLabel}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="支部书记" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('idNumber', {
                    rules: [
                      {
                        required: true,
                        message: '请输入支部书记',
                      },
                    ],
                  })(<Input placeholder="请输入支部书记" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="支部联系人" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('fullName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入支部联系人',
                      },
                    ],
                  })(<Input placeholder="请输入支部联系人" />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom} style={{ width: '50%' }}>
              <div className={styles.colDom}>
                <Form.Item label="联系人电话" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('remarks', {
                    rules: [
                      {
                        required: true,
                        message: '请输入联系人电话',
                      },
                    ],
                  })(<Input placeholder="请输入联系人电话" />)}
                </Form.Item>
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
