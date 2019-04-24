import React from 'react';
import { Spin, Button, Input, Form, Radio, Upload, Icon, notification } from 'antd';
import { getRequest, postRequest, jsonString, http } from '@/utils/api';

import { POLICYGUIDEMSG, ADDPOLICYGUIDE, UPDATEPOLICYGUIDE } from '@/services/SysInterface';

const styles = require('./NoticeAdd.less');

const { TextArea } = Input;

class NoticeAdd extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      fileUrl: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.id > 0) {
      const data = await getRequest(`${POLICYGUIDEMSG}?id=${this.props.id}`);
      if (data.status === 200) {
        const dataClone = data.data;
        this.props.form.setFieldsValue({
          type: dataClone.type.toString(),
          state: dataClone.state.toString(),
          title: dataClone.title.toString(),
          fileType: dataClone.fileType.toString(),
          content: dataClone.content,
        });
        if (dataClone.fileType === 0) {
          const fileList = [
            {
              uid: '1',
              name: dataClone.enclosure,
              status: 'done',
              url: dataClone.enclosure,
            },
          ];
          this.setState({
            fileUrl: fileList,
          });
        }
      }
    } else {
      this.props.form.setFieldsValue({
        type: '0',
        state: '0',
        fileType: '0',
      });
    }
  };

  /**
   * 上传附件
   */
  upLoadChange = info => {
    if (info.file.status !== 'uploading') {
      let url = '';
      info.fileList.forEach(file => {
        if (typeof file.response !== 'undefined') {
          url = file.response.data.ossPath;
        } else {
          url = file.name;
        }
      });
      const fileList = [
        {
          uid: '1',
          name: url,
          status: 'done',
          url,
        },
      ];
      this.setState({ fileUrl: fileList });
    } else {
      this.setState({ fileUrl: info.fileList });
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
      let json = this.props.form.getFieldsValue();
      jsonString(json);
      if (this.state.fileUrl.length === 0 && json.fileType === '0') {
        notification.error({ message: '请上传附件' });
      } else {
        if (this.state.fileUrl.length === 0 && json.fileType === '0') {
          json = {
            ...json,
            enclosure: this.state.fileUrl[0].url,
          };
        }
        this.setState({
          buttonLoading: true,
        });
        let data = {};
        if (this.props.id > 0) {
          json.id = this.props.id;
          data = await postRequest(UPDATEPOLICYGUIDE, json);
        } else {
          data = await postRequest(ADDPOLICYGUIDE, json);
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
    }
  };

  /**
   * 取消
   */
  handleCancel = () => {
    this.content = null;
    this.props.form.resetFields();
    this.props.callback(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const selectType = this.props.form.getFieldValue('fileType') || '';
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>政策指南录入</span>
            </div>

            <Form.Item label="服务类型" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择服务类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">户籍</Radio>
                  <Radio value="1">教育</Radio>
                  <Radio value="2">养老保险</Radio>
                  <Radio value="3">医疗保险</Radio>
                  <Radio value="4">五保户</Radio>
                  <Radio value="5">计划生育</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="指南类型" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('fileType', {
                rules: [
                  {
                    required: true,
                    message: '请选择指南类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">政策文件</Radio>
                  <Radio value="1">流程说明</Radio>
                  <Radio value="2">常见问题</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="标题" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入标题" />)}
            </Form.Item>

            <Form.Item
              label={selectType === '0' ? '描述' : selectType === '1' ? '说明' : '解答'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入内容',
                  },
                ],
              })(<TextArea rows={8} placeholder="请输入内容" />)}
            </Form.Item>

            {selectType === '0' && (
              <div className={styles.rowDom}>
                <span>
                  <span style={{ color: 'f00' }}>*</span>上传附件：
                </span>
                <div className={styles.colDom}>
                  <Upload
                    fileList={this.state.fileUrl}
                    action={`${http}/file/fileUploader`}
                    onChange={this.upLoadChange}
                  >
                    <Button>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                </div>
              </div>
            )}

            <Form.Item label="是否立即发布" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否立即发布',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              )}
            </Form.Item>
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

const NoticeAddComponent = Form.create()(NoticeAdd);

export default NoticeAddComponent;
