import React from 'react';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';
import Details from '@/pages/mechanic/mechanicList/components/MemberDetail';

import { MECHANIC_TEAM } from '@/services/FirstPartyInterface';

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
          title: '姓名',
          width: '7%',
          dataIndex: 'realName',
        },
        {
          title: '身份证号',
          width: '13%',
          dataIndex: 'idNumber',
        },
        {
          title: '手机号',
          width: '7%',
          dataIndex: 'attestationPhone',
        },
        {
          title: '标签',
          width: '7%',
          dataIndex: 'labelName',
          filters: this.props.label,
        },
        {
          title: '操作',
          width: '5%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="订单详情" info={<Details id={record.mechanicId} />}>
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
          listUrl={MECHANIC_TEAM}
          additionalData={{ teamId: this.props.id }}
        />
      </div>
    );
  }
}

export default HistoricalOrder;
