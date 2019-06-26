import React from 'react';
import { Spin, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';
import {
  FIRST_PARTY_MSG,
  FIRST_PARTY_UPDATE,
  FIRST_PARTY_ADD,
} from '@/services/FirstPartyInterface';
import SetMap from '../../../../components/Map/SetMap';

const styles = require('./AddUp.less');

const FormItem = Form.Item;
const { Search } = Input;
class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      longitude: 0,
      latitude: 0,
      address: '',
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let firstPartyInfo = await postRequest(`${FIRST_PARTY_MSG}/${this.props.id}`);
      firstPartyInfo = firstPartyInfo.data;
      this.props.form.setFieldsValue({
        factoryName: firstPartyInfo.factoryName,
        specificLocation: firstPartyInfo.specificLocation,
        longitude: firstPartyInfo.longitude,
        latitude: firstPartyInfo.latitude,
        labels: firstPartyInfo.labels,
        acceptanceRange: firstPartyInfo.acceptanceRange,
      });
      this.setState({
        loading: false,
        longitude: firstPartyInfo.longitude,
        latitude: firstPartyInfo.latitude,
      });
    }
  };

  fillLonLat = location => {
    this.props.form.setFieldsValue({
      longitude: location.lng,
      latitude: location.lat,
    });
  };

  fillAddress = str => {
    this.setState({
      address: str,
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
      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(FIRST_PARTY_UPDATE, json);
      } else {
        data = await postRequest(FIRST_PARTY_ADD, json);
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
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>基本信息</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="甲方名称" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('factoryName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入甲方名称',
                      },
                    ],
                  })(<Input placeholder="请输入甲方名称" />)}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                <FormItem label="甲方地址" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('specificLocation', {
                    rules: [
                      {
                        required: true,
                        message: '请输入甲方地址',
                      },
                    ],
                  })(
                    <Search
                      placeholder="请输入甲方地址"
                      onSearch={value => this.fillAddress(value)}
                      enterButton
                    />
                  )}
                </FormItem>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="经度" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('longitude', {
                    rules: [
                      {
                        required: true,
                        message: '请输入经度',
                      },
                      {
                        required: true,
                        pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                        message: '请输入正确的经度',
                      },
                    ],
                  })(<Input placeholder="请输入经度" />)}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                <FormItem label="纬度" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('latitude', {
                    rules: [
                      {
                        required: true,
                        message: '请输入纬度',
                      },
                      {
                        required: true,
                        pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                        message: '请输入正确的纬度',
                      },
                    ],
                  })(<Input placeholder="请输入纬度" />)}
                </FormItem>
              </div>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="接单范围(m)" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('acceptanceRange', {
                    rules: [
                      {
                        required: true,
                        message: '请输入接单范围',
                      },
                      {
                        required: true,
                        pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                        message: '请输入正确的范围',
                      },
                    ],
                  })(<Input placeholder="请输入接单范围eg:3000" />)}
                </FormItem>
              </div>

              <div className={styles.colDom} />
            </div>
            {/* 分割线 */}

            <div className={styles.titleDom}>
              <span />
              <span>其他</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <FormItem label="标签" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('labels')(
                    <Input.TextArea autosize={{ minRows: 7 }} placeholder="多个请用，分隔" />
                  )}
                </FormItem>
              </div>
              <div className={styles.colDom}>
                {this.state.latitude !== 0 && this.state.longitude !== 0 && (
                  <SetMap
                    lat={this.state.latitude}
                    lng={this.state.longitude}
                    callback={location => {
                      this.fillLonLat(location);
                    }}
                  />
                )}
                {this.state.latitude === 0 && this.state.longitude === 0 && (
                  <SetMap
                    specificLocation={this.state.address}
                    callback={location => {
                      this.fillLonLat(location);
                      this.setState({
                        address: '',
                      });
                    }}
                  />
                )}
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
