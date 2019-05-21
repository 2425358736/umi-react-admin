import React from 'react';
import moment from 'moment';
import { Spin, Button, Input, Form, Select, notification } from 'antd';
import { getRequest, postRequest } from '@/utils/api';

import { SYS_Dict, EDIT_MEMBER, MEMBER_DETAIL } from '@/services/SysInterface';

const styles = require('./InfoCheckEdit.less');

class MemEdit extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      moveInTypeArr: [],
      moveOutTypeArr: [],
      fullName: '',
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    // 迁入类型列表
    const moveInTypeArr = await postRequest(`${SYS_Dict}/11`);
    if (moveInTypeArr.status === 200) {
      this.setState({ moveInTypeArr: moveInTypeArr.data });
    }
    // 迁出类型列表
    const moveOutTypeArr = await postRequest(`${SYS_Dict}/12`);
    if (moveOutTypeArr.status === 200) {
      this.setState({ moveOutTypeArr: moveOutTypeArr.data });
    }
    const data = await getRequest(`${MEMBER_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        fullName: data.data.fullName,
      });
      this.props.form.setFieldsValue({
        moveInDate: data.data.moveInDate,
        moveInType: data.data.moveInType,
        moveOutDate: data.data.moveOutDate,
        moveOutType: data.data.moveOutType,
        delFlag: data.data.delFlag,
        deathType: data.data.deathType,
        objectionType: data.data.objectionType,
      });
    }
  };

  /**
   * 提交
   */
  handleSubmit = async () => {
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    const obj = this.props.form.getFieldsValue();
    let { moveOutDate, moveInDate } = obj;
    if (moveOutDate) {
      moveOutDate = moment(moveOutDate, 'YYYYMMDD').format('YYYY-MM-DD');
      if (moveOutDate === 'Invalid date') {
        adopt = false;
        moveOutDate = null;
        notification.error({ message: '迁出日期格式不正确，示例（2019年01月25日）：20190125' });
      }
    }

    if (moveInDate) {
      moveInDate = moment(moveInDate, 'YYYYMMDD').format('YYYY-MM-DD');
      if (moveInDate === 'Invalid date') {
        adopt = false;
        moveInDate = null;
        notification.error({ message: '迁入日期格式不正确，示例（2019年01月25日）：20190125' });
      }
    }

    if (adopt) {
      this.setState({
        buttonLoading: true,
      });
      const json = this.props.form.getFieldsValue();
      if (moveInDate) {
        json.moveInDate = moveInDate;
      }
      if (moveOutDate) {
        json.moveOutDate = moveOutDate;
      }
      json.id = this.props.id;
      const data = await postRequest(EDIT_MEMBER, json);
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

  /**
   * 取消
   */
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
              <span>姓名：{this.state.fullName}</span>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="迁入日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('moveInDate', {
                    rules: [
                      {
                        required: false,
                        message: '请输入迁入日期',
                      },
                    ],
                  })(<Input placeholder="请输入迁入日期" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="迁入类型" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('moveInType', {
                    rules: [
                      {
                        required: false,
                        message: '请选择迁入类型',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择迁入类型" optionFilterProp="children">
                      {this.state.moveInTypeArr.map(item => (
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
                <Form.Item label="迁出日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('moveOutDate', {
                    rules: [
                      {
                        required: false,
                        message: '请输入迁出日期',
                      },
                    ],
                  })(<Input placeholder="请输入迁出日期" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="迁出类型" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('moveOutType', {
                    rules: [
                      {
                        required: false,
                        message: '请选择迁出类型',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择迁出类型" optionFilterProp="children">
                      {this.state.moveOutTypeArr.map(item => (
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
                <Form.Item label="成员状态" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('deathType', {
                    rules: [
                      {
                        required: false,
                        message: '请选择成员状态',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择成员状态" optionFilterProp="children">
                      <Select.Option value={0}>正常</Select.Option>
                      <Select.Option value={1}>注销</Select.Option>
                      <Select.Option value={2}>减员</Select.Option>
                      <Select.Option value={3}>死亡</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </div>

              <div className={styles.colDom}>
                <Form.Item label="核对状态" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('objectionType', {
                    rules: [
                      {
                        required: false,
                        message: '请选择核对状态',
                      },
                    ],
                  })(
                    <Select showSearch placeholder="请选择核对状态" optionFilterProp="children">
                      <Select.Option value={0}>无异议</Select.Option>
                      <Select.Option value={1}>有异议</Select.Option>
                      <Select.Option value={2}>已处理</Select.Option>
                    </Select>
                  )}
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

const MemEditComponent = Form.create()(MemEdit);

export default MemEditComponent;
