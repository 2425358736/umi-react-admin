import React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Tooltip, Icon, notification } from 'antd';
import router from 'umi/router';
import { postRequest } from '../../utils/api';
import { SYS_LOGIN } from '../../services/SysInterface';

const styles = require('./index.less');

const { UserName, Password, Submit } = Login;

class Index extends React.Component {
  state = {
    userName: 'FFF',
    passWord: '123456',
  };

  onSubmit = async (err, values) => {
    const data = await postRequest(SYS_LOGIN, {
      loginName: values.userName || this.state.userName,
      password: values.passWord || this.state.passWord,
    });
    if (data.status === 200) {
      notification.success({ message: data.msg });
      await localStorage.setItem('Authorization', `Bearer ${data.data}`);
      router.push('/index');
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    return (
      <div
        className={styles.main}
        onKeyDown={async e => {
          if (e.keyCode === 13) {
            const data = await postRequest(SYS_LOGIN, {
              loginName: this.state.userName,
              password: this.state.passWord,
            });
            if (data.status === 200) {
              notification.success({ message: data.msg });
              await localStorage.setItem('Authorization', `Bearer ${data.data}`);
              router.push('/index');
            } else {
              notification.error({ message: data.msg, description: data.subMsg });
            }
          }
        }}
      >
        <div className={styles.loginWrap}>
          <div className={styles.loginLeft}>
            <i />
            <div>
              <p>劳务系统平台</p>
              <p />
            </div>
          </div>
          <Login onSubmit={this.onSubmit} className={styles.loginRight}>
            <div>
              <h3>登陆</h3>
              <UserName
                defaultValue={this.state.userName}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className={styles.inputDom}
                onChange={e => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
                name="loginName"
                placeholder="请输入用户名"
              />
              <Password
                defaultValue={this.state.passWord}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className={styles.inputDom}
                name="passWord"
                onChange={e => {
                  this.setState({
                    passWord: e.target.value,
                  });
                }}
                placeholder="请输入密码"
              />
            </div>
            <div style={{ textAlign: 'left', cursor: 'pointer', marginBottom: '24px' }}>
              <Tooltip title="忘记密码请联系管理员修改密码">
                <span style={{ color: '#666', fontSize: '14px' }}>忘记密码</span>
              </Tooltip>
            </div>
            <Submit className={styles.btnDom}>登陆</Submit>
          </Login>
        </div>
      </div>
    );
  }
}

export default Index;
