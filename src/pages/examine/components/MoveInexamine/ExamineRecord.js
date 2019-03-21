import React from 'react';
import { Table } from 'antd';
import { getRequest } from '@/utils/api';

import { EXAMINE_RECORD } from '@/services/SysInterface';

class ExamineRecord extends React.Component {
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
          width: '6%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '节点',
          width: '10%',
          dataIndex: 'node',
          render(text) {
            return text === 0 ? '录入' : text === 1 ? '审核' : '确认';
          },
        },
        {
          title: '操作员',
          width: '10%',
          dataIndex: 'operatorName',
        },
        {
          title: '操作内容',
          width: '16%',
          dataIndex: 'operationContent',
          render(text) {
            return text === 0
              ? '录入'
              : text === 1
              ? '审核通过'
              : text === 2
              ? '确认通过'
              : text === 3
              ? '确认未通过'
              : '作废';
          },
        },
        {
          title: '操作时间',
          width: '20%',
          dataIndex: 'createDate',
        },
        {
          title: '备注',
          width: '20%',
          dataIndex: 'remarks',
        },
      ],
      dataSource: [],
    };
  }

  componentDidMount = async () => {
    const data = await getRequest(`${EXAMINE_RECORD}?householdChangeId=${this.props.propId}`);
    if (data.status === 200) {
      await this.setState({
        dataSource: data.data,
      });
    }
  };

  render() {
    return (
      <div>
        <Table
          scroll={{ x: 800 }}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={this.state.pagination}
        />
      </div>
    );
  }
}

export default ExamineRecord;
