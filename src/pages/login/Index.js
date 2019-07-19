import React from 'react';
import { Form, Icon, notification, Input, Button } from 'antd';
import router from 'umi/router';
import { postFormDateRequest } from '../../utils/api';
import GetToken from './Service';

import style from './index.less';

const FormItem = Form.Item;

class Index extends React.Component {
  state = {};

  onSubmit = async () => {
    const json = {};
    json.grant_type = 'password';
    json.scope = 'all';
    json.username = 'chen';
    json.password = '123456';

    const data = await postFormDateRequest(GetToken, json, {
      Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
      'Tenant-Id': '029205',
    });
    if (data.access_token) {
      await localStorage.setItem('Authorization', `Bearer ${data.access_token}`);
      await localStorage.setItem('userInfo', JSON.stringify(data));
      router.push('/index');
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
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
              {getFieldDecorator('username', {
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
