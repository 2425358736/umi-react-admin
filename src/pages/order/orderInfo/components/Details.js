import React from 'react';
import { Icon, notification } from 'antd';
import OrderTakerList from './OrderTakerList';
import ContractList from './ContractList';
import styles from './Detail.less';
import { getRequest, postRequest } from '@/utils/api';

import {
  OrderInfo,
  OrderExtensionRecord,
  OrderAcceptanceRecordList,
  OrderEquipmentDealerEvaluate,
  OrderMechanicEvaluate,
  OrderExamine,
} from '@/services/Order';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
      ExtensionRecord: [],
      AecceptanceRecord: [],
      EquipmentDealerEvaluate: {},
      MechanicEvaluate: {},
    };
  }

  componentWillMount = () => {
    this.infoData();
    this.extensionRecordList();
    this.aecceptanceRecordList();
    this.equipmentDealerEvaluate();
    this.mechanicEvaluate();
  };

  infoData = async () => {
    const data = await getRequest(`${OrderInfo}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        InfoData: data.data,
      });
    }
  };

  equipmentDealerEvaluate = async () => {
    const data = await getRequest(`${OrderEquipmentDealerEvaluate}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        EquipmentDealerEvaluate: data.data,
      });
    }
  };

  mechanicEvaluate = async () => {
    const data = await getRequest(`${OrderMechanicEvaluate}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        MechanicEvaluate: data.data,
      });
    }
  };

  aecceptanceRecordList = async () => {
    const data = await getRequest(`${OrderAcceptanceRecordList}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        AecceptanceRecord: data.data,
      });
    }
  };

  extensionRecordList = async () => {
    const data = await getRequest(`${OrderExtensionRecord}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        ExtensionRecord: data.data,
      });
    }
  };

  attestation = async () => {
    const data = await postRequest(OrderExamine, {
      id: this.state.InfoData.id,
    });
    if (data.status === 200) {
      notification.info({ message: data.msg, description: data.subMsg });
      this.infoData();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        {/* 头部绿色卡片 */}
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>订单名称：{InfoData.orderName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>{InfoData.orderStatusStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                任务类型
              </p>
              <p className={styles.cardContent}>{InfoData.orderTypeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                订单总金额
              </p>
              <p className={styles.cardContent}>{InfoData.totalOrderAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                人员要求
              </p>
              <p className={styles.cardContent}>{InfoData.orderRequirementStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                最少人数
              </p>
              <p className={styles.cardContent}>{InfoData.teamMinSize}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                签约时间
              </p>
              <p className={styles.cardContent}>{InfoData.contractDate}</p>
            </div>
          </div>
        </div>
        {/* 任务信息 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            {InfoData.orderStatus === 0 && (
              <span onClick={this.attestation} className={styles.btnWrap}>
                通过
              </span>
            )}
            <span>任务信息</span>
          </div>

          <div className={styles.midCon}>
            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>甲方</span>
                <p>{InfoData.factoryName}</p>
              </li>
              <li className={styles.itemDom}>
                <span>现场联系人</span>
                <p>{InfoData.sceneContacts}</p>
              </li>
              <li className={styles.itemDom}>
                <span>手机号</span>
                <p>{InfoData.scenePhone}</p>
              </li>
            </ul>

            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>设备商</span>
                <p>{InfoData.leadingCadreName}</p>
              </li>
              <li className={styles.itemDom}>
                <span>负责人</span>
                <p>{InfoData.leadingCadreName}</p>
              </li>
              <li className={styles.itemDom}>
                <span>手机号</span>
                <p>{InfoData.leadingCadrePhone}</p>
              </li>
            </ul>

            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>任务描述</span>
                <p>{InfoData.orderDescription}</p>
              </li>
              <li className={styles.itemDom}>
                <span>订单开始日期</span>
                <p>{InfoData.orderStartDate}</p>
              </li>
              <li className={styles.itemDom}>
                <span>任务结束日期</span>
                <p>{InfoData.orderEndDate}</p>
              </li>
            </ul>

            <ul className={styles.midList} style={{ flex: '2' }}>
              <li className={styles.itemDom}>
                <p>设备图片</p>
                {InfoData.orderPictures &&
                  InfoData.orderPictures
                    .split('#')
                    .map((str, i) => <img key={i.toString()} src={str} alt="" />)}
              </li>
              <li className={styles.itemDom}>
                <p>设备文档</p>
                {InfoData.orderDocument &&
                  InfoData.orderDocument
                    .split('#')
                    .map((str, i) => <img key={i.toString()} src={str} alt="" />)}
              </li>
            </ul>
          </div>
        </div>
        {/* 接单人列表 */}
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>接单人列表</span>
          </div>
          <OrderTakerList id={this.props.id} />
        </div>
        {/* 签约团队 */}
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>签约团队/签约人</span>
          </div>
          <ContractList id={this.props.id} />
        </div>
        {/* 开工延时申请 */}

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>开工延时申请</span>
          </div>
          {this.state.ExtensionRecord.map((json, i) => (
            <div
              key={i.toString()}
              className={styles.midCon}
              style={{ height: '300px', overflow: 'auto' }}
            >
              <ul className={styles.midList}>
                <li className={styles.itemDom} style={{ border: 'none' }}>
                  <span>内容描述</span>
                  <p>{json.extensionDescription}</p>
                </li>
                <li className={styles.itemDom} style={{ border: 'none' }}>
                  <span>延时开工日期</span>
                  <p>{json.startDate}现场联系人</p>
                </li>
                <li className={styles.itemDom} style={{ border: 'none' }}>
                  <span>延时结工日期</span>
                  <p>{json.endDate}</p>
                </li>
                <li className={styles.itemDom} style={{ border: 'none' }}>
                  <p>图片</p>
                  {json.extensionFile &&
                    json.extensionFile
                      .split('#')
                      .map((obj, j) => <img key={j.toString()} src={obj} alt="" />)}
                </li>
              </ul>
            </div>
          ))}
        </div>
        {/* 完工验收 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>完工验收</span>
          </div>
          {this.state.AecceptanceRecord.length > 0 && (
            <div className={styles.midCon} style={{ height: '300px', overflow: 'auto' }}>
              {this.state.AecceptanceRecord.map((json, i) => (
                <ul key={i.toString()} className={styles.midList}>
                  <li className={styles.itemDom} style={{ border: 'none' }}>
                    <span>{json.recordType === 0 ? '完工情况' : '验收反馈'}</span>
                    <p>{json.acceptanceDescription}</p>
                  </li>
                  <li className={styles.itemDom} style={{ border: 'none' }}>
                    <p>图片</p>
                    {json.acceptanceDocument &&
                      json.acceptanceDocument
                        .split('#')
                        .map((obj, j) => <img key={j.toString()} src={obj} alt="" />)}
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        {/* 收到的评价 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>收到的评价</span>
          </div>

          <div className={styles.midCon}>
            {this.state.EquipmentDealerEvaluate && (
              <ul className={styles.midList}>
                <li className={styles.itemDom}>
                  <span>设备商评价信息</span>
                  <p>{this.state.EquipmentDealerEvaluate.score}</p>
                </li>
                <li className={styles.itemDom}>
                  <span>设备商评价内容</span>
                  <p>{this.state.EquipmentDealerEvaluate.evaluateDescription}</p>
                </li>
              </ul>
            )}
            {this.state.MechanicEvaluate && (
              <ul className={styles.midList}>
                <li className={styles.itemDom}>
                  <span>技工评价信息</span>
                  <p>{this.state.MechanicEvaluate.score}</p>
                </li>
                <li className={styles.itemDom}>
                  <span>技工评价内容</span>
                  <p>{this.state.MechanicEvaluate.evaluateDescription}</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
