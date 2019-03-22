import React from 'react';
import { Table } from 'antd';
import HistoryDetail from './HistoryDetail';
import HistorySourceDetail from './HistorySourceDetail';
import { Info } from '@/components/BusinessComponent/BusCom';

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15'],
        defaultPageSize: 5,
      },
      columns: [
        {
          title: '序号',
          width: '7%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '编号',
          width: '10%',
          dataIndex: 'householdNumber',
        },
        {
          title: '户主',
          width: '9%',
          dataIndex: 'householderName',
        },
        {
          title: '户别',
          width: '9%',
          dataIndex: 'householdTypeStr',
        },
        {
          title: '版本号',
          width: '10%',
          dataIndex: 'version',
        },
        {
          title: '来源编号',
          width: '12%',
          dataIndex: 'number',
          render(text, record) {
            return (
              <div>
                <Info
                  title="户口簿历史来源详情"
                  info={<HistorySourceDetail id={record.householdChangeId} />}
                >
                  {text}
                </Info>
              </div>
            );
          },
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'householdStatus',
          render(text) {
            return text === 0 ? '正常' : '注销';
          },
        },
        {
          title: '审核员',
          width: '9%',
          dataIndex: 'operatorName',
        },
        {
          title: '审核时间',
          width: '13%',
          dataIndex: 'auditDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="户口簿历史详情" info={<HistoryDetail id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
      dataSource: props.dataSource || [],
    };
  }

  render() {
    return (
      <div>
        <Table
          scroll={{ x: 900 }}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={this.state.pagination}
        />
      </div>
    );
  }
}

export default HistoryList;