import React from 'react';
import { Table } from 'antd';

class ChargeProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '序号',
          width: '10%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '名称',
          width: '20%',
          dataIndex: 'chargeProjectName',
        },
        {
          title: '描述',
          width: '40%',
          dataIndex: 'describe',
        },
        {
          title: '金钱',
          width: '30%',
          dataIndex: 'price',
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Table
          scroll={{ x: 800 }}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.props.dataSource}
          pagination={false}
        />
      </div>
    );
  }
}

export default ChargeProjectList;
