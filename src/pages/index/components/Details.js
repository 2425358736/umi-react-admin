import React from 'react';
import { Icon } from 'antd';
import styles from './Detail.less';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    this.setState({
      InfoData: { id: this.props.id, name: 'ssss' },
    });
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>设备id：{InfoData.id}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                设备名称
              </p>
              <p className={styles.cardContent}>{InfoData.name}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>设备信息详情</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>信息1</span>
                  <p>aaaa</p>
                </div>
                <div className={styles.itemDom}>
                  <span>信息2</span>
                  <p>bbb</p>
                </div>
                <div className={styles.itemDom}>
                  <span>信息3</span>
                  <p>cccc</p>
                </div>
                <div className={styles.itemDom}>
                  <span>信息4</span>
                  <p>信息4</p>
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
