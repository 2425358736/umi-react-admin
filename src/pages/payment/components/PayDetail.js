import React from 'react';
import { Tooltip, Icon } from 'antd';
import PayListSingle from './PayListSingle';
import PayListFamily from './PayListFamily';
import styles from './PayDetail.less';
import { getRequest } from '@/utils/api';

import { PAYMENT_DETAIL } from '@/services/SysInterface';

class PayDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        list: [],
      },
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
            <span>名称：{fetchData.entryName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
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
                <Icon type="credit-card" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={fetchData.createDate}>
                <p className={styles.cardContent}>{fetchData.createDate}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                缴费对象
              </p>
              <p className={styles.cardContent}>{fetchData.paymentObjectStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                参缴数
              </p>
              <p className={styles.cardContent}>{fetchData.paymentNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                总金额
              </p>
              <p className={styles.cardContent}>{fetchData.aggregateAmount}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>缴费标准</span>
            </div>
            <div className={styles.conWrap}>
              {fetchData &&
                Array.isArray(fetchData.list) &&
                fetchData.list.length > 0 &&
                fetchData.list.map((item, index) => (
                  <div className={styles.itemDom} key={index.toString()}>
                    <p>
                      {item.money} {item.unit}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>缴费说明</span>
            </div>
            <p className={styles.conWrap}>{fetchData.paymentInstructions}</p>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomTitle}>
            <span />
            <span>缴费列表</span>
          </div>
          {fetchData && fetchData.paymentObject === 0 && <PayListFamily id={this.props.id} />}
          {fetchData && fetchData.paymentObject === 1 && <PayListSingle id={this.props.id} />}
        </div>
      </div>
    );
  }
}

export default PayDetail;
