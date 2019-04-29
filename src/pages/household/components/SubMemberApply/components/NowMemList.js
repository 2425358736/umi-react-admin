import React from 'react';
import { Table, Checkbox, Input, Select } from 'antd';
import { postRequest } from '@/utils/api';
import { SYS_Dict } from '@/services/SysInterface';

class NowMemList extends React.Component {
  list = [];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [],
      moveOutTypeArr: [],
    };
  }

  componentDidMount = async () => {
    // 迁出类型列表
    const moveOutTypeArr = await postRequest(`${SYS_Dict}/12`);
    if (moveOutTypeArr.status === 200) {
      this.setState({ moveOutTypeArr: moveOutTypeArr.data });
    }

    if (this.props.list && this.props.list.length > 0) {
      this.setState({ dataSource: this.props.list });
    }
    this.columnsUp();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.getList) {
      this.props.onListCall(this.list);
    }
  };

  checkedVal = (e, record) => {
    if (e.target.checked) {
      this.list.push(record);
    } else {
      this.list.forEach((item, index) => {
        if (item.id === record.id) {
          this.list.splice(index, 1);
        }
      });
    }
  };

  /**
   * 更新表头
   * @returns {*}
   */
  columnsUp = () => {
    const that = this;
    const { moveOutTypeArr, dataSource } = this.state;
    this.setState({
      columns: [
        {
          title: '与户主关系',
          width: '14%',
          dataIndex: 'relationshipStr',
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
          render(text) {
            return text === 0 ? '男' : text === 1 ? '女' : '未知';
          },
        },
        {
          title: '民族',
          width: '12%',
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
          title: '迁出日期',
          width: '12%',
          dataIndex: 'moveOutDate',
          render(text, record, index) {
            return (
              <div>
                {index > 0 && (
                  <Input
                    style={{ width: '100px' }}
                    placeholder="请输入迁出日期"
                    value={record.moveOutDate}
                    onChange={e => {
                      dataSource[index].moveOutDate = e.target.value;
                      that.setState({
                        dataSource,
                      });
                    }}
                  />
                )}
              </div>
            );
          },
        },
        {
          title: '迁出类型',
          width: '10%',
          dataIndex: 'moveOutType',
          render(text, record, index) {
            return (
              <div>
                {index > 0 && (
                  <Select
                    showSearch
                    style={{ width: '100px' }}
                    placeholder="请选择迁出类型"
                    optionFilterProp="children"
                    value={record.moveOutType}
                    onChange={value => {
                      dataSource[index].moveOutType = value;
                      that.setState({
                        dataSource,
                      });
                    }}
                  >
                    {moveOutTypeArr.map(item => (
                      <Select.Option disabled={item.id === 1} key={item.id} value={item.id}>
                        {item.dataLabel}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </div>
            );
          },
        },
        {
          title: '删除',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                {record.relationship !== 1 && (
                  <Checkbox onChange={e => that.checkedVal(e, record)} />
                )}
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
