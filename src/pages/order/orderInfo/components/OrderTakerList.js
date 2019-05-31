import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';
import { ManufacturerMechanicList } from '@/services/FirstPartyInterface';

import Details from '@/pages/mechanic/mechanicList/components/MemberDetail';

class OrderTakerList extends React.Component {
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
          title: '姓名',
          width: '20%',
          dataIndex: 'realName',
        },
        {
          title: '标签',
          width: '10%',
          dataIndex: 'labelName',
        },
        {
          title: '身份证',
          width: '15%',
          dataIndex: 'idNumber',
        },
        {
          title: '手机号',
          width: '10%',
          dataIndex: 'attestationPhone',
        },
        {
          title: '接单日期',
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
          additionalData={{ orderId: this.props.id }}
        />
      </div>
    );
  }
}

export default OrderTakerList;
