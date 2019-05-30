import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';

import { MECHANIC_ORDER_LIST } from '@/services/FirstPartyInterface';

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
          width: '40%',
          dataIndex: 'factoryName',
        },
        {
          title: '人员要求',
          width: '15%',
          dataIndex: 'orderRequirementStr',
        },
        {
          title: '接单人',
          width: '10%',
          dataIndex: 'realName',
        },
        {
          title: '订单金额',
          width: '10%',
          dataIndex: 'orderAmount',
        },
        {
          title: '订单状态',
          width: '10%',
          dataIndex: 'orderStatusStr',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render() {
            return (
              <div>
                <Info title="订单详情">详情</Info>
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
          listUrl={MECHANIC_ORDER_LIST}
          additionalData={{ mechanicId: this.props.id }}
        />
      </div>
    );
  }
}

export default HistoricalOrder;
