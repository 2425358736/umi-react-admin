import React from 'react';
import { Table } from 'antd';

import { Info } from '@/components/BusinessComponent/BusCom';

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          title: '与户主关系',
          width: '12%',
          dataIndex: 'relationshipStr',
        },
        {
          title: '姓名',
          width: '10%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '10%',
          dataIndex: 'sex',
          render(text) {
            return text === 0 ? '男' : text === 1 ? '女' : '未知';
          },
        },
        {
          title: '民族',
          width: '10%',
          dataIndex: 'nationalitiesStr',
        },
        {
          title: '身份证号',
          width: '12%',
          dataIndex: 'idNumber',
        },
        {
          title: '个人单页',
          width: '14%',
          dataIndex: 'memberPictures',
          render(text, record) {
            return (
              <div style={{ width: '50px', height: '50px' }}>
                <img style={{ width: '100%', height: '100%' }} src={record.memberPictures} alt="" />
              </div>
            );
          },
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'opt',
          render() {
            return (
              <div>
                <Info
                  title="成员详情"
                  // info={<HouseholdDetail id={record.id}/>}
                >
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
          scroll={{ x: 800 }}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={false}
        />
      </div>
    );
  }
}

export default MemberList;
