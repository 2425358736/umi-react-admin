import React from 'react';
import { Divider } from 'antd';
import { postRequest } from '@/utils/api';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ScreeningTag,
  Info,
  ExportButton,
  Up,
} from '@/components/BusinessComponent/BusCom';

import MemberDetail from './components/MemberDetail';

import MemEdit from './components/MemEdit';

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
    {
      queryTitle: '迁入日期起',
      queryField: 'inStartDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '迁出日期止',
      queryField: 'inEndDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '迁出日期起',
      queryField: 'outStartDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '迁出日期止',
      queryField: 'outEndDate',
      component: 'DatePicker',
    },
  ],
};
const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
    },
    {
      title: '姓名',
      column: 'fullName',
    },
    {
      title: '状态',
      column: 'memState',
    },
    {
      title: '迁入日期',
      column: 'moveInDate',
    },
    {
      title: '迁入类型',
      column: 'moveInTypeName',
    },
    {
      title: '迁出日期',
      column: 'moveOutDate',
    },
    {
      title: '迁出类型',
      column: 'moveOutTypeName',
    },
    {
      title: '性别',
      column: 'sexStr',
    },
    {
      title: '民族',
      column: 'nationalitiesStr',
    },
    {
      title: '身份证号',
      column: 'idNumber',
    },
    {
      title: '政治面貌',
      column: 'politicsFaceStr',
    },
    {
      title: '手机号',
      column: 'phoneNumber',
    },
    {
      title: '出生日期',
      column: 'birthDate',
    },
    {
      title: '年龄',
      column: 'age',
    },
    {
      title: '户号',
      column: 'householdRegisterNumber',
    },
    {
      title: '编号',
      column: 'householdNumber',
    },
    {
      title: '户主',
      column: 'householderName',
    },
    {
      title: '与户主关系',
      column: 'relationshipStr',
    },
    {
      title: '几队',
      column: 'troopsStr',
    },
    {
      title: '住址',
      column: 'homeAddress',
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
          width: '3%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '姓名',
          width: '4%',
          dataIndex: 'fullName',
        },
        {
          title: '状态',
          width: '4%',
          dataIndex: 'memState',
          column: 'memStateStr',
          filters: [
            {
              text: '正常',
              value: '0',
            },
            {
              text: '注销',
              value: '1',
            },
          ],
        },
        {
          title: '迁入日期',
          width: '4%',
          dataIndex: 'moveInDate',
        },
        {
          title: '迁入类型',
          width: '4%',
          dataIndex: 'moveInType',
          column: 'moveInTypeName',
          filters: [],
        },
        {
          title: '迁出日期',
          width: '4%',
          dataIndex: 'moveOutDate',
        },
        {
          title: '迁出类型',
          width: '4%',
          dataIndex: 'moveOutType',
          column: 'moveOutTypeName',
          filters: [],
        },
        {
          title: '性别',
          width: '4%',
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
          width: '4%',
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
          width: '6%',
          dataIndex: 'birthDate',
        },
        {
          title: '年龄',
          width: '4%',
          dataIndex: 'age',
        },
        {
          title: '户号',
          width: '4%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '编号',
          width: '4%',
          dataIndex: 'householdNumber',
          sorter: true,
        },
        {
          title: '户主',
          width: '5%',
          dataIndex: 'householderName',
        },
        {
          title: '与户主关系',
          width: '6%',
          dataIndex: 'relationship',
          column: 'relationshipStr',
          filters: [],
        },
        {
          title: '几队',
          width: '4%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: [],
        },
        {
          title: '住址',
          width: '5%',
          dataIndex: 'homeAddress',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
          },
        },
      ],
    };
  }

  queueArr = async () => {
    // 几队列表
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
          queryTitle: '几队',
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

  moveInTypeArr = async () => {
    // 迁入类型
    const arr5 = [];
    const moveInTypeArr = await postRequest(`${SYS_Dict}/11`);
    if (moveInTypeArr.status === 200) {
      moveInTypeArr.data.forEach(item => {
        arr5.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    return arr5;
  };

  moveOutTypeArr = async () => {
    // 迁入类型
    const arr6 = [];
    const moveOutTypeArr = await postRequest(`${SYS_Dict}/12`);
    if (moveOutTypeArr.status === 200) {
      moveOutTypeArr.data.forEach(item => {
        arr6.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    return arr6;
  };

  componentWillMount = async () => {
    const arr = await this.queueArr();
    const arr3 = await this.nationArr();
    const arr4 = await this.withArr();
    const arr5 = await this.moveInTypeArr();
    const arr6 = await this.moveOutTypeArr();
    this.setState({
      columns: [
        {
          title: '序号',
          width: '3%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '姓名',
          width: '4%',
          dataIndex: 'fullName',
        },
        {
          title: '操作',
          width: '6%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Up id={record.id} width={800} title="编辑" component={MemEdit} />
                <Divider type="vertical" />
                <Info title="社员详情" info={<MemberDetail id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
        {
          title: '状态',
          width: '4%',
          dataIndex: 'memStateStr',
        },
        {
          title: '迁入日期',
          width: '4%',
          dataIndex: 'moveInDate',
        },
        {
          title: '迁入类型',
          width: '4%',
          dataIndex: 'moveInType',
          column: 'moveInTypeName',
          filters: arr5,
        },
        {
          title: '迁出日期',
          width: '4%',
          dataIndex: 'moveOutDate',
        },
        {
          title: '迁出类型',
          width: '4%',
          dataIndex: 'moveOutType',
          column: 'moveOutTypeName',
          filters: arr6,
        },
        {
          title: '性别',
          width: '4%',
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
          width: '6%',
          dataIndex: 'birthDate',
        },
        {
          title: '年龄',
          width: '4%',
          dataIndex: 'age',
        },
        {
          title: '户号',
          width: '4%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '编号',
          width: '4%',
          dataIndex: 'householdNumber',
          sorter: true,
        },
        {
          title: '户主',
          width: '5%',
          dataIndex: 'householderName',
        },
        {
          title: '与户主关系',
          width: '6%',
          dataIndex: 'relationship',
          column: 'relationshipStr',
          filters: arr4,
        },
        {
          title: '几队',
          width: '4%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '住址',
          width: '5%',
          dataIndex: 'homeAddress',
          render(text) {
            return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
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
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={MEMBER_LIST} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 2600,
                  y: 'calc(100vh - 252px)',
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
