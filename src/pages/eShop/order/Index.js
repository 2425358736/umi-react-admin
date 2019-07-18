import React from 'react';
import { Divider, notification } from 'antd';
import { postRequest } from '@/utils/api';
import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Up,
  ScreeningTag,
  Info,
} from '@/components/BusinessComponent/BusCom';

import EShopOrderToVoid from './components/EShopOrderToVoid';

import Deliver from './components/Deliver';

import Details from './components/Details';

import styles from './index.less';

import { EShopOrderList, EShopOrderTop, EShopOrderHandle } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
    },
    {
      displayTitle: '待处理',
      displayField: 'dcl',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['0'],
    },
    {
      displayTitle: '待发货',
      displayField: 'dfh',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['1'],
    },
    {
      displayTitle: '待收货',
      displayField: 'dsh',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['2'],
    },
    {
      displayTitle: '待评价',
      displayField: 'dpj',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['3'],
    },
    {
      displayTitle: '已完成',
      displayField: 'ywc',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['4'],
    },
    {
      displayTitle: '已作废',
      displayField: 'yzf',
      queryTitle: '订单状态',
      queryField: 'shopOrderState',
      queryValue: ['5'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '订单编号',
    queryField: 'shopOrderNumber',
  },
  senior: [
    {
      queryTitle: '创建日期起',
      queryField: 'createDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '创建日期止',
      queryField: 'createDateEnd',
      component: 'DatePicker',
    },
  ],
};

const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
    },
    {
      title: '订单编号',
      column: 'shopOrderNumber',
    },
    {
      title: '订单状态',
      column: 'shopOrderStateStr',
    },
    {
      title: '合计金额',
      column: 'totalAmount',
    },
    {
      title: '会员名称',
      column: 'memberName',
    },
    {
      title: '支付日期',
      column: 'paymentDate',
    },
  ],
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      renovate: false,
    };
  }

  componentWillMount = async () => {
    this.columnsUp([]);
  };

  columnsUp = () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '订单编号',
          width: '10%',
          dataIndex: 'shopOrderNumber',
        },
        {
          title: '订单状态',
          width: '10%',
          dataIndex: 'shopOrderState',
          column: 'shopOrderStateStr',
          filters: [
            {
              text: '待处理',
              value: '0',
            },
            {
              text: '待发货',
              value: '1',
            },
            {
              text: '待收货',
              value: '2',
            },
            {
              text: '待评价',
              value: '3',
            },
            {
              text: '已完成',
              value: '4',
            },
            {
              text: '已作废',
              value: '5',
            },
          ],
        },
        {
          title: '合计金额',
          width: '10%',
          dataIndex: 'totalAmount',
        },
        {
          title: '会员名称',
          width: '20%',
          dataIndex: 'memberName',
        },
        {
          title: '支付日期',
          width: '25%',
          dataIndex: 'paymentDate',
        },
        {
          title: '操作',
          width: '20%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="商品详情" info={<Details id={record.id} />}>
                  详情
                </Info>
                {record.shopOrderState === 1 && <Divider type="vertical" />}
                {record.shopOrderState === 1 && (
                  <Up width={600} id={record.id} component={Deliver} title="发货" />
                )}
                <Divider type="vertical" />
                <Up width={600} id={record.id} component={EShopOrderToVoid} title="作废" />
              </div>
            );
          },
        },
      ],
    });
  };

  componentDidMount = async () => {
    this.columnsUp();
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics
            sourceUrl={EShopOrderTop}
            renovate={this.state.renovate}
            topJson={topStatistics.topJson}
          />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={EShopOrderList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                operationBlock={[
                  {
                    title: '批量处理',
                    onClick: async idArr => {
                      const res = await postRequest(EShopOrderHandle, { list: idArr });
                      if (res.status === 200) {
                        notification.info({ message: res.msg });
                        await this.setState({
                          renovate: true,
                        });
                        this.setState({
                          renovate: false,
                        });
                      } else {
                        notification.error({ message: res.msg, description: res.subMsg });
                      }
                    },
                  },
                ]}
                align="center"
                listUrl={EShopOrderList}
                columns={this.state.columns}
                renovate={this.state.renovate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
