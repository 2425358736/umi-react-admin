import React from 'react';
import { Icon, Table, Timeline, Button, Modal } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

import AddUp from './AddUp';

import { GetEShopOrder, EShopOrderCommodityList, EShopOperateRecordList } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      operateRecordList: [],
      InfoData: {},
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          align: 'center',
          render: (text, record, index) => index + 1,
        },
        {
          title: '图片',
          dataIndex: 'shopCommodityPictures',
          render: text => <UploadPicture fileUrl={text} disabled />,
        },
        {
          title: '商品名称',
          align: 'center',
          dataIndex: 'shopCommodityName',
        },
        {
          title: '商城售价',
          align: 'center',
          dataIndex: 'shopShopSalesPrice',
        },
        {
          title: '数量',
          align: 'center',
          dataIndex: 'shopCommodityNumber',
        },
        {
          title: '获得评分',
          align: 'center',
          dataIndex: 'shopCommodityScore',
        },
      ],
      dataSource: [],
    };
  }

  componentWillMount = () => {
    this.getInfo();
    this.getdataSource();
    this.getoperateRecordList();
  };

  getInfo = async () => {
    const data = await getRequest(`${GetEShopOrder}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        InfoData: data.data,
      });
    }
  };

  getdataSource = async () => {
    const data = await getRequest(`${EShopOrderCommodityList}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        dataSource: data.data,
      });
    }
  };

  getoperateRecordList = async () => {
    const data = await getRequest(`${EShopOperateRecordList}?id=${this.props.id}`);
    if (data.status === 200) {
      this.setState({
        operateRecordList: data.data,
      });
    }
  };

  render() {
    const { InfoData, operateRecordList } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>订单编号：：{InfoData.shopOrderNumber}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                会员姓名
              </p>
              <p className={styles.cardContent}>{InfoData.memberName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                会员手机号
              </p>
              <p className={styles.cardContent}>{InfoData.phone}</p>
            </div>

            <div style={{ minWidth: '245px' }} className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                支付日期
              </p>
              <p className={styles.cardContent}>{InfoData.paymentDate}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                订单状态
              </p>
              <p className={styles.shopOrderStateStr}>{InfoData.phone}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>商品信息</span>
          </div>

          <Table rowKey="id" columns={this.state.columns} dataSource={this.state.dataSource} />
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>订单信息</span>
            <Button
              onClick={() => {
                this.setState({
                  open: true,
                });
              }}
              style={{ float: 'right' }}
            >
              修改
            </Button>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>运费</span>
                  <p>{InfoData.shipmentCost}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>合计</span>
                  <p>{InfoData.totalAmount}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>收货人</span>
                  <p>{InfoData.receiveName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>收货人手机号</span>
                  <p>{InfoData.receivePhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>物流公司</span>
                  <p>{InfoData.logisticsCompany}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>物流单号</span>
                  <p>{InfoData.logisticsNumber}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>收货地址</span>
                  <p>{InfoData.receiveAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>状态信息</span>
          </div>

          <Timeline>
            {operateRecordList.map((json, i) => (
              <Timeline.Item key={i.toString()}>
                <span style={{ margin: '20px 20px 10px', width: '100px' }}>
                  {json.operateType === 0
                    ? '用户已下单'
                    : json.operateType === 1
                    ? '订单正在处理'
                    : json.operateType === 2
                    ? '订单已发货'
                    : json.operateType === 3
                    ? '用户已签收'
                    : json.operateType === 4
                    ? '用户已评价'
                    : '订单已作废'}
                </span>
                <span style={{ margin: '20px 20px 10px', width: '100px' }}>{json.operateDate}</span>
                <span style={{ margin: '20px 20px 10px', width: '100px' }}>
                  {json.operateDescribe}
                </span>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>

        <Modal
          title="修改订单信息"
          style={{ top: 20 }}
          width={800}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
          destroyOnClose
        >
          <AddUp
            id={this.props.id}
            callback={on => {
              this.setState({
                open: false,
              });
              if (on) {
                this.getInfo();
              }
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Details;
