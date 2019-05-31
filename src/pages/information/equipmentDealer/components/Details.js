import React from 'react';
import { Icon, notification } from 'antd';
import HistoricalOrder from './HistoricalOrder';
import CooperativeMechanic from './CooperativeMechanic';
import ScoreRecord from './ScoreRecord';
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
                认证状态
              </p>
              <p className={styles.cardContent}>{InfoData.attestationStateStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                法人
              </p>
              <p className={styles.cardContent}>{InfoData.legalPersonName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                信用分数
              </p>
              <p className={styles.cardContent}>{InfoData.currentScore}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                当前余额
              </p>
              <p className={styles.cardContent}>{InfoData.balanceAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                认证日期
              </p>
              <p className={styles.cardContent}>{InfoData.createDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            {InfoData.attestationState === 0 && (
              <span onClick={this.attestation} className={styles.btnWrap}>
                通过
              </span>
            )}
            <span>信息详情</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midLeft}>
              <div className={styles.itemDom}>
                <span>经营范围：</span>
                <span>{InfoData.businessDescription}</span>
              </div>
              <div className={styles.itemDom}>
                <span>营业执照：</span>
                <img src={InfoData.businessLicense} alt="" />
              </div>
            </div>

            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>负责人姓名</span>
                  <p>{InfoData.leadingCadreName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>负责人身份证号</span>
                  <p>{InfoData.leadingCadreIdNumber}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>负责人手机号</span>
                  <p>{InfoData.leadingCadrePhone}</p>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>证件照正面：</span>
                  <img src={InfoData.idPhotoJust} alt="" />
                </div>
                <div className={styles.itemDom}>
                  <span>营业执照：</span>
                  <img src={InfoData.idPhotoBack} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>历史订单</span>
          </div>
          <HistoricalOrder id={this.props.id} />
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>合作技工</span>
          </div>
          <CooperativeMechanic id={this.props.id} />
        </div>

        {InfoData.wxId > 0 && (
          <div className={styles.bottomWrap}>
            <div className={styles.titleDom}>
              <span />
              <span>评分记录</span>
            </div>
            <ScoreRecord
              callback={this.componentWillMount}
              id={InfoData.wxId}
              historicalScore={InfoData.currentScore}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NoticeDetail;
