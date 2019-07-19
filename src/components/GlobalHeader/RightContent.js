import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Spin, Menu, Icon, Avatar } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { onMenuClick, theme } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
          <Icon type="user" />
          <Link to="/profile" style={{ display: 'inline-block' }}>
            <span>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {userInfo ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} src={userInfo.avatar} alt="avatar" />
              <span className={styles.name}>{userInfo.nick_name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
