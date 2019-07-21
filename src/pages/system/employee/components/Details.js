import React from 'react';
import { Icon, Button } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { employeeInfo } from '../Service';

import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(employeeInfo, { id: this.props.id });
    if (data.code === 200) {
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
            <span>用户名称：{InfoData.userName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                移动电话
              </p>
              <p className={styles.cardContent}>{InfoData.mobilePhone}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                办公室电话
              </p>
              <p className={styles.cardContent}>{InfoData.officephone}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>用户信息详情</span>
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

              <div>
                <div className={styles.itemDom}>
                  <span>用户头像：</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.avatorid} disabled />
                  </div>
                </div>
                <div className={styles.itemDom}>
                  <span>通知列表页刷新：</span>
                  <div>
                    <Button
                      onClick={() => {
                        this.props.callback();
                      }}
                    >
                      通知列表页刷新
                    </Button>
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
