import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';

import { OrderList } from '@/services/Order';

import Details from '@/pages/order/orderInfo/components/Details';

class HistoricalOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount = async () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '甲方',
          width: '20%',
          dataIndex: 'factoryName',
        },
        {
          title: '人员要求',
          width: '10%',
          dataIndex: 'orderRequirementStr',
        },
        {
          title: '接单人',
          width: '15%',
          dataIndex: 'mechanicRealName',
        },
        {
          title: '总金额',
          width: '10%',
          dataIndex: 'totalOrderAmount',
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
          title: '发布日期',
          width: '20%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="订单详情" info={<Details id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    return (
      <div>
        <InfoTable
          scroll={{ x: 900 }}
          columns={this.state.columns}
          listUrl={OrderList}
          additionalData={{ equipmentDealerId: this.props.id }}
        />
      </div>
    );
  }
}

export default HistoricalOrder;
