import React from 'react';
import { Tooltip, Icon } from 'antd';
import ReceiverList from './ReceiverList';
import styles from './NoticeDetail.less';
import { getRequest } from '@/utils/api';

import { NOTICE_DETAIL } from '@/services/SysInterface';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${NOTICE_DETAIL}?id=${this.props.id}`);
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
                类型
              </p>
              <p className={styles.cardContent}>{fetchData.typeStr}</p>
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
                <Icon type="smile" className={styles.iconDom} />
                确定人数
              </p>
              <p className={styles.cardContent}>{fetchData.definiteNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="frown" className={styles.iconDom} />
                否定人数
              </p>
              <p className={styles.cardContent}>{fetchData.negativeNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="meh" className={styles.iconDom} />
                待定人数
              </p>
              <p className={styles.cardContent}>{fetchData.undeterminedNumber}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.titleDom}>
              <span />
              <span>通知内容</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: fetchData.content }} />
            {fetchData.aa && (
              <div className={styles.midBottom}>
                附件：
                <a href={fetchData.aa}>{fetchData.enclosure}</a>
              </div>
            )}
          </div>
        </div>

        {fetchData && fetchData.type === 2 && (
          <div className={styles.bottomWrap}>
            <div className={styles.titleDom}>
              <span />
              <span>接收人列表</span>
            </div>
            <ReceiverList />
          </div>
        )}
      </div>
    );
  }
}

export default NoticeDetail;
