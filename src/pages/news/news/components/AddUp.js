import React from 'react';
import { Spin, Button, Input, Form, notification, Radio, Upload, Icon } from 'antd';
import { ContentUtils } from 'braft-utils';
import BraftEditor from 'braft-editor';
import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import { postRequest, requestParameterProcessing, getRequest, http } from '@/utils/api';

import 'braft-editor/dist/index.css';

import { GetNewsBulletin, UpNewsBulletin, AddNewsBulletin } from '../Service';

const styles = require('./AddUp.less');

const FormItem = Form.Item;

class AddUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      editorState: BraftEditor.createEditorState(null),
      fileList: [],
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      type: '0',
      isRelease: '0',
    });
    if (this.props.id > 0) {
      this.setState({ loading: true });
      let info = await getRequest(`${GetNewsBulletin}?id=${this.props.id}`);
      info = info.data;
      this.setState({
        editorState: BraftEditor.createEditorState(info.content),
      });
      this.props.form.setFieldsValue({
        type: info.type.toString(),
        title: info.title,
        titlePicture: info.titlePicture,
        isRelease: info.isRelease.toString(),
      });
      // 异步设置编辑器内容
      setTimeout(() => {
        this.props.form.setFieldsValue({
          content: BraftEditor.createEditorState(info.content),
        });
      }, 500);
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
      json.content = json.content.toHTML();
      requestParameterProcessing(json);

      let data;
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(UpNewsBulletin, json);
      } else {
        data = await postRequest(AddNewsBulletin, json);
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

  handleChange = editorState => {
    this.setState({
      editorState,
    });
  };

  uploadHandler = param => {
    this.setState({
      fileList: param.fileList,
    });
    if (param.file.response) {
      const content = ContentUtils.insertMedias(this.state.editorState, [
        {
          type: 'IMAGE',
          url: param.file.response.data.filePath,
        },
      ]);
      this.props.form.setFieldsValue({
        content,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            action={`${http}/file/fileUploader`}
            showUploadList={false}
            onChange={this.uploadHandler}
            fileList={this.state.fileList}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        ),
      },
    ];

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
            <FormItem label="类型" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">新闻</Radio>
                  <Radio value="1">公告</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="标题" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入标题" />)}
            </FormItem>

            <FormItem label="标题图片" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('titlePicture', {
                valuePropName: 'fileUrl',
                getValueFromEvent: file => file.fileList,
                rules: [
                  {
                    required: true,
                    message: '请上传门店标题图',
                  },
                ],
              })(<UploadPicture number={1} />)}
            </FormItem>

            <FormItem label="内容" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('content', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入正文内容',
                  },
                ],
              })(
                <BraftEditor
                  style={{ border: '1px solid #e9e9e9' }}
                  onChange={this.handleChange}
                  className="my-editor"
                  placeholder="请输入正文内容"
                  extendControls={extendControls}
                />
              )}
            </FormItem>

            <FormItem label="是否发布" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('isRelease', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否发布',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="0">不发布</Radio>
                  <Radio value="1">发布</Radio>
                </Radio.Group>
              )}
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
