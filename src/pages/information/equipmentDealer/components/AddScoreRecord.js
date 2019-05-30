import React from 'react';
import { Spin, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

import { AddScore } from '@/services/WxScoreRecord';

const styles = require('./AddScoreRecord.less');

const FormItem = Form.Item;

class AddScoreRecord extends React.Component {
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
    this.props.form.setFieldsValue({
      historicalScore: this.props.historicalScore,
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
      json.wxId = this.props.wxId;
      jsonString(json);
      const data = await postRequest(AddScore, json);
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
              <span>基本信息</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="历史分数" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('historicalScore', {
                    rules: [
                      {
                        required: true,
                        message: '请输入历史分数',
                      },
                    ],
                  })(<Input disabled placeholder="请输入历史分数" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="加减分数" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('operationScore', {
                    rules: [
                      {
                        required: true,
                        message: '请输入加减分数',
                      },
                    ],
                  })(<Input placeholder="请输入加减分数" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="评分描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('scoringDescription', {
                    rules: [
                      {
                        required: true,
                        message: '请输入评分描述',
                      },
                    ],
                  })(<Input placeholder="请输入评分描述" />)}
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

const AddScoreRecordCom = Form.create()(AddScoreRecord);

export default AddScoreRecordCom;
