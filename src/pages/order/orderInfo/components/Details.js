import React from 'react';
import { Icon } from 'antd';
import HistoricalOrder from './HistoricalOrder';
import styles from './Detail.less';

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  render() {
    const { InfoData } = this.state;
    const fetchData = {};
    return (
      <div>
        {/* 头部绿色卡片 */}
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>任务名称：{InfoData.equipmentDealerCompany}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                状态
              </p>
              <p className={styles.cardContent}>{InfoData.attestationStateStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                任务类型
              </p>
              <p className={styles.cardContent}>{InfoData.legalPersonName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                酬金
              </p>
              <p className={styles.cardContent}>{InfoData.currentScore}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                人员要求
              </p>
              <p className={styles.cardContent}>{InfoData.balanceAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="tags" className={styles.iconDom} />
                最少人数
              </p>
              <p className={styles.cardContent}>{InfoData.balanceAmount}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                签约时间
              </p>
              <p className={styles.cardContent}>{InfoData.createDate}</p>
            </div>
          </div>
        </div>
        {/* 任务信息 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            {InfoData.attestationState === 0 && (
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
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom}>
                <span>现场联系人</span>
                <p>{fetchData.businessDescription}现场联系人</p>
              </li>
              <li className={styles.itemDom}>
                <span>手机号</span>
                <p>{fetchData.businessDescription}现场联系人</p>
              </li>
            </ul>

            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>设备商</span>
                <p>{fetchData.businessDescription}</p>
              </li>
              <li className={styles.itemDom}>
                <span>负责人</span>
                <p>{fetchData.businessDescription}</p>
              </li>
              <li className={styles.itemDom}>
                <span>手机号</span>
                <p>{fetchData.businessDescription}</p>
              </li>
            </ul>

            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>任务描述</span>
                <p>{fetchData.businessDescription}</p>
              </li>
              <li className={styles.itemDom}>
                <span>任务开始日期</span>
                <p>{fetchData.businessDescription}</p>
              </li>
              <li className={styles.itemDom}>
                <span>任务结束日期</span>
                <p>{fetchData.businessDescription}</p>
              </li>
            </ul>

            <ul className={styles.midList} style={{ flex: '2' }}>
              <li className={styles.itemDom}>
                <p>设备图片</p>
                <img src={fetchData.idPhotoJust} alt="" />
              </li>
              <li className={styles.itemDom}>
                <p>设备文档</p>
                <img src={fetchData.idPhotoBack} alt="" />
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
          <HistoricalOrder id={this.props.id} />
        </div>
        {/* 签约团队 */}
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>签约团队/签约人</span>
          </div>
          <HistoricalOrder id={this.props.id} />
        </div>
        {/* 开工延时申请 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>开工延时申请</span>
          </div>

          <div className={styles.midCon} style={{ height: '300px', overflow: 'auto' }}>
            <ul className={styles.midList}>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <span>内容描述</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <span>延时开工日期</span>
                <p>{fetchData.businessDescription}现场联系人</p>
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <span>延时结工日期</span>
                <p>{fetchData.businessDescription}现场联系人</p>
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <p>图片</p>
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
              </li>
            </ul>
          </div>
        </div>
        {/* 完工验收 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>完工验收</span>
          </div>

          <div className={styles.midCon} style={{ height: '300px', overflow: 'auto' }}>
            <ul className={styles.midList}>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <span>完工情况</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <p>图片</p>
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <span>验收反馈</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom} style={{ border: 'none' }}>
                <p>图片</p>
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
                <img src={fetchData.idPhotoJust} alt="" />
              </li>
            </ul>
          </div>
        </div>
        {/* 交易信息 */}
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>交易信息</span>
          </div>
          <HistoricalOrder id={this.props.id} />
        </div>
        {/* 收到的评价 */}
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>收到的评价</span>
          </div>

          <div className={styles.midCon}>
            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>设备商评价信息</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom}>
                <span>设备商评价内容</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
            </ul>

            <ul className={styles.midList}>
              <li className={styles.itemDom}>
                <span>技工评价信息</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
              <li className={styles.itemDom}>
                <span>技工评价内容</span>
                <p>
                  {fetchData.businessDescription}现场联系人现场联系人现场联系人现场联系人现场联系人
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
