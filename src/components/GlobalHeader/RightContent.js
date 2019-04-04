import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, notification } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { NoticeIcon } from 'ant-design-pro';
import Link from 'umi/link';
import Websocket from 'react-websocket';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { postRequest, ws } from '@/utils/api';

import { SYS_NOTICE, SYS_READ_MAIL, SYS_READ_ALL } from '@/services/SysInterface';

export default class GlobalHeaderRight extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
      loading: false,
    };
  }

  getNoticeData() {
    const { notices = [] } = this.state;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  componentWillMount = () => {
    this.getNotices();
  };

  getNotices = async () => {
    this.setState({
      loading: true,
    });
    const data = await postRequest(SYS_NOTICE);
    if (data.status === 200) {
      this.setState({
        notices: data.data,
        loading: false,
      });
    }
  };

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = async clickedItem => {
    this.setState({
      loading: true,
    });
    const data = await postRequest(`${SYS_READ_MAIL}/${clickedItem.id}`);
    if (data.status === 200) {
      this.getNotices();
    }
  };

  readAll = async tabName => {
    this.setState({
      loading: true,
    });
    let typeStr = '';
    if (tabName === 'notification') {
      typeStr = '0';
    } else if (tabName === 'message') {
      typeStr = '1';
    } else if (tabName === 'event') {
      typeStr = '2';
    }
    const data = await postRequest(`${SYS_READ_ALL}?typeStr=${typeStr}`);
    if (data.status === 200) {
      this.getNotices();
    }
  };

  render() {
    const { currentUser, onMenuClick, theme } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
          <Icon type="user" />
          <Link to="/profile" style={{ display: 'inline-block' }}>
            <span>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="insideMail">
          <Icon type="mail" />
          <Link to="/sys/insideMail" style={{ display: 'inline-block' }}>
            <span>站内信</span>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="userinfo"> */}
        {/* <Icon type="setting" /> */}
        {/* <FormattedMessage id="menu.account.settings" defaultMessage="account settings" /> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key="triggerError"> */}
        {/* <Icon type="close-circle" /> */}
        {/* <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" /> */}
        {/* </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {currentUser && currentUser.id && (
          <Websocket
            url={`${ws}?${currentUser.id}`}
            onMessage={data => {
              const result = JSON.parse(data);
              if (result.message) {
                notification.info({
                  message: '你有新的消息',
                  description: result.message,
                });
              }
              this.getNotices();
            }}
          />
        )}
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' }),
          ]}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={this.state.notices.length}
          onItemClick={(item, tabProps) => {
            this.changeReadState(item, tabProps);
          }}
          onClear={this.readAll}
          onPopupVisibleChange={visible => {
            console.log(visible);
          }}
          locale={{
            emptyText: '没有消息',
            clear: '清空',
            loadedAll: '加载更多',
            loadMore: '加载中',
          }}
          loading={this.state.loading}
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.event}
            list={noticeData.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
        {currentUser.loginName ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.picture}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.loginName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}
