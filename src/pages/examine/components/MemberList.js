import React from 'react';
import { Table } from 'antd';
import MemberDetail from '../../member/components/MemberDetail';
import { Info } from '@/components/BusinessComponent/BusCom';
import { getRequest } from '@/utils/api';
import { HOUSEHOLD_DETAIL } from '@/services/SysInterface';
import styles from './components.less';

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
          render(text, record) {
            return (
              <div>
                <Info title="社员详情" info={<MemberDetail id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
      dataSource: [],
    };
  }

  componentDidMount = async () => {
    const data = await getRequest(`${HOUSEHOLD_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        dataSource: data.data.listMember,
      });
    }
  };

  render() {
    return (
      <div className={styles.midWrap} style={{ minHeight: 'calc(100vh - 182px)' }}>
        <div className={styles.titleDom}>
          <span />
          <span>当前成员列表</span>
        </div>
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
