import React from 'react';
import { Icon } from 'antd';
import HistoricalOrder from './HistoricalOrder';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { DealerInfo } from '@/services/EquipmentDealer';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${DealerInfo}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
      });
    }
  };

  render() {
    const { InfoData } = this.state;
    const fetchData = {};
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.topTitle}>
            <span />
            <span>设备厂商名称：{InfoData.equipmentDealerCompany}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                认证状态
              </p>
              <p className={styles.cardContent}>{InfoData.attestationStateStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                法人
              </p>
              <p className={styles.cardContent}>{InfoData.legalPersonName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                信用分数
              </p>
              <p className={styles.cardContent}>{InfoData.currentScore}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                当前余额
              </p>
              <p className={styles.cardContent}>{InfoData.balanceAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                认证日期
              </p>
              <p className={styles.cardContent}>{InfoData.createDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.OneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>党员信息</span>
            </div>

            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>入党日期</span>
                <p>{fetchData.intoPartyDate}</p>
              </div>
              <div className={styles.itemDom}>
                <span>当前支部</span>
                <p>{fetchData.currentBranchName}</p>
              </div>
              <div className={styles.itemDom}>
                <span>支部联系人</span>
                <p>{fetchData.branchContacts}</p>
              </div>
            </div>

            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>入党支部</span>
                <p>{fetchData.intoBranchName}</p>
              </div>
              <div className={styles.itemDom}>
                <span>支部书记</span>
                <p>{fetchData.branchSecretary}</p>
              </div>
              <div className={styles.itemDom}>
                <span>联系人电话</span>
                <p>{fetchData.contactTelephone}</p>
              </div>
            </div>

            <div className={styles.remarkWrap}>
              <span>备注</span>
              <p>{fetchData.remarks}</p>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneLeft}>
            <div className={styles.midOneTitle}>
              <span />
              <span>个人信息</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户口簿版本号</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>编号</span>
                <p>{}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户号</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>户主</span>
                <p>{}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户别</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>住址</span>
                <p>{}</p>
              </div>
            </div>
          </div>

          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>个人信息</span>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户口簿版本号</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>编号</span>
                <p>{}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户号</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>户主</span>
                <p>{}</p>
              </div>
            </div>
            <div className={styles.conWrap}>
              <div className={styles.itemDom}>
                <span>户别</span>
                <p>{}</p>
              </div>
              <div className={styles.itemDom}>
                <span>住址</span>
                <p>{}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midOneWrap}>
          <div className={styles.midOneRight}>
            <div className={styles.midOneTitle}>
              <span />
              <span>个人信息</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: fetchData.content }} />
            {fetchData.aa && (
              <div className={styles.midBottom}>
                附件：
                <a href={fetchData.aa}>{fetchData.enclosure}</a>
              </div>
            )}
          </div>
        </div>

        {fetchData && fetchData.type === 2 && (
          <div className={styles.bottomWrap}>
            <div className={styles.titleDom}>
              <span />
              <span>接收人列表</span>
            </div>
            <HistoricalOrder />
          </div>
        )}
      </div>
    );
  }
}

export default NoticeDetail;
