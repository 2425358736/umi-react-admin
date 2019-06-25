import React from 'react';
import { Spin, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';
import { UpdateEquipmentDealer } from '@/services/EquipmentDealer';

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
      this.props.form.setFieldsValue({
        currentScore: this.props.currentScore,
      });
      this.setState({
        loading: false,
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
      json.id = this.props.id;
      const data = await postRequest(UpdateEquipmentDealer, json);
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
              <span>信用积分</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="信用积分" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('currentScore', {
                    rules: [
                      {
                        required: true,
                        message: '请输入甲方名称',
                      },
                    ],
                  })(<Input placeholder="请输入甲方名称" />)}
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
