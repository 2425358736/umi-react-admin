import React from 'react';
import { Icon } from 'antd';
import styles from './SendInfo.less';
import { postRequest } from '@/utils/api';

import { SYS_INFO_INFO } from '@/services/SysInterface';

class SendInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
    };
  }

  componentDidMount = async () => {
    const data = await postRequest(`${SYS_INFO_INFO}/${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        fetchData: data.data,
      });
    }
  };

  render() {
    const { fetchData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>{fetchData.informationTitle}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="link" className={styles.iconDom} />
                发送方式
              </p>
              <p className={styles.cardContent}>{fetchData.informationChannelStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                消息类型
              </p>
              <p className={styles.cardContent}>{fetchData.informationTypeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="gold" className={styles.iconDom} />
                消息状态
              </p>
              <p className={styles.cardContent}>{fetchData.informationStateStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="clock-circle" className={styles.iconDom} />
                发送时间
              </p>
              <p className={styles.cardContent}>{fetchData.createDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>内容</span>
          </div>
          <div className={styles.conWrap}>{fetchData.informationContent}</div>
        </div>
      </div>
    );
  }
}

export default SendInfo;
