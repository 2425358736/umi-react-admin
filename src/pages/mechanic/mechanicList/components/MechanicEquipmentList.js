import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';
import Details from '@/pages/information/equipmentDealer/components/Details';

import { MECHANIC_EQUIPMENT_LIST } from '@/services/FirstPartyInterface';

class MechanicEquipmentList extends React.Component {
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
          width: '10%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '设备商名称',
          width: '35%',
          dataIndex: 'equipmentDealerCompany',
        },
        {
          title: '负责人姓名',
          width: '10%',
          dataIndex: 'leadingCadreName',
        },
        {
          title: '负责人手机号',
          width: '15%',
          dataIndex: 'leadingCadrePhone',
        },
        {
          title: '签约时间',
          width: '20%',
          dataIndex: 'contractDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="设备商详情" info={<Details id={record.id} />}>
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
          listUrl={MECHANIC_EQUIPMENT_LIST}
          additionalData={{ mechanicId: this.props.id }}
        />
      </div>
    );
  }
}

export default MechanicEquipmentList;
