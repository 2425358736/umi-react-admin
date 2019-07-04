import React from 'react';
import { Icon } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { GetCommodity } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetCommodity}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
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
            <span>商品名称：：{InfoData.commodityName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                所属分类
              </p>
              <p className={styles.cardContent}>{InfoData.categoryIdStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                单位
              </p>
              <p className={styles.cardContent}>{InfoData.measureStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                成本价
              </p>
              <p className={styles.cardContent}>{InfoData.costPrice}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                售价
              </p>
              <p className={styles.cardContent}>{InfoData.sellingPrice}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>备注</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <p>{InfoData.remarks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
