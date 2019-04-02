import React from 'react';
import { postRequest } from '@/utils/api';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { PAY_LIST_FAMILY, SYS_Dict } from '@/services/SysInterface';

const ordinary = {
  queryTitle: '姓名',
  queryField: 'fullName',
};
const senior = [
  {
    queryTitle: '身份证号',
    queryField: 'idNumber',
    component: 'Input',
  },
  {
    queryTitle: '手机号',
    queryField: 'phoneNumber',
    component: 'Input',
  },
  {
    queryTitle: '户号',
    queryField: 'householdRegisterNumber',
    component: 'Input',
  },
  {
    queryTitle: '缴费标准',
    queryField: 'paymentStandard',
    component: 'Input',
  },
];

class PayListFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount = async () => {
    const arr = [];
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      queueArr.data.forEach(item => {
        arr.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    this.setState({
      columns: [
        {
          title: '序号',
          width: '7%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '大队',
          width: '8%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '编号',
          width: '8%',
          dataIndex: 'householdNumber',
        },
        {
          title: '户主',
          width: '8%',
          dataIndex: 'householderName',
        },
        {
          title: '身份证号',
          width: '14%',
          dataIndex: 'householderNumber',
        },
        {
          title: '手机号',
          width: '10%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '户号',
          width: '8%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '缴费标准',
          width: '10%',
          dataIndex: 'paymentStandard',
        },
        {
          title: '缴费时间',
          width: '14%',
          dataIndex: 'paymentDate',
        },
        {
          title: '金额',
          width: '8%',
          dataIndex: 'paymentMoney',
        },
      ],
    });
  };

  render() {
    return (
      <div>
        <InfoTable
          columns={this.state.columns}
          listUrl={PAY_LIST_FAMILY}
          ordinary={ordinary}
          senior={senior}
          additionalData={{ paymentItemId: this.props.id }}
        />
      </div>
    );
  }
}

export default PayListFamily;
