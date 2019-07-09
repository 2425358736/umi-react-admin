import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { GetMedicalOrder } from '../Service';
import ChargeProjectList from './ChargeProjectList';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
      wxOrderChargeProjectVoList: [],
      wxConsultationRecordVoList: [],
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetMedicalOrder}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
        wxOrderChargeProjectVoList: data.data.wxOrderChargeProjectVoList || [],
        wxConsultationRecordVoList: data.data.wxConsultationRecordVoList || [],
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
            <span>会员姓名：：{InfoData.userName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                会员电话
              </p>
              <Tooltip title={InfoData.wxMemberPhone}>
                <p className={styles.cardContent}>{InfoData.wxMemberPhone}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="home" className={styles.iconDom} />
                预约门店
              </p>
              <p className={styles.cardContent}>{InfoData.storeName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="solution" className={styles.iconDom} />
                预约技师
              </p>
              <p className={styles.cardContent}>{InfoData.realName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="compass" className={styles.iconDom} />
                创建时间
              </p>
              <Tooltip title={InfoData.createDate}>
                <p className={styles.cardContent}>{InfoData.createDate}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="bulb" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>{InfoData.orderStateStr}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>预约信息</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>预约技师</span>
                  <p>{InfoData.realName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>家长姓名</span>
                  <p>{InfoData.parentName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>宝贝姓名</span>
                  <p>{InfoData.babyName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>预约时间</span>
                  <p>{InfoData.appointmentDateStart}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>门店地址</span>
                  <p>{InfoData.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>技师电话</span>
                  <p>{InfoData.phone}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>家长电话</span>
                  <p>{InfoData.parentPhone}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>宝贝年龄</span>
                  <p>{InfoData.age}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>预约门店</span>
                  <p>{InfoData.storeName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span> </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>会诊信息</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>会诊开始日期</span>
                  <p>{InfoData.registerDate}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>会诊结束日期</span>
                  <p>{InfoData.endDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>会诊病因</span>
                  <p>{InfoData.pathogeny}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>会诊内容</span>
                  <p>{InfoData.therapeuticRegimen}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>取消原因</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>取消时间</span>
                  <p>{InfoData.cancelDate}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>内容</span>
                  <p>{InfoData.cancelReason}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>缴费账单</span>
          </div>
          <ChargeProjectList dataSource={this.state.wxOrderChargeProjectVoList} />
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>支付信息</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>应付金额</span>
                  <p>{InfoData.payableAmount}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>支付方式</span>
                  <p>{InfoData.paymentMethodStr}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>支付状态</span>
                  <p>{InfoData.payTypeStr}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>支付时间</span>
                  <p>{InfoData.payDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>回访信息</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>回访时间</span>
                  <p>{InfoData.returnData}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>内容记录</span>
                  <p>{InfoData.returnVisitData}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>问诊信息</span>
          </div>
          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div className={styles.itemDom}>
                <span>标题：</span>
                <p>{InfoData.consultationTitle}</p>
              </div>
            </div>
          </div>
          {this.state.wxConsultationRecordVoList.map(role => (
            <div className={styles.midCon}>
              <div className={styles.midRight}>
                <div>
                  <div className={styles.itemDom}>
                    <span>{role.type === 1 ? '回复时间' : '问诊时间'}</span>
                    <p>{role.createDate}</p>
                  </div>
                  <div className={styles.itemDom}>
                    <span>{role.type === 1 ? '回复内容' : '问诊内容'}</span>
                    <p>{role.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Details;
