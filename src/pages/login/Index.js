import React from 'react';
import { Form, Icon, notification, Input, Button } from 'antd';
import router from 'umi/router';
import { postRequest } from '../../utils/api';
import Login from './Service';

import style from './index.less';

const FormItem = Form.Item;

class Index extends React.Component {
  state = {};

  onSubmit = async () => {
    const json = this.props.form.getFieldsValue();

    const data = await postRequest(Login, json);
    if (data.code === 200) {
      await localStorage.setItem('Authorization', `Bearer ${data.data.token}`);
      router.push('/index');
    } else {
      notification.error({ message: data.msg, description: '账号/密码  admin/123456' });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const sectionStyle = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      backgroundSize: 'cover',
    };
    return (
      <div className={style.login} style={sectionStyle}>
        <div className={style.loginLeftplaceholder} />
        <div className={style.loginForm}>
          <div className={style.loginLogo}>
            <span>登录</span>
          </div>
          <Form onSubmit={this.onSubmit} style={{ maxWidth: '300px' }}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button onClick={this.onSubmit} style={{ width: '100%' }}>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={style.loginRightplaceholder} />
      </div>
    );
  }
}
const IndexCom = Form.create()(Index);

export default IndexCom;
