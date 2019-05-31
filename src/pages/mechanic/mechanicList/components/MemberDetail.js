import React from 'react';
import { Tooltip, Icon, notification } from 'antd';
import TableList from './TableList';
import MechanicOrderList from './MechanicOrderList';
import styles from './components.less';
import { postRequest } from '@/utils/api';

import { MECHANIC_MSG, MECHANIC_UPDATE } from '@/services/FirstPartyInterface';
import MechanicEquipmentList from './MechanicEquipmentList';
import ScoreRecord from '../../../information/equipmentDealer/components/ScoreRecord';

class MemberDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
      mechanicCertificateList: [],
    };
  }

  componentWillMount = async () => {
    const data = await postRequest(`${MECHANIC_MSG}/${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        fetchData: data.data,
        mechanicCertificateList: data.data.mechanicCertificateList,
      });
    }
  };

  attestation = async () => {
    const data = await postRequest(MECHANIC_UPDATE, {
      id: this.state.fetchData.id,
      attestationState: 2,
    });
    if (data.status === 200) {
      notification.info({ message: data.msg, description: data.subMsg });
      this.componentWillMount();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    const { fetchData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
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

        <div className={styles.midWrap}>
          <div className={styles.midLeft}>
            <div className={styles.titleDom}>
              <span />
              <span>技工认证信息</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>头像面</span>
                <img src={fetchData.idPhotoJust} alt="" />
              </div>
              <div className={styles.itemDom}>
                <span>国徽面</span>
                <img src={fetchData.idPhotoBack} alt="" />
              </div>
              <div className={styles.btnWrap}>
                {fetchData.attestationState === 1 && (
                  <span onClick={this.attestation} className={styles.btnDom}>
                    通过
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.midRight}>
            <div className={styles.titleDom}>
              <span />
              <span>证书信息</span>
            </div>
            <div className={styles.conWrap}>
              {this.state.mechanicCertificateList.map(listItem => (
                <div className={styles.itemDom} key={listItem.id}>
                  <p>
                    <span>证书名称：</span>
                    <span>{listItem.certificateName}</span>
                  </p>
                  {listItem.certificatePhoto.split('#').map(url => (
                    <div style={{ display: 'inline-block' }}>
                      <img src={url} alt="" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {fetchData.teamId && (
          <div className={styles.bottomWrap}>
            <div className={styles.titleDom}>
              <span />
              <span>团队管理</span>
            </div>
            <TableList id={fetchData.teamId} label={fetchData.list} />
          </div>
        )}
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>历史订单</span>
          </div>
          {fetchData.id && <MechanicOrderList id={fetchData.id} />}
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>合作过的设备商</span>
          </div>
          {fetchData.id && <MechanicEquipmentList id={fetchData.id} />}
        </div>

        {fetchData.wxId > 0 && (
          <div className={styles.bottomWrap}>
            <div className={styles.titleDom}>
              <span />
              <span>评分记录</span>
            </div>
            <ScoreRecord
              callback={this.componentWillMount}
              id={fetchData.wxId}
              historicalScore={fetchData.currentScore}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MemberDetail;
