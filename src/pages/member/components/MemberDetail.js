import React from 'react';
import { Icon } from 'antd';
import HouseholdDetail from '../../household/components/HouseholdDetail';
import HouseholdMemberList from './HouseholdMemberList';
import styles from './components.less';
import { getRequest } from '@/utils/api';

import { Info } from '@/components/BusinessComponent/BusCom';
import { MEMBER_DETAIL } from '@/services/SysInterface';

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
                <Icon type="tags" className={styles.iconDom} />
                政治面貌
              </p>
              <p className={styles.cardContent}>{fetchData.politicsFaceStr}</p>
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
          <div className={styles.midOneLeft}>
            <div className={styles.midOneTitle}>
              <span />
              <span>个人信息</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>微信头像：</span>
                <div className={styles.imgWrap}>
                  <img src={fetchData.wxPortrait} alt="" />
                </div>
              </div>
              <div className={styles.itemDom}>
                <span>微信昵称：</span>
                <span>{fetchData.wxNickname}</span>
              </div>
              <div className={styles.itemDom}>
                <span>微信手机号：</span>
                <span>{fetchData.wxPhoneNumber}</span>
              </div>
            </div>
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <div className={styles.btnWrap}>
                <Info title="户口簿详情" info={<HouseholdDetail id={fetchData.householdId} />}>
                  <p style={{ color: '#fff' }}>查看详情</p>
                </Info>
              </div>
              <span>户口簿信息</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户口簿版本号</span>
                <p>{householdRegisterVo.version}</p>
              </div>
              <div className={styles.itemDom}>
                <span>编号</span>
                <p>{householdRegisterVo.householdNumber}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户号</span>
                <p>{householdRegisterVo.householdRegisterNumber}</p>
              </div>
              <div className={styles.itemDom}>
                <span>户主</span>
                <p>{householdRegisterVo.householderName}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户别</span>
                <p>{householdRegisterVo.householdTypeStr}</p>
              </div>
              <div className={styles.itemDom}>
                <span>住址</span>
                <p>{householdRegisterVo.homeAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.bottomTitle}>
            <span />
            <span>户口簿成员</span>
          </div>
          {fetchData && fetchData.id && (
            <HouseholdMemberList dataSource={fetchData.householdRegisterVo.listMember} />
          )}
        </div>
      </div>
    );
  }
}

export default MemberDetail;
