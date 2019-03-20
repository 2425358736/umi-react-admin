import React from 'react';
import { Table, Popconfirm, Select, Input, Radio, Icon } from 'antd';
import UploadImg from '../../../components/UpLoad/UploadImage';
import { postRequest } from '@/utils/api';
import styles from '../index.less';

import { SYS_Dict } from '@/services/SysInterface';

class memList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: 0,
          relationship: 1,
          fullName: '',
          sex: 0,
          nationalities: null,
          idNumber: '',
          memberPictures: '',
        },
      ],
      columns: [],
      withArr: [],
      nationArr: [],
    };
  }

  componentDidMount = async () => {
    // 大队列表
    const withArr = await postRequest(`${SYS_Dict}/1`);
    if (withArr.status === 200) {
      await this.setState({ withArr: withArr.data });
    }

    // 民族列表
    const nationArr = await postRequest(`${SYS_Dict}/8`);
    if (nationArr.status === 200) {
      await this.setState({ nationArr: nationArr.data });
    }

    this.columnsUp();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.getList) {
      this.props.onListCall(this.state.dataSource);
    }
  };

  /**
   * 更新表头
   * @returns {*}
   */
  columnsUp = () => {
    const that = this;
    const { withArr, nationArr } = this.state;
    this.setState({
      columns: [
        {
          title: '与户主关系',
          width: '14%',
          dataIndex: 'relationship',
          render(text, record, index) {
            return (
              <Select
                showSearch
                style={{ width: '150px' }}
                placeholder="请选择与户主关系"
                optionFilterProp="children"
                value={record.relationship}
                disabled={index === 0}
                onChange={value => {
                  that.state.dataSource[index].relationship = value;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
              >
                {withArr.map(item => (
                  <Select.Option disabled={item.id === 1} key={item.id} value={item.id}>
                    {item.dataLabel}
                  </Select.Option>
                ))}
              </Select>
            );
          },
        },
        {
          title: '姓名',
          width: '14%',
          dataIndex: 'fullName',
          render(text, record, index) {
            return (
              <Input
                placeholder="请输入姓名"
                value={record.fullName}
                onChange={e => {
                  that.state.dataSource[index].fullName = e.target.value;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
              />
            );
          },
        },
        {
          title: '性别',
          width: '14%',
          dataIndex: 'sex',
          render(text, record, index) {
            return (
              <Radio.Group
                onChange={e => {
                  that.state.dataSource[index].sex = e.target.value;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
                value={record.sex}
              >
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            );
          },
        },
        {
          title: '民族',
          width: '14%',
          dataIndex: 'nationalities',
          render(text, record, index) {
            return (
              <Select
                showSearch
                style={{ width: '150px' }}
                defaultValue={record.nationalities}
                placeholder="请选择民族"
                optionFilterProp="children"
                onChange={value => {
                  that.state.dataSource[index].nationalities = value;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
              >
                {nationArr.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.dataLabel}
                  </Select.Option>
                ))}
              </Select>
            );
          },
        },
        {
          title: '身份证号',
          width: '14%',
          dataIndex: 'idNumber',
          render(text, record, index) {
            return (
              <Input
                placeholder="请输入身份证号"
                value={record.idNumber}
                onChange={e => {
                  that.state.dataSource[index].idNumber = e.target.value;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
              />
            );
          },
        },
        {
          title: '证件',
          width: '14%',
          dataIndex: 'memberPictures',
          render(text, record, index) {
            return (
              <UploadImg
                fileList={record.memberPictures}
                callback={imgUrl => {
                  that.state.dataSource[index].memberPictures = imgUrl;
                  that.setState({
                    dataSource: that.state.dataSource,
                  });
                }}
              />
            );
          },
        },
        {
          title: '操作',
          width: '8%',
          dataIndex: 'opt',
          render(text, record, index) {
            if (index !== 0) {
              return (
                <div>
                  <Popconfirm
                    title="确认删除吗"
                    onConfirm={() => {
                      that.state.dataSource.splice(index, 1);
                      that.setState({
                        dataSource: that.state.dataSource,
                      });
                    }}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </div>
              );
            }
            return null;
          },
        },
      ],
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          <span
            className={styles.addBtn}
            onClick={() => {
              const json = {
                key: new Date().getTime(),
                relationship: null,
                fullName: '',
                sex: 0,
                nationalities: null,
                idNumber: '',
                memberPictures: '',
              };
              dataSource.push(json);
              this.setState({
                dataSource,
              });
            }}
          >
            添加成员
            <Icon className={styles.iconDom} type="plus-circle" key="Icon" />
          </span>
          <Table pagination={false} columns={this.state.columns} dataSource={dataSource} />
        </div>
      </div>
    );
  }
}

export default memList;
