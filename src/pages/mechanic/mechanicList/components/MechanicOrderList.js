import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';
import Details from '@/pages/order/orderInfo/components/Details';
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
          filters: [
            {
              text: '个人',
              value: '0',
            },
            {
              text: '团队',
              value: '1',
            },
          ],
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
          listUrl={MECHANIC_ORDER_LIST}
          additionalData={{ mechanicId: this.props.id }}
        />
      </div>
    );
  }
}

export default HistoricalOrder;
