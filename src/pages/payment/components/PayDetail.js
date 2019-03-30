import React from 'react';
import { Tooltip, Icon } from 'antd';
import PayListSingle from './PayListSingle';
import styles from './PayDetail.less';
import { getRequest } from '@/utils/api';

import { MEMBER_DETAIL } from '@/services/SysInterface';

class PayDetail extends React.Component {
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
    const data = await getRequest(`${MEMBER_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  render() {
    const { fetchData } = this.state;
    const { householdRegisterVo } = this.state.fetchData;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.topTitle}>
            <span />
            <span>名称：{fetchData.fullName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>
                {fetchData.sex === 0 ? '男' : fetchData.sex === 1 ? '女' : '未知'}
              </p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={fetchData.idNumber}>
                <p className={styles.cardContent}>{fetchData.idNumber}</p>
              </Tooltip>
              ,
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                缴费对象
              </p>
              <p className={styles.cardContent}>{fetchData.nationalitiesStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                参缴数
              </p>
              <p className={styles.cardContent}>{fetchData.politicsFaceStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                总金额
              </p>
              <p className={styles.cardContent}>{fetchData.phoneNumber}</p>
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
              <div className={styles.itemDom}>
                <p>{householdRegisterVo.version}</p>
              </div>
              <div className={styles.itemDom}>
                <p>{householdRegisterVo.householdNumber}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <p>{householdRegisterVo.householdRegisterNumber}</p>
              </div>
              <div className={styles.itemDom}>
                <p>{householdRegisterVo.householderName}</p>
              </div>
            </div>
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>缴费说明</span>
            </div>
            <p className={styles.conWrap}>{householdRegisterVo.householderName}</p>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomTitle}>
            <span />
            <span>缴费列表</span>
          </div>
          <PayListSingle dataSource={fetchData.householdRegisterVo.listMember} />
        </div>
      </div>
    );
  }
}

export default PayDetail;
