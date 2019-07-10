import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';
import ChargeProjectList from './ChargeProjectList';

import { GetWxMember } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
      wxTreatmentArchivesVoList: [],
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetWxMember}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
        wxTreatmentArchivesVoList: data.data.wxTreatmentArchivesVoList || [],
      });
    }
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>姓名：{InfoData.userName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="home" className={styles.iconDom} />
                所属门店
              </p>
              <p className={styles.cardContent}>{InfoData.storeName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="trophy" className={styles.iconDom} />
                会员等级
              </p>
              <p className={styles.cardContent}>{InfoData.gradeStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                手机号
              </p>
              <Tooltip title={InfoData.phone}>
                <p className={styles.cardContent}>{InfoData.phone}</p>
              </Tooltip>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="pay-circle" className={styles.iconDom} />
                当前余额
              </p>
              <p className={styles.cardContent}>{InfoData.residualAmount}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>宝贝信息</span>
          </div>
          <ChargeProjectList dataSource={this.state.wxTreatmentArchivesVoList} />
        </div>
      </div>
    );
  }
}

export default Details;
