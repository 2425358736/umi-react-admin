import React from 'react';
import { Spin, Modal, Button, Input, Form, Radio, Upload, Tag, Icon, notification } from 'antd';
import RichText from '../../../components/RichText';
import AddReceiver from './AddReceiver';
import { getRequest, postRequest, jsonString, http } from '@/utils/api';

import { NOTICE_DETAIL, NOTICE_ADD, NOTICE_EDIT } from '@/services/SysInterface';

const styles = require('./NoticeAdd.less');

class NoticeAdd extends React.Component {
  memberId = null;

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      modalOpen: false,
      fileUrl: '',
      content: '',
      idArr: [],
      objArr: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.id > 0) {
      const data = await getRequest(`${NOTICE_DETAIL}?id=${this.props.id}`);
      if (data.status === 200) {
        const dataClone = data.data;
        this.setState({
          content: dataClone.content,
        });
        this.props.form.setFieldsValue({
          type: dataClone.type,
          state: dataClone.state,
          title: dataClone.title.toString(),
        });
        if (dataClone.type === 2) {
          const arr = [];
          dataClone.receiveIds.split(',').forEach(item => {
            arr.push(parseInt(item, 10));
          });
          const arr1 = [];
          dataClone.list.forEach(item => {
            const cloneItem = item;
            cloneItem.id = item.memberId;
            arr1.push(cloneItem);
          });
          this.setState({
            idArr: arr,
            objArr: arr1,
          });
        }
        if (dataClone.type === 1) {
          this.setState({
            fileUrl: dataClone.enclosure,
          });
        }
      }
    }
  };

  /**
   * 富文本编辑器内容改变
   */
  // eslint-disable-next-line react/sort-comp
  content = null;

  getContent = content => {
    this.content = content;
  };

  /**
   * 上传附件
   */
  upLoadChange = info => {
    if (info.file.status !== 'uploading') {
      let url = '';
      info.fileList.forEach(file => {
        if (typeof file.response !== 'undefined') {
          url = `${url + file.response.data.ossPath}`;
        } else {
          url = `${url + file.name}`;
        }
      });
      this.setState({ fileUrl: url });
    }
  };

  /**
   * 上传附件
   */
  deleteMan = id => {
    const { idArr, objArr } = this.state;
    const arr = idArr.filter(item => item !== id);
    const arr1 = objArr.filter(item => item.id !== id);
    this.setState({
      idArr: arr,
      objArr: arr1,
    });
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
      if (this.props.form.getFieldValue('type') === 2) {
        if (Array.isArray(this.state.idArr) && this.state.idArr.length === 0) {
          notification.error({ message: '请选择接收人' });
          return;
        }
      }
      this.setState({
        buttonLoading: true,
      });
      let json = this.props.form.getFieldsValue();
      jsonString(json);
      json = {
        ...json,
        receiveIds: [...this.state.idArr].join(),
        content: this.content ? this.content : this.state.content,
        enclosure: this.state.fileUrl,
      };
      let data = {};
      if (this.props.id > 0) {
        json.id = this.props.id;
        data = await postRequest(NOTICE_EDIT, json);
      } else {
        data = await postRequest(NOTICE_ADD, json);
      }
      this.setState({
        buttonLoading: false,
      });
      if (data.status === 200) {
        notification.success({ message: data.msg });
        this.content = null;
        this.setState({
          idArr: [],
          fileUrl: '',
        });
        this.props.form.resetFields();
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
    this.content = null;
    this.setState({
      idArr: [],
      fileUrl: '',
    });
    this.props.form.resetFields();
    this.props.callback(false);
  };

  /**
   * 关闭选择接收人 Modal
   */
  closeModal = (idArr, objArr) => {
    this.setState({ modalOpen: false });
    if (idArr) {
      this.setState({
        idArr,
        objArr,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const selectType = this.props.form.getFieldValue('type') || '';
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>通告信息</span>
            </div>

            <Form.Item label="类型" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>新闻</Radio>
                  <Radio value={1}>公告</Radio>
                  <Radio value={2}>通知</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            {selectType === 2 && (
              <div className={styles.rowDom}>
                <span>
                  <span style={{ color: 'f00' }}>*</span>接收人：
                </span>
                {Array.isArray(this.state.objArr) && this.state.objArr.length > 0 ? (
                  this.state.objArr.map(item => (
                    <Tag key={item.id} closable onClose={() => this.deleteMan(item.id)}>
                      {item.fullName}
                    </Tag>
                  ))
                ) : (
                  <span
                    onClick={() => {
                      this.setState({
                        modalOpen: true,
                      });
                    }}
                  >
                    请选择
                  </span>
                )}
              </div>
            )}

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

            <div className={styles.rowDom}>
              <span>
                <span style={{ color: 'f00' }}>*</span>内容：
              </span>
              <div className={styles.colDom}>
                {this.props.id > 0 && this.state.content !== '' && (
                  <RichText getContent={this.getContent} content={this.state.content} />
                )}
                {(typeof this.props.id === 'undefined' ||
                  this.props.id === '' ||
                  this.props.id === null) && (
                  <RichText getContent={this.getContent} content={this.state.content} />
                )}
              </div>
            </div>

            {selectType === 1 && (
              <div className={styles.rowDom}>
                <span>
                  <span style={{ color: 'f00' }}>*</span>上传附件：
                </span>
                <div className={styles.colDom}>
                  {/* 编辑展示附件 */}
                  {this.props.id > 0 &&
                    this.state.fileUrl !== '' &&
                    typeof this.state.fileUrl !== 'undefined' &&
                    this.state.fileUrl !== null && (
                      <Tag closable onClose={() => this.setState({ fileUrl: '' })}>
                        <a style={{ color: 'rgba(26, 179, 147, 1)' }} href={this.state.fileUrl}>
                          点击下载
                        </a>
                      </Tag>
                    )}
                  {/* 编辑更换附件 */}
                  {this.props.id > 0 &&
                    (typeof this.state.fileUrl === 'undefined' ||
                      this.state.fileUrl === '' ||
                      this.state.fileUrl === null) && (
                      <Upload action={`${http}/file/fileUploader`} onChange={this.upLoadChange}>
                        {(this.state.fileUrl === '' ||
                          typeof this.state.fileUrl === 'undefined' ||
                          this.state.fileUrl === null) && (
                          <Button>
                            <Icon type="upload" /> 点击上传
                          </Button>
                        )}
                      </Upload>
                    )}
                  {/* 新增 */}
                  {(typeof this.props.id === 'undefined' ||
                    this.props.id === '' ||
                    this.props.id === null) && (
                    <Upload action={`${http}/file/fileUploader`} onChange={this.upLoadChange}>
                      {(this.state.fileUrl === '' ||
                        typeof this.state.fileUrl === 'undefined' ||
                        this.state.fileUrl === null) && (
                        <Button>
                          <Icon type="upload" /> 点击上传
                        </Button>
                      )}
                    </Upload>
                  )}
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
                  <Radio value={0}>否</Radio>
                  <Radio value={1}>是</Radio>
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
          <Modal
            title="选择接收人"
            width={800}
            visible={this.state.modalOpen}
            footer={null}
            onCancel={this.closeModal}
            destroyOnClose
          >
            <AddReceiver callback={this.closeModal} />
          </Modal>
        </div>
      </Spin>
    );
  }
}

const NoticeAddComponent = Form.create()(NoticeAdd);

export default NoticeAddComponent;
