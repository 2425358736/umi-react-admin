import React from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './components.less';
import { postRequest } from '@/utils/api';

import { FIRST_PARTY_MSG } from '@/services/FirstPartyInterface';
import SetMap from '../../../../components/Map/SetMap';

class MemberDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        longitude: null,
        latitude: null,
      },
    };
  }

  componentWillMount = async () => {
    const data = await postRequest(`${FIRST_PARTY_MSG}/${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        fetchData: data.data,
        longitude: parseFloat(data.data.longitude),
        latitude: parseFloat(data.data.latitude),
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
            <span>名称：{fetchData.factoryName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                地址
              </p>
              <Tooltip title={fetchData.specificLocation}>
                <p className={styles.cardContent}>{fetchData.specificLocation}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                经度
              </p>
              <p className={styles.cardContent}>{fetchData.longitude}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                纬度
              </p>
              <p className={styles.cardContent}>{fetchData.latitude}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={fetchData.createDate}>
                <p className={styles.cardContent}>{fetchData.createDate}</p>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneLeft}>
            <div className={styles.midOneTitle}>
              <span />
              <span>标签</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>{fetchData.labels ? fetchData.labels : ''}</span>
              </div>
            </div>
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>地图</span>
            </div>
            <div className={styles.conWrap}>
              {this.state.latitude !== undefined && this.state.longitude !== undefined && (
                <SetMap
                  lat={this.state.latitude}
                  lng={this.state.longitude}
                  callback={location => {
                    console.log(location);
                    this.setState({
                      latitude: location.lat,
                      longitude: location.lng,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberDetail;
