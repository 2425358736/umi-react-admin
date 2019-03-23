import React from 'react';
import { Table, Popconfirm, Select, Input, Radio, Icon } from 'antd';
import UploadImg from '../../../components/UpLoad/UploadImage';
import { postRequest } from '@/utils/api';
import styles from '../index.less';
import { Info } from '@/components/BusinessComponent/BusCom';
import { SYS_Dict } from '@/services/SysInterface';
import MemberDetail from '../../member/components/MemberDetail';

class MemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: 0,
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
    // 与户主关系
    const withArr = await postRequest(`${SYS_Dict}/1`);
    if (withArr.status === 200) {
      await this.setState({ withArr: withArr.data });
    }

    // 民族列表
    const nationArr = await postRequest(`${SYS_Dict}/8`);
    if (nationArr.status === 200) {
      await this.setState({ nationArr: nationArr.data });
    }

    if (this.props.list && this.props.list.length > 0) {
      this.setState({ dataSource: this.props.list });
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
    const { type } = this.props;
    const columns = [
      {
        title: '与户主关系',
        width: '12%',
        dataIndex: 'relationship',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <span>{record.relationshipStr}</span>
              ) : (
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
              )}
            </div>
          );
        },
      },
      {
        title: '姓名',
        width: '10%',
        dataIndex: 'fullName',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <span>{record.fullName}</span>
              ) : (
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
              )}
            </div>
          );
        },
      },
      {
        title: '性别',
        width: '16%',
        dataIndex: 'sex',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <span>{text === 0 ? '男' : text === 1 ? '女' : '未知'}</span>
              ) : (
                <Radio.Group
                  style={{ whiteSpace: 'nowrap' }}
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
              )}
            </div>
          );
        },
      },
      {
        title: '民族',
        width: '14%',
        dataIndex: 'nationalities',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <span>{record.nationalitiesStr}</span>
              ) : (
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
              )}
            </div>
          );
        },
      },
      {
        title: '身份证号',
        width: '14%',
        dataIndex: 'idNumber',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <span>{text}</span>
              ) : (
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
              )}
            </div>
          );
        },
      },
      {
        title: '个人单页',
        width: '14%',
        dataIndex: 'memberPictures',
        render(text, record, index) {
          return (
            <div>
              {type === 2 || type === 3 ? (
                <div style={{ width: '50px', height: '50px' }}>
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={record.memberPictures}
                    alt=""
                  />
                </div>
              ) : (
                <UploadImg
                  fileList={record.memberPictures}
                  callback={imgUrl => {
                    that.state.dataSource[index].memberPictures = imgUrl;
                    that.setState({
                      dataSource: that.state.dataSource,
                    });
                  }}
                />
              )}
            </div>
          );
        },
      },
    ];
    if (type !== 0 && !type) {
      columns.push({
        title: '操作',
        width: '8%',
        dataIndex: 'opt',
        render(text, record, index) {
          return (
            <div>
              {record.relationship !== 1 && (
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
              )}
            </div>
          );
        },
      });
    }
    if (type === 3) {
      columns.push({
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
      });
    }

    this.setState({
      columns,
    });
  };

  render() {
    const that = this;
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          {!that.props.list && (
            <span
              className={styles.addBtn}
              onClick={() => {
                const json = {
                  id: new Date().getTime(),
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
          )}
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
