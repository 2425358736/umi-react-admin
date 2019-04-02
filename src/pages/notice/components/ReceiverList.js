import React from 'react';
import { postRequest } from '@/utils/api';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { RECEIVE_SENDER, SYS_Dict } from '@/services/SysInterface';

const ordinary = {
  queryTitle: '手机号',
  queryField: 'phoneNumber',
};
const senior = [
  {
    queryTitle: '身份证号',
    queryField: 'idNumber',
    component: 'Input',
  },
  {
    queryTitle: '是否已读',
    queryField: 'state',
    component: 'Select',
    componentData: [
      { value: '0', title: '未读' },
      { value: '1', title: '已读' },
      { value: '2', title: '未发布' },
    ],
  },
  {
    queryTitle: '确定状态',
    queryField: 'confirmState',
    component: 'Select',
    componentData: [
      { value: '0', title: '未确认' },
      { value: '1', title: '确认' },
      { value: '2', title: '待定' },
      { value: '3', title: '否定' },
    ],
  },
];

class ReceiverList extends React.Component {
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
          width: '6%',
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
          title: '姓名',
          width: '8%',
          dataIndex: 'fullName',
        },
        {
          title: '身份证号',
          width: '14%',
          dataIndex: 'idNumber',
        },
        {
          title: '手机号',
          width: '8%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '是否已读',
          width: '10%',
          dataIndex: 'stateStr',
        },
        {
          title: '确定状态',
          width: '14%',
          dataIndex: 'confirmStateStr',
        },
        {
          title: '确定时间',
          width: '8%',
          dataIndex: 'confirmDate',
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
          listUrl={RECEIVE_SENDER}
          ordinary={ordinary}
          senior={senior}
          additionalData={{ announcementId: this.props.id }}
        />
      </div>
    );
  }
}

export default ReceiverList;
