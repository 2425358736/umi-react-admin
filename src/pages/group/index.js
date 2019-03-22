import React from 'react';
import { postRequest } from '@/utils/api';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ScreeningTag,
  Info,
  Add,
} from '@/components/BusinessComponent/BusCom';

import GroupDetail from './components/GroupDetail';
import GroupAdd from './components/GroupAdd';

import styles from './index.less';

import { MEMBER_LIST_HEADER, GROUP_LIST, SYS_Dict } from '@/services/SysInterface';

const topStatistics = {
  topJson: [],
};

const search = {
  ordinary: {
    queryTitle: '姓名，全拼，简拼，身份证号，手机号',
    queryField: 'fullName',
  },
  senior: [],
};

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    search.senior = [
      {
        queryTitle: '年龄起',
        queryField: 'householdNumber',
        component: 'Input',
      },
      {
        queryTitle: '年龄止',
        queryField: 'householderName',
        component: 'Input',
      },
      {
        queryTitle: '党龄起',
        queryField: 'householdRegisterNumber',
        component: 'Input',
      },
      {
        queryTitle: '党龄止',
        queryField: 'ageStart',
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
    ];
    this.state = {
      columns: [
        {
          title: '序号',
          width: '6%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '小组',
          width: '8%',
          dataIndex: 'branchGroupName',
        },
        {
          title: '姓名',
          width: '8%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '8%',
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
          width: '8%',
          dataIndex: 'nationalitiesName',
        },
        {
          title: '身份证号',
          width: '12%',
          dataIndex: 'idNumber',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
        {
          title: '手机号',
          width: '8%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '出生日期',
          width: '10%',
          dataIndex: 'birthDate',
        },
        {
          title: '年龄',
          width: '8%',
          dataIndex: 'age',
        },
        {
          title: '党龄',
          width: '8%',
          dataIndex: 'partyAge',
        },
        {
          title: '操作',
          width: '8%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="成员详情" info={<GroupDetail id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
    };
  }

  groupArr = async () => {
    // 小组列表
    const arr = [];
    const arr1 = [
      {
        displayTitle: '总共',
        displayField: 'name0',
      },
    ];
    const groupArr = await postRequest(`${SYS_Dict}/9`);
    if (groupArr.status === 200) {
      groupArr.data.forEach(item => {
        arr.push({
          title: item.dataLabel,
          value: item.id.toString(),
        });
        arr1.push({
          displayTitle: item.dataLabel,
          displayField: `name${item.id}`,
          queryTitle: '小组',
          queryField: 'troops',
          queryValue: [item.id.toString()],
        });
      });
    }
    topStatistics.topJson = arr1;
    search.senior.push({
      queryTitle: '小组',
      queryField: 'troops',
      component: 'Select-Multiple',
      componentData: arr,
    });
  };

  nationArr = async () => {
    // 民族列表
    const arr3 = [];
    const nationArr = await postRequest(`${SYS_Dict}/8`);
    if (nationArr.status === 200) {
      nationArr.data.forEach(item => {
        arr3.push({
          title: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    search.senior.push({
      queryTitle: '民族',
      queryField: 'nationalities',
      component: 'Select-Multiple',
      componentData: arr3,
    });
  };

  componentWillMount = async () => {
    this.groupArr();
    this.nationArr();
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={MEMBER_LIST_HEADER} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={800} title="党员关系转入" component={GroupAdd} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 1300,
                  y: 'calc(100vh - 218px)',
                }}
                listUrl={GROUP_LIST}
                columns={this.state.columns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupList;
