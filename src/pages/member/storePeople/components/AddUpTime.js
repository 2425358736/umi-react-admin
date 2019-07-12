/* eslint-disable no-const-assign,no-shadow,prefer-destructuring */

import React from 'react';
import { Spin, Button, Form, notification, TimePicker } from 'antd';
import moment from 'moment';
import { postRequest, getRequest } from '@/utils/api';

import {
  GetTechnicianArrangeDay,
  UpTechnicianArrangeDay,
  AddTechnicianArrangeDay,
  GetTechnicianArrange,
} from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      arrange: {},
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    const res = await getRequest(`${GetTechnicianArrange}?id=${this.props.arrangeId}`);
    this.setState({
      arrange: res.data,
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let info = await getRequest(`${GetTechnicianArrangeDay}?id=${this.props.id}`);
      info = info.data;

      this.props.form.setFieldsValue({
        startDate: moment(moment(info.startDate).format('HH:mm:ss'), 'HH:mm:ss'),
        endDate: moment(moment(info.endDate).format('HH:mm:ss'), 'HH:mm:ss'),
      });
      this.setState({ loading: false });
    }
  };

  handleSubmit = async () => {
    const { arrange } = this.state;
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    if (adopt) {
      this.setState({
        buttonLoading: true,
      });
      const json = this.props.form.getFieldsValue();
      json.startDate = `${moment(arrange.arrangeDate).format('YYYY-MM-DD')} ${moment(
        json.startDate
      ).format('HH:mm:ss')}`;
      json.endDate = `${moment(arrange.arrangeDate).format('YYYY-MM-DD')} ${moment(
        json.endDate
      ).format('HH:mm:ss')}`;
      json.arrangeId = this.props.arrangeId;
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpTechnicianArrangeDay, json);
      } else {
        json.arrangeDate = arrange.arrangeDate;
        json.sysUserId = arrange.sysUserId;
        data = await postRequest(AddTechnicianArrangeDay, json);
      }
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
          <Form
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 },
            }}
          >
            <FormItem label="开始日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('startDate', {
                rules: [
                  {
                    required: true,
                    message: '请选择开始日期',
                  },
                ],
              })(<TimePicker />)}
            </FormItem>

            <FormItem label="结束日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('endDate', {
                rules: [
                  {
                    required: true,
                    message: '请选择结束日期',
                  },
                ],
              })(<TimePicker />)}
            </FormItem>
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
