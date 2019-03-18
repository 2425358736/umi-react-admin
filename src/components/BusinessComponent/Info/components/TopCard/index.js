import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

class TopCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { title: '编号', num: '20190101', icon: 'global' },
        { title: '编号', num: '20190101', icon: 'global' },
        { title: '编号', num: '20190101', icon: 'global' },
        { title: '编号', num: '20190101', icon: 'global' },
        { title: '编号', num: '20190101', icon: 'global' },
      ],
    };
  }

  render() {
    return (
      <div className={styles.topWrap}>
        <div className={styles.topTitle}>
          <span />
          <span>春节促销-干海参优惠</span>
        </div>
        <div className={styles.cardWrap}>
          {this.state.arr.map((item, index) => {
            const i = index;
            return (
              <div className={styles.cardDom} key={i}>
                <p className={styles.cardTitle}>
                  <Icon type={item.icon} className={styles.iconDom} />
                  {item.title}
                </p>
                <p className={styles.cardContent}>
                  <span>￥</span>
                  {item.num}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopCard;
