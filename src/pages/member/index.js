import React from 'react';
import { postRequest } from '@/utils/api';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ScreeningTag,
  Info,
} from '@/components/BusinessComponent/BusCom';

import MemberDetail from './components/MemberDetail';

import styles from './index.less';

import { MEMBER_LIST_HEADER, MEMBER_LIST, SYS_Dict } from '@/services/SysInterface';

const topStatistics = {
  topJson: [],
};

const search = {
  ordinary: {
    queryTitle: '姓名，全拼，简拼，身份证号，手机号',
    queryField: 'fullName',
  },
  senior: [
    {
      queryTitle: '编号',
      queryField: 'householdNumber',
      component: 'Input',
    },
    {
      queryTitle: '户主',
      queryField: 'householderName',
      component: 'Input',
    },
    {
      queryTitle: '户号',
      queryField: 'householdRegisterNumber',
      component: 'Input',
    },
    {
      queryTitle: '年龄起',
      queryField: 'ageStart',
      component: 'Input',
    },
    {
      queryTitle: '年龄止',
      queryField: 'ageEnd',
      component: 'Input',
    },
    {
      queryTitle: '住址',
      queryField: 'homeAddress',
      component: 'Input',
    },
    {
      queryTitle: '出生日期起',
      queryField: 'birthStartDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '出生日期止',
      queryField: 'birthEndDate',
      component: 'DatePicker',
    },
  ],
};

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '序号',
          width: '4%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '姓名',
          width: '6%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '6%',
          dataIndex: 'sex',
          column: 'sex',
          filters: [
            {
              text: '男',
              value: '0',
            },
            {
              text: '女',
              value: '1',
            },
            {
              text: '未知',
              value: '2',
            },
          ],
          render(text) {
            return text === 0 ? '男' : text === 1 ? '女' : '未知';
          },
        },
        {
          title: '民族',
          width: '6%',
          dataIndex: 'nationalities',
          column: 'nationalitiesStr',
          filters: [],
        },
        {
          title: '身份证号',
          width: '6%',
          dataIndex: 'idNumber',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
        {
          title: '政治面貌',
          width: '6%',
          dataIndex: 'politicsFaceStr',
        },
        {
          title: '手机号',
          width: '6%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '出生日期',
          width: '8%',
          dataIndex: 'birthDate',
        },
        {
          title: '年龄',
          width: '6%',
          dataIndex: 'age',
        },
        {
          title: '户号',
          width: '6%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '编号',
          width: '6%',
          dataIndex: 'householdNumber',
        },
        {
          title: '户主',
          width: '6%',
          dataIndex: 'householderName',
        },
        {
          title: '与户主关系',
          width: '8%',
          dataIndex: 'relationship',
          column: 'relationshipStr',
          filters: [],
        },
        {
          title: '大队',
          width: '6%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: [],
        },
        {
          title: '住址',
          width: '8%',
          dataIndex: 'homeAddress',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
        {
          title: '操作',
          width: '6%',
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
    };
  }

  queueArr = async () => {
    // 大队列表
    const arr = [];
    const arr1 = [
      {
        displayTitle: '总共',
        displayField: 'name0',
      },
    ];
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      queueArr.data.forEach(item => {
        arr.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
        arr1.push({
          displayTitle: item.dataLabel,
          displayField: `name${item.id}`,
          queryTitle: '大队',
          queryField: 'troops',
          queryValue: [item.id.toString()],
        });
      });
    }
    topStatistics.topJson = arr1;
    return arr;
  };

  nationArr = async () => {
    // 民族列表
    const arr3 = [];
    const nationArr = await postRequest(`${SYS_Dict}/8`);
    if (nationArr.status === 200) {
      nationArr.data.forEach(item => {
        arr3.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    return arr3;
  };

  withArr = async () => {
    // 与户主关系
    const arr4 = [];
    const withArr = await postRequest(`${SYS_Dict}/1`);
    if (withArr.status === 200) {
      withArr.data.forEach(item => {
        arr4.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    return arr4;
  };

  componentWillMount = async () => {
    const arr = await this.queueArr();
    const arr3 = await this.nationArr();
    const arr4 = await this.withArr();
    this.setState({
      columns: [
        {
          title: '序号',
          width: '4%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '姓名',
          width: '6%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '6%',
          dataIndex: 'sex',
          column: 'sexStr',
          filters: [
            {
              text: '男',
              value: '0',
            },
            {
              text: '女',
              value: '1',
            },
            {
              text: '未知',
              value: '2',
            },
          ],
        },
        {
          title: '民族',
          width: '6%',
          dataIndex: 'nationalities',
          column: 'nationalitiesStr',
          filters: arr3,
        },
        {
          title: '身份证号',
          width: '6%',
          dataIndex: 'idNumber',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
        {
          title: '政治面貌',
          width: '6%',
          dataIndex: 'politicsFaceStr',
        },
        {
          title: '手机号',
          width: '6%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '出生日期',
          width: '8%',
          dataIndex: 'birthDate',
        },
        {
          title: '年龄',
          width: '6%',
          dataIndex: 'age',
        },
        {
          title: '户号',
          width: '6%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '编号',
          width: '6%',
          dataIndex: 'householdNumber',
        },
        {
          title: '户主',
          width: '6%',
          dataIndex: 'householderName',
        },
        {
          title: '与户主关系',
          width: '8%',
          dataIndex: 'relationship',
          column: 'relationshipStr',
          filters: arr4,
        },
        {
          title: '大队',
          width: '6%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '住址',
          width: '8%',
          dataIndex: 'homeAddress',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
        {
          title: '操作',
          width: '6%',
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
    });
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={MEMBER_LIST_HEADER} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search ordinary={search.ordinary} senior={search.senior} />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 1900,
                  y: 'calc(100vh - 218px)',
                }}
                listUrl={MEMBER_LIST}
                columns={this.state.columns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberList;
