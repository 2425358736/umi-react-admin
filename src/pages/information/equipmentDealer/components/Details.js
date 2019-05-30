import React from 'react';
import { Icon } from 'antd';
import HistoricalOrder from './HistoricalOrder';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { DealerInfo } from '@/services/EquipmentDealer';

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

  render() {
    const { InfoData } = this.state;
    const fetchData = {};
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
            <span className={styles.btnWrap}>通过</span>
            <span>信息详情</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midLeft}>
              <div className={styles.itemDom}>
                <span>经营范围：</span>
                <span>
                  {fetchData.intoPartyDate}
                  阿打算打算的111111111111111111111111111111111111111111111111111111111111111111111111111111
                </span>
              </div>
              <div className={styles.itemDom}>
                <span>营业执照：</span>
                <img src="http://pic37.nipic.com/20140113/8800276_184927469000_2.png" alt="" />
              </div>
            </div>

            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>负责人姓名</span>
                  <p>{fetchData.intoBranchName}刘志强</p>
                </div>
                <div className={styles.itemDom}>
                  <span>负责人身份证号</span>
                  <p>{fetchData.branchSecretary}12312334254234</p>
                </div>
                <div className={styles.itemDom}>
                  <span>负责人手机号</span>
                  <p>{fetchData.contactTelephone}123132142</p>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>营业执照：</span>
                  <img src="http://pic37.nipic.com/20140113/8800276_184927469000_2.png" alt="" />
                </div>
                <div className={styles.itemDom}>
                  <span>营业执照：</span>
                  <img src="http://pic37.nipic.com/20140113/8800276_184927469000_2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>列表</span>
          </div>
          <HistoricalOrder />
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
