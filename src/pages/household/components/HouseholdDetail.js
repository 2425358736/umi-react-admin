import React from 'react';
import { Icon } from 'antd';
import MemberList from './MemberList';
import HistoryList from './HistoryList';
import styles from './components.less';
import { getRequest } from '@/utils/api';

import { HOUSEHOLD_DETAIL } from '@/services/SysInterface';

class HouseholdDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${HOUSEHOLD_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      this.homePicture = data.data.homePicture;
      this.indexPictures = data.data.indexPictures;
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
          <div className={styles.titleDom}>
            <span />
            <span>编号：{fetchData.householdNumber}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                户号
              </p>
              <p className={styles.cardContent}>{fetchData.householdRegisterNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                户别
              </p>
              <p className={styles.cardContent}>{fetchData.householdTypeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                户主
              </p>
              <p className={styles.cardContent}>{fetchData.householderName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="environment" className={styles.iconDom} />
                住址
              </p>
              <p className={styles.cardContent}>{fetchData.homeAddress}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>成员列表</span>
          </div>
          {fetchData && fetchData.id && <MemberList dataSource={fetchData.listMember} />}
          <ul className={styles.historyUl}>
            <li>
              <div className={styles.historyImgWrap}>
                <img src={fetchData.homePicture} alt="" />
              </div>
              <p>户主页</p>
            </li>
            <li>
              <div className={styles.historyImgWrap}>
                <img src={fetchData.indexPictures} alt="" />
              </div>
              <p>索引页</p>
            </li>
          </ul>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>户口簿历史列表</span>
          </div>
          {fetchData && fetchData.id && <HistoryList dataSource={fetchData.listVersion} />}
        </div>
      </div>
    );
  }
}

export default HouseholdDetail;
