import React from 'react';
import { Tooltip, Icon } from 'antd';
import ReceiverList from './ReceiverList';
import styles from './NoticeDetail.less';
import { getRequest } from '@/utils/api';

import { PAYMENT_DETAIL } from '@/services/SysInterface';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${PAYMENT_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  render() {
    const { fetchData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.topTitle}>
            <span />
            <span>标题：{fetchData.entryName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="diff" className={styles.iconDom} />
                类型
              </p>
              <p className={styles.cardContent}>
                {fetchData.releaseStatus === 0
                  ? '未发布'
                  : fetchData.releaseStatus === 1
                  ? '已发布'
                  : '已结束'}
              </p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="snippets" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>
                {fetchData.releaseStatus === 0
                  ? '未发布'
                  : fetchData.releaseStatus === 1
                  ? '已发布'
                  : '已结束'}
              </p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="clock-circle" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={fetchData.idNumber}>
                <p className={styles.cardContent}>{fetchData.createDate}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="smile" className={styles.iconDom} />
                确定人数
              </p>
              <p className={styles.cardContent}>{fetchData.paymentObjectStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="frown" className={styles.iconDom} />
                否定人数
              </p>
              <p className={styles.cardContent}>{fetchData.paymentNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="meh" className={styles.iconDom} />
                待定人数
              </p>
              <p className={styles.cardContent}>{fetchData.aggregateAmount}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>通知内容</span>
            </div>
            <div className={styles.conWrap}>{fetchData.aa}</div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomTitle}>
            <span />
            <span>接收人列表</span>
          </div>
          {fetchData && fetchData.paymentObject === 0 && <ReceiverList />}
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
