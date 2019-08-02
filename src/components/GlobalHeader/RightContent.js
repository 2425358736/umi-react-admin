import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Spin, Menu, Icon, Avatar, Tooltip, notification } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import CurrentUser from './Service';
import { getRequest } from '@/utils/api';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      userInfo: {},
    };
  }

  componentWillMount = () => {
    this.getUser();
  };

  getUser = async () => {
    const data = await getRequest(CurrentUser);
    this.setState({
      userInfo: data.data,
    });
  };

  // 浏览器全屏
  requestFullScreen = () => {
    const de = document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen();
    } else if (de.msRequestFullscreen) {
      de.msRequestFullscreen();
    } else {
      notification.open({
        message: '你的浏览器不支持',
        description: '按F11，通常可实现浏览器全屏！',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      });
    }
    this.setState({
      isFullScreen: true,
    });
  };

  // 退出浏览器全屏
  exitFullscreen = () => {
    const de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
    this.setState({
      isFullScreen: false,
    });
  };

  render() {
    const { onMenuClick, theme } = this.props;
    const { isFullScreen, userInfo } = this.state;
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
        <Tooltip>
          {!isFullScreen && (
            <a onClick={this.requestFullScreen} className={styles.action}>
              <Icon style={{ fontSize: '20px' }} type="fullscreen" />
            </a>
          )}
          {isFullScreen && (
            <a onClick={this.exitFullscreen} className={styles.action}>
              <Icon style={{ fontSize: '20px' }} type="fullscreen-exit" />
            </a>
          )}
        </Tooltip>
        {userInfo ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} src={userInfo.portrait} alt="avatar" />
              <span className={styles.name}>{userInfo.userName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}

        <Tooltip>
          <a onClick={this.exitFullscreen} className={styles.action}>
            <span
              onClick={() => {
                window.open(
                  'http://note.youdao.com/noteshare?id=3de1539089059ccee464e40d76eebb19&sub=4252FE44C00A4F51AC76865006C1AC84'
                );
              }}
            >
              帮助中心
            </span>
          </a>
        </Tooltip>
      </div>
    );
  }
}
