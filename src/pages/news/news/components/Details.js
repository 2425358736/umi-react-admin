import React from 'react';
import { Icon } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { GetNewsBulletin } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetNewsBulletin}?id=${this.props.id}`);
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
            <span>标题：：{InfoData.title}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                类型
              </p>
              <p className={styles.cardContent}>{InfoData.typeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                创建时间
              </p>
              <p className={styles.cardContent}>{InfoData.createDate}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                浏览次数
              </p>
              <p className={styles.cardContent}>{InfoData.readersNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>{InfoData.isReleaseStr}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>标题图片</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  {InfoData.titlePicture && (
                    <img alt="标题图片" src={InfoData.titlePicture} STYLE={{ width: '150px' }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>内容</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div
                  className={styles.itemDom}
                  dangerouslySetInnerHTML={{ __html: InfoData.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
