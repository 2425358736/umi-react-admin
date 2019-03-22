import React from 'react';
import { Table } from 'antd';

class NowMemList extends React.Component {
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
    this.setState({
      columns: [
        {
          title: '与户主关系',
          width: '14%',
          dataIndex: 'relationship',
        },
        {
          title: '姓名',
          width: '12%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '14%',
          dataIndex: 'sex',
        },
        {
          title: '民族',
          width: '12%',
          dataIndex: 'nationalities',
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
      ],
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div style={{ marginBottom: '30px' }}>
        <Table
          rowKey="id"
          pagination={false}
          columns={this.state.columns}
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export default NowMemList;
