import React from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './NoticeDetail.less';
import { getRequest } from '@/utils/api';

import { POLICYGUIDEMSG } from '@/services/SysInterface';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${POLICYGUIDEMSG}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  render() {
    const { fetchData } = this.state;
    return (
      <div className={styles.noticeWrap}>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>标题：{fetchData.title}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="diff" className={styles.iconDom} />
                服务类型
              </p>
              <p className={styles.cardContent}>{fetchData.typeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="diff" className={styles.iconDom} />
                指南类型
              </p>
              <p className={styles.cardContent}>{fetchData.fileTypeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="snippets" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>{fetchData.stateStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="clock-circle" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={fetchData.createDate}>
                <p className={styles.cardContent}>{fetchData.createDate}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="diff" className={styles.iconDom} />
                浏览次数
              </p>
              <p className={styles.cardContent}>{fetchData.browseFrequency}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.titleDom}>
              <span />
              <span>通知内容</span>
            </div>
            <div>{fetchData.content}</div>
            {fetchData.fileType === 0 && (
              <div className={styles.midBottom}>
                附件：
                <a href={fetchData.enclosure}>{fetchData.enclosure}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
