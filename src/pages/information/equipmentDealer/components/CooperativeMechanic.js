import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';

import { ManufacturerMechanicList } from '@/services/FirstPartyInterface';

import Details from '@/pages/order/orderInfo/components/Details';

class CooperativeMechanic extends React.Component {
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
          width: '6%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '姓名',
          width: '8%',
          dataIndex: 'realName',
        },
        {
          title: '电话',
          width: '8%',
          dataIndex: 'attestationPhone',
        },
        {
          title: '身份证',
          width: '14%',
          dataIndex: 'idNumber',
        },
        {
          title: '签约日期',
          width: '8%',
          dataIndex: 'contractDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="技工详情" info={<Details id={record.id} />}>
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
          listUrl={ManufacturerMechanicList}
          additionalData={{ equipmentDealerId: this.props.id }}
        />
      </div>
    );
  }
}

export default CooperativeMechanic;
