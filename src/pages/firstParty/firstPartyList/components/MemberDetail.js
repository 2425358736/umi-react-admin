import React from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './components.less';
import ReactQMap from 'react-qmap';
import { postRequest } from '@/utils/api';

import { FIRST_PARTY_MSG } from '@/services/FirstPartyInterface';

class MemberDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        longitude: 0,
        latitude: 0,
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
              <ReactQMap
                center={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                initialOptions={{ zoomControl: true, mapTypeControl: true }}
                apiKey="7Y5BZ-7DTC3-FVN3J-3Z4X2-ROLLJ-N6B7Q"
                style={{ height: 300 }} // 高度和宽度默认占父元素的100%
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberDetail;
