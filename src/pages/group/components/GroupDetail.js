import React from 'react';
import { Icon } from 'antd';
import styles from './components.less';
import { getRequest } from '@/utils/api';

import { MEMBER_DETAIL } from '@/services/SysInterface';

class GroupDetail extends React.Component {
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
            <span>姓名：{fetchData.fullName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                小组
              </p>
              <p className={styles.cardContent}>{fetchData.idNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                身份证号
              </p>
              <p className={styles.cardContent}>{fetchData.idNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                性别
              </p>
              <p className={styles.cardContent}>
                {fetchData.sex === 0 ? '男' : fetchData.sex === 1 ? '女' : '未知'}
              </p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                民族
              </p>
              <p className={styles.cardContent}>{fetchData.nationalitiesStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                手机号
              </p>
              <p className={styles.cardContent}>{fetchData.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>党员信息</span>
            </div>

            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>入党日期</span>
                <p>{householdRegisterVo.version}</p>
              </div>
              <div className={styles.itemDom}>
                <span>当前支部</span>
                <p>{householdRegisterVo.householdNumber}</p>
              </div>
              <div className={styles.itemDom}>
                <span>支部联系人</span>
                <p>{householdRegisterVo.householdRegisterNumber}</p>
              </div>
            </div>

            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>入党支部</span>
                <p>{householdRegisterVo.householderName}</p>
              </div>
              <div className={styles.itemDom}>
                <span>支部书记</span>
                <p>{householdRegisterVo.date}</p>
              </div>
              <div className={styles.itemDom}>
                <span>联系人电话</span>
                <p>{householdRegisterVo.homeAddress}</p>
              </div>
            </div>

            <div className={styles.remarkWrap}>
              <span>备注</span>
              <p>{householdRegisterVo.date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDetail;
