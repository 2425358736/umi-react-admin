import React from 'react';
import { Table } from 'antd';
import { Info } from '@/components/BusinessComponent/BusCom';
import MemberDetail from '../../member/components/MemberDetail';

class MemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.list && this.props.list.length > 0) {
      this.setState({ dataSource: this.props.list });
    }

    this.columnsUp();
  };

  /**
   * 更新表头
   * @returns {*}
   */
  columnsUp = () => {
    const columns = [
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
        width: '16%',
        dataIndex: 'sex',
        render(text) {
          return <span>{text === 0 ? '男' : text === 1 ? '女' : '未知'}</span>;
        },
      },
      {
        title: '民族',
        width: '14%',
        dataIndex: 'nationalitiesStr',
      },
      {
        title: '身份证号',
        width: '14%',
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
        width: '8%',
        dataIndex: 'opt',
        render(text, record) {
          return (
            <div>
              <Info title="社员详情" info={<MemberDetail id={record.memberId} />}>
                详情
              </Info>
            </div>
          );
        },
      },
    ];

    this.setState({
      columns,
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          <Table
            rowKey="id"
            scroll={{ x: 900 }}
            pagination={false}
            columns={this.state.columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    );
  }
}

export default MemList;
