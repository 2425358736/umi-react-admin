import React from 'react';
import { Table } from 'antd';

class HouseholdMemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          title: '关系',
          width: '10%',
          dataIndex: 'relationshipStr',
        },
        {
          title: '姓名',
          width: '9%',
          dataIndex: 'fullName',
        },
        {
          title: '民族',
          width: '10%',
          dataIndex: 'nationalitiesStr',
        },
        {
          title: '身份证号',
          width: '10%',
          dataIndex: 'idNumber',
        },
        {
          title: '政治面貌',
          width: '12%',
          dataIndex: 'politicsFaceStr',
        },
        {
          title: '手机号',
          width: '10%',
          dataIndex: 'phoneNumber',
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
          pagination={false}
        />
      </div>
    );
  }
}

export default HouseholdMemberList;
