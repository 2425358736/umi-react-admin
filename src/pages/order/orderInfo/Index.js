import React from 'react';
import { Divider } from 'antd';
import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Info,
  ScreeningTag,
  Operation,
} from '@/components/BusinessComponent/BusCom';

import styles from './index.less';

import Details from './components/Details';

import { OrderList, OrderListTop } from '@/services/Order';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
    },
    {
      displayTitle: '待审核',
      displayField: 'dsh',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['0'],
    },
    {
      displayTitle: '待签约',
      displayField: 'dqy',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['1'],
    },
    {
      displayTitle: '执行中',
      displayField: 'zxz',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['2'],
    },
    {
      displayTitle: '待验收',
      displayField: 'dys',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['3'],
    },
    {
      displayTitle: '待结清',
      displayField: 'djq',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['4'],
    },
    {
      displayTitle: '待评价',
      displayField: 'dpj',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['5'],
    },
    {
      displayTitle: '已结束',
      displayField: 'yjs',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['6'],
    },
    {
      displayTitle: '已作废',
      displayField: 'yzf',
      queryTitle: '订单状态',
      queryField: 'orderStatus',
      queryValue: ['7'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '订单名称',
    queryField: 'orderName',
  },
  senior: [
    {
      queryTitle: '甲方名称',
      queryField: 'factoryName',
      component: 'Input',
    },
    {
      queryTitle: '发起日期起',
      queryField: 'createDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '认证日期止',
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
      column: 'orderNumber',
    },
    {
      title: '订单名称',
      column: 'orderName',
    },
    {
      title: '订单总金额',
      column: 'totalOrderAmount',
    },
    {
      title: '已支付金额',
      column: 'paidAmount',
      export: false,
    },
    {
      title: '首付比例（%）',
      column: 'downPaymentRatio',
      export: false,
    },
    {
      title: '人员要求',
      column: 'orderRequirementStr',
    },
    {
      title: '订单状态',
      column: 'orderStatusStr',
    },
    {
      title: '订单工作类型',
      column: 'orderTypeStr',
    },
    {
      title: '负责人名称',
      column: 'leadingCadreName',
    },
    {
      title: '发布日期',
      column: 'createDate',
    },
  ],
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentWillMount = () => {
    this.columnsUp();
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
          dataIndex: 'orderNumber',
        },
        {
          title: '订单名称',
          width: '10%',
          dataIndex: 'orderName',
        },
        {
          title: '订单总金额',
          width: '10%',
          dataIndex: 'totalOrderAmount',
        },
        {
          title: '人员要求',
          width: '10%',
          dataIndex: 'orderRequirementStr',
        },
        {
          title: '订单状态',
          width: '10%',
          dataIndex: 'orderStatus',
          column: 'orderStatusStr',
          filters: [
            {
              text: '待审核',
              value: '0',
            },
            {
              text: '待签约',
              value: '1',
            },
            {
              text: '执行中',
              value: '2',
            },
            {
              text: '待验收',
              value: '3',
            },
            {
              text: '待结清',
              value: '4',
            },
            {
              text: '待评价',
              value: '5',
            },
            {
              text: '已结束',
              value: '6',
            },
            {
              text: '已作废',
              value: '7',
            },
          ],
        },
        {
          title: '订单工作类型',
          width: '10%',
          dataIndex: 'orderTypeStr',
        },
        {
          title: '负责人名称',
          width: '10%',
          dataIndex: 'leadingCadreName',
        },
        {
          title: '发布日期',
          width: '10%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="订单详情" info={<Details id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Operation
                  title="作废"
                  mode={0}
                  reminder="确认作废吗？"
                  onClick={async () => {
                    // 作废
                  }}
                />
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={OrderListTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={OrderList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable listUrl={OrderList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
