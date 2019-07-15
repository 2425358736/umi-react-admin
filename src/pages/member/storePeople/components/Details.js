import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';
import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import ArrangeList from './ArrangeList';
import { GetStorePeople } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetStorePeople}?id=${this.props.id}`);
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
            <span>姓名：{InfoData.realName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                工号
              </p>
              <p className={styles.cardContent}>{InfoData.jobNumber}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                门店
              </p>
              <p className={styles.cardContent}>{InfoData.storeName}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                岗位
              </p>
              <p className={styles.cardContent}>{InfoData.storeUserTypeStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                性别
              </p>
              <p className={styles.cardContent}>{InfoData.genderStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                用户名
              </p>
              <Tooltip title={InfoData.loginName}>
                <p className={styles.cardContent}>{InfoData.loginName}</p>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>个人信息</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>身份证号</span>
                  <p>{InfoData.idNumber}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>手机号</span>
                  <p>{InfoData.phone}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>QQ</span>
                  <p>{InfoData.qq}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>邮箱</span>
                  <p>{InfoData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>简介</span>
                  <p>{InfoData.briefIntroduction}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>工龄</span>
                  <p>{InfoData.workingYears}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>备注</span>
                  <p>{InfoData.remarks}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>员工头像</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.picture} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>排班详情</span>
          </div>
          <ArrangeList sysUserId={this.props.sysUserId} />
        </div>
      </div>
    );
  }
}

export default Details;
