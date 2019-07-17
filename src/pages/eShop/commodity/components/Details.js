import React from 'react';
import { Icon } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { GetEShopCommodityDetailed } from '../Service';

import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetEShopCommodityDetailed}?id=${this.props.id}`);
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
            <span>商城商品名称：：{InfoData.shopCommodityName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                所属分类
              </p>
              <p className={styles.cardContent}>{InfoData.shopCategoryName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                是否上架
              </p>
              <p className={styles.cardContent}>{InfoData.isSellStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                创建日期
              </p>
              <p className={styles.cardContent}>{InfoData.createDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>商品信息</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>规格</span>
                  <p>{InfoData.specsStr}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>已售数量</span>
                  <p>{InfoData.saledQuantity}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>商城售价</span>
                  <p>{InfoData.shopSalesPrice}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>售价</span>
                  <p>{InfoData.sellingPrice}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>商品评分</span>
                  <p>{InfoData.score ? InfoData.score : '暂无评分'}</p>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>描述：</span>
                  <p>{InfoData.shopCommodityDescribe}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>商品图片</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>商品图:</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.commodityPictures} disabled />
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>商品轮播图：</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.commodityCirculatePictures} disabled />
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>商品说明图：</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.commodityExplainPictures} disabled />
                  </div>
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
