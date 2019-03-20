import React from 'react';
import { Select, Button, Input, Form, notification } from 'antd';
import { postRequest, jsonString } from '@/utils/api';

const styles = require('./Add.less');

class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      sysDistTypeList: [],
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    const sysDistTypeList = await postRequest('/sys/sysDictTypeList');

    this.setState({
      sysDistTypeList: sysDistTypeList.data,
    });
    this.props.form.resetFields();
    // 列表所传数据
    if (this.props.record && this.props.record.id > 0) {
      const { record } = this.props;
      this.props.form.setFieldsValue({
        dictTypeId: record.dictTypeId.toString(),
        dataLabel: record.dataLabel,
        sort: record.sort,
        description: record.description,
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
    if (adopt) {
      this.setState({
        buttonLoading: true,
      });
      const json = this.props.form.getFieldsValue();
      jsonString(json);
      let data;
      if (this.props.record && this.props.record.id > 0) {
        json.id = this.props.record.id;
        data = await postRequest('/sys/upSysDict', json);
      } else {
        data = await postRequest('/sys/addSysDict', json);
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

  selectType = async value => {
    this.state.sysDistTypeList.forEach(sysDictType => {
      if (sysDictType.id.toString() === value.toString()) {
        this.props.form.setFieldsValue({
          dictTypeId: sysDictType.dictTypeId,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.sendMsgWrap}>
        <Form layout="horizontal">
          <Form.Item label="数据字典类型" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('dictTypeId', {
              rules: [
                {
                  required: true,
                  message: '请选择数据字典类型',
                },
              ],
            })(
              <Select
                showSearch
                placeholder="请选择数据字典类型"
                optionFilterProp="children"
                onChange={this.selectType}
              >
                {this.state.sysDistTypeList.map(d => (
                  <Select.Option key={d.id}>{d.typeTitle}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="字典展示" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('dataLabel', {
              rules: [
                {
                  required: true,
                  message: '请输入字典展示',
                },
              ],
            })(<Input placeholder="请输入字典展示" />)}
          </Form.Item>
          <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: true,
                  message: '请输入排序',
                },
              ],
            })(<Input placeholder="请输入排序" />)}
          </Form.Item>

          <Form.Item label="描述" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入描述',
                },
              ],
            })(<Input placeholder="请输入描述" />)}
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

const AddUpComponent = Form.create()(AddList);

export default AddUpComponent;
