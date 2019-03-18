import React from 'react';
import { Button, Input, Form } from 'antd';
import UploadImg from '../../../../components/UpLoad/UploadImage';

const styles = require('./Test.less');

class AddUp extends React.Component {
  imgUrl = '';

  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    };
  }

  /**
   * 上传图片回调
   */
  uploadCallback = url => {
    this.imgUrl = url;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formWrap}>
        <Form>
          <div className={styles.titleDom}>
            <span />
            <span>基本信息</span>
          </div>
          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item label="宣传语" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsBrand', {
                  rules: [
                    {
                      required: true,
                      message: '请输入宣传语',
                    },
                  ],
                })(<Input placeholder="请输入宣传语" />)}
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsSort', {
                  rules: [
                    {
                      pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                      message: '只允许输入数字',
                    },
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(<Input placeholder="请输入排序" />)}
              </Form.Item>
            </div>
          </div>

          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item label="品牌" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsBrand', {
                  rules: [
                    {
                      required: true,
                      message: '请选择品牌',
                    },
                  ],
                })(<Input placeholder="请输入宣传语" />)}
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsSort', {
                  rules: [
                    {
                      pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                      message: '只允许输入数字',
                    },
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(<Input placeholder="请输入排序" />)}
              </Form.Item>
            </div>
          </div>

          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>高级信息</span>
          </div>

          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item label="品牌" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsBrand', {
                  rules: [
                    {
                      required: true,
                      message: '请选择品牌',
                    },
                  ],
                })(<Input placeholder="请输入宣传语" />)}
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsSort', {
                  rules: [
                    {
                      pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                      message: '只允许输入数字',
                    },
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(<Input placeholder="请输入排序" />)}
              </Form.Item>
            </div>
          </div>

          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item label="品牌品牌" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsBrand', {
                  rules: [
                    {
                      required: true,
                      message: '请选择品牌',
                    },
                  ],
                })(<Input placeholder="请输入宣传语" />)}
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsSort', {
                  rules: [
                    {
                      pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                      message: '只允许输入数字',
                    },
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(<Input placeholder="请输入排序" />)}
              </Form.Item>
            </div>
          </div>

          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>其他</span>
          </div>

          <div className={styles.otherDom}>
            <div className={styles.otherColDom}>
              <h4>
                <span>
                  <span className={styles.starDom}>*</span>pad产品图片
                </span>
              </h4>
              <div className={styles.imgWrap}>
                <UploadImg fileList={this.imgUrl} callback={this.uploadCallback} />
              </div>
              <div>
                <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                  {getFieldDecorator('goodsSort', {
                    rules: [
                      {
                        pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                        message: '只允许输入数字',
                      },
                      {
                        required: true,
                        message: '请输入排序',
                      },
                    ],
                  })(<Input placeholder="请输入排序" />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.otherColDom}>
              <Form.Item label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('goodsSort', {
                  rules: [
                    {
                      pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                      message: '只允许输入数字',
                    },
                    {
                      required: true,
                      message: '请输入排序',
                    },
                  ],
                })(<Input.TextArea autosize={{ minRows: 9 }} placeholder="请输入排序" />)}
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
    );
  }
}

const AddUpComponent = Form.create()(AddUp);

export default AddUpComponent;
