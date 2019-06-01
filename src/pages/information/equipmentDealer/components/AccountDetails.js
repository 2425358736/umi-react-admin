import React from 'react';
import { Icon, notification } from 'antd';
import TransactionRecord from './TransactionRecord';
import styles from './Detail.less';
import { getRequest, postRequest } from '@/utils/api';

import { DealerInfo, CertificationAudit } from '@/services/EquipmentDealer';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${DealerInfo}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
      });
    }
  };

  attestation = async () => {
    const data = await postRequest(CertificationAudit, {
      id: this.state.InfoData.id,
      attestationState: 1,
    });
    if (data.status === 200) {
      notification.info({ message: data.msg, description: data.subMsg });
      this.componentWillMount();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>设备厂商名称：{InfoData.equipmentDealerCompany}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                剩余金额
              </p>
              <p className={styles.cardContent}>{InfoData.surplusAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                剩余体验金
              </p>
              <p className={styles.cardContent}>{InfoData.experienceAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                冻结金额
              </p>
              <p className={styles.cardContent}>{InfoData.freezingAmount}</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>交易记录</span>
          </div>
          <TransactionRecord callback={this.componentWillMount} id={this.props.id} />
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
