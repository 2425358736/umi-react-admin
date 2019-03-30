import React from 'react';
import { Icon } from 'antd';
import InfoMemList from './InfoMemList';
import MemberList from './MemberList';
import ExamineRecord from './ExamineRecord';
import styles from './components.less';
import { getRequest } from '@/utils/api';

import { Info } from '@/components/BusinessComponent/BusCom';

import { EXAMINE_Detail } from '@/services/SysInterface';

class ExamineInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        list: [],
      },
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${EXAMINE_Detail}?id=${this.props.id}`);
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
          <div className={styles.titleDom}>
            <span />
            {fetchData.changeType === 0 && <span>户号：{fetchData.householdRegisterNumber}</span>}
            {fetchData.changeType !== 0 && <span>编号：{fetchData.householdNumber}</span>}
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="bars" className={styles.iconDom} />
                申请类型
              </p>
              <p className={styles.cardContent}>{fetchData.changeTypeStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                几队
              </p>
              <p className={styles.cardContent}>{fetchData.troopsStr}</p>
            </div>
            {fetchData.changeType !== 0 && (
              <div className={styles.cardDom}>
                <p className={styles.cardTitle}>
                  <Icon type="credit-card" className={styles.iconDom} />
                  户号
                </p>
                <p className={styles.cardContent}>{fetchData.householdRegisterNumber}</p>
              </div>
            )}

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
            {(fetchData.changeType === 1 || fetchData.changeType === 2) && (
              <div className={styles.btnWrap}>
                <Info title="户口簿详情" info={<MemberList id={fetchData.householdId} />}>
                  <p style={{ color: '#fff' }}>查看当前成员列表</p>
                </Info>
              </div>
            )}
            <span>成员列表</span>
          </div>
          <div>
            {fetchData && fetchData.householdId && (
              <InfoMemList
                type={fetchData.changeType}
                id={fetchData.householdId}
                list={fetchData.list}
              />
            )}
            <div className={styles.conWrap}>
              {fetchData.changeType === 2 && (
                <div className={styles.subPicWrap}>
                  <div className={styles.imgWrap}>
                    <img src={fetchData.homePicture} alt="" />
                  </div>
                  <p>户主页</p>
                </div>
              )}
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
              <div className={styles.inputWrap}>
                <p>备注: {fetchData.remarks}</p>
                {fetchData.changeType === 0 && <p>编号: {fetchData.householdNumber}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>审核记录</span>
          </div>
          {fetchData && fetchData.id && <ExamineRecord propId={fetchData.id} />}
        </div>
      </div>
    );
  }
}

export default ExamineInfo;
