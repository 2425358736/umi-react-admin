import React from 'react';
import { Tooltip, Icon } from 'antd';
// import HouseholdMemberList from './HouseholdMemberList';
import styles from './components.less';
import { postRequest } from '@/utils/api';

import { MECHANIC_MSG } from '@/services/FirstPartyInterface';

class MemberDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        householdRegisterVo: {
          listMember: [],
        },
      },
    };
  }

  componentWillMount = async () => {
    const data = await postRequest(`${MECHANIC_MSG}/${this.props.id}`);
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
            <span>姓名：{fetchData.realName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                认证状态
              </p>
              <p className={styles.cardContent}>{fetchData.attestationStateStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                身份证号
              </p>
              <Tooltip title={fetchData.idNumber}>
                <p className={styles.cardContent}>{fetchData.idNumber}</p>
              </Tooltip>
              ,
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                手机号
              </p>
              <Tooltip title={fetchData.idNumber}>
                <p className={styles.cardContent}>{fetchData.attestationPhone}</p>
              </Tooltip>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                信用分数
              </p>
              <p className={styles.cardContent}>{fetchData.currentScore}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                认证日期
              </p>
              <Tooltip title={fetchData.createDate}>
                <p className={styles.cardContent}>{fetchData.createDate}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                公司名称
              </p>
              <Tooltip title={fetchData.factoryName}>
                <p className={styles.cardContent}>{fetchData.factoryName}</p>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneLeft}>
            <div className={styles.midOneTitle}>
              <span />
              <span>技工认证信息</span>
            </div>
            <div className={styles.conWrap} />
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>证书信息</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomTitle}>
            <span />
            <span>团队管理</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberDetail;
