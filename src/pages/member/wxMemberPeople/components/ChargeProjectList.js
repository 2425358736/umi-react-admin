import React from 'react';
import { Table } from 'antd';

class ChargeProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '就诊人姓名',
          width: '10%',
          dataIndex: 'babyName',
        },
        {
          title: '年龄',
          width: '5%',
          dataIndex: 'age',
        },
        {
          title: '就诊原因',
          width: '30%',
          dataIndex: 'pathogeny',
        },
        {
          title: '就诊内容',
          width: '30%',
          dataIndex: 'therapeuticRegimen',
        },
        {
          title: '就诊时间',
          width: '20%',
          dataIndex: 'registerDate',
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
