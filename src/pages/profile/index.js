import React from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { postRequest, jsonString } from '../../utils/api';
import EditInfo from './components/EditInfo';
import styles from './index.less';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      psOpen: false,
      buttonLoading: false,
      fetchData: {},
    };
  }

  componentWillMount() {
    this.fetchApi();
  }

  /**
   * 获取数据
   */
  fetchApi = async () => {
    const data = await postRequest('/sys/getUserInfoDetailed');
    this.setState({
      fetchData: data.data,
      psOpen: false,
    });
  };

  /**
   * 打开编辑 Modal
   */
  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  /**
   * 编辑回调
   * @param json
   */
  editCall = json => {
    if (json.type === 'submit') {
      this.fetchApi();
    }
    this.setState({
      isOpen: false,
    });
  };

  /**
   * 打开修改 Modal
   */
  editPs = () => {
    this.setState({
      psOpen: true,
    });
  };

  /**
   * 提交修改密码
   */
  editPassword = async () => {
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
      if (json.newPassword !== json.confirmPassword) {
        notification.error({ message: '两次输入的密码不一致', description: data.subMsg });
      }
      json.id = this.state.fetchData.id;
      const data = await postRequest('/sys/upPassword', json);
      if (data.status === 200) {
        notification.success({ message: data.msg });
        this.fetchApi();
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
    }
    this.setState({
      buttonLoading: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fetchData } = this.state;
    return (
      <div className={styles.profileDiv}>
        <Button className={styles.editBtn} type="primary" onClick={this.openModal}>
          编辑
        </Button>
        <ul>
          <li>
            <span>姓名</span>
            <span>{fetchData.loginName}</span>
          </li>
          <li>
            <span>邮箱</span>
            <span>{fetchData.email}</span>
          </li>
          <li>
            <span>手机</span>
            <span>{fetchData.phone}</span>
          </li>
          <li>
            <span>登陆密码</span>
            <span>
              ******
              <Button type="primary" className={styles.psBtn} onClick={this.editPs}>
                修改密码
              </Button>
            </span>
          </li>
        </ul>

        <Modal
          title="编辑个人信息"
          width={800}
          visible={this.state.isOpen}
          footer={null}
          onCancel={() => this.editCall({ type: 'cancel' })}
          destroyOnClose
        >
          <EditInfo callback={this.editCall} id={fetchData.id} />
        </Modal>

        <Modal
          title="修改密码"
          width={400}
          visible={this.state.psOpen}
          confirmLoading={this.state.buttonLoading}
          onOk={this.editPassword}
          onCancel={() => this.setState({ psOpen: false })}
          destroyOnClose
        >
          <div style={{ margin: '20px 0' }}>
            <Form>
              <Form.Item label="旧密码" labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('oldPassword', {
                  rules: [
                    {
                      required: true,
                      message: '请输入旧密码',
                    },
                  ],
                })(<Input placeholder="请输入旧密码" />)}
              </Form.Item>
              <Form.Item label="新密码" labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('newPassword', {
                  rules: [
                    {
                      required: true,
                      message: '请输入新密码',
                    },
                  ],
                })(<Input placeholder="请输入新密码" />)}
              </Form.Item>
              <Form.Item label="确认密码" labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: '请确认密码',
                    },
                  ],
                })(<Input placeholder="请确认密码" />)}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

const ProfileComponent = Form.create()(Profile);

export default ProfileComponent;
