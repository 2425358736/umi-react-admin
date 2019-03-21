import React from 'react';

import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Search,
  Info,
} from '@/components/BusinessComponent/BusCom';

import MoveInExamine from './components/MoveInexamine/MoveInExamine';

import styles from './index.less';

import { EXAMINE_LIST, EXAMINE_LIST_HEADER } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'totalNum',
    },
    {
      displayTitle: '待审核',
      displayField: 'waitExamine',
      queryTitle: '状态',
      queryField: 'auditStatus',
      queryValue: ['0'],
    },
    {
      displayTitle: '待确认',
      displayField: 'waitConfirm',
      queryTitle: '状态',
      queryField: 'auditStatus',
      queryValue: ['1'],
    },
    {
      displayTitle: '审核通过',
      displayField: 'complete',
      queryTitle: '状态',
      queryField: 'auditStatus',
      queryValue: ['2'],
    },
    {
      displayTitle: '作废',
      displayField: 'cancel',
      queryTitle: '状态',
      queryField: 'auditStatus',
      queryValue: ['3'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '户主姓名',
    queryField: 'householderName',
  },
  senior: [
    {
      queryTitle: '户号',
      queryField: 'householdRegisterNumber',
      component: 'Input',
    },
    {
      queryTitle: '编号',
      queryField: 'householdNumber',
      component: 'Input',
    },
    {
      queryTitle: '身份证号',
      queryField: 'householderNumber',
      component: 'Input',
    },
    {
      queryTitle: '住址',
      queryField: 'homeAddress',
      component: 'Input',
    },
  ],
};

class Examine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentWillMount = () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '编号',
          width: '10%',
          dataIndex: 'householdNumber',
        },
        {
          title: '户主',
          width: '10%',
          dataIndex: 'householderName',
        },
        {
          title: '身份证号',
          width: '10%',
          dataIndex: 'householderNumber',
        },
        {
          title: '户别',
          width: '10%',
          dataIndex: 'householdType',
          column: 'householdTypeStr',
          filters: [
            {
              text: '家庭户',
              value: '0',
            },
            {
              text: '集体户',
              value: '1',
            },
          ],
        },
        {
          title: '户号',
          width: '10%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '住址',
          width: '12%',
          dataIndex: 'homeAddress',
        },
        {
          title: '申请类型',
          width: '10%',
          dataIndex: 'changeType',
          column: 'changeTypeStr',
          filters: [
            {
              text: '迁入',
              value: '0',
            },
            {
              text: '增员',
              value: '1',
            },
            {
              text: '减员',
              value: '2',
            },
            {
              text: '注销',
              value: '3',
            },
          ],
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'auditStatus',
          column: 'auditStatusStr',
          filters: [
            {
              text: '待审核',
              value: '0',
            },
            {
              text: '待确认',
              value: '1',
            },
            {
              text: '审核通过',
              value: '2',
            },
            {
              text: '作废',
              value: '3',
            },
          ],
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <span>
                {record.auditStatus === 0 && (
                  <Info title="迁入审批" info={<MoveInExamine id={record.id} />}>
                    审批
                  </Info>
                )}
              </span>
            );
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <BaseTable
          isTop={<TopStatistics sourceUrl={EXAMINE_LIST_HEADER} topJson={topStatistics.topJson} />}
          search={<Search ordinary={search.ordinary} senior={search.senior} />}
          table={<OrdinaryTable listUrl={EXAMINE_LIST} columns={this.state.columns} />}
        />
      </div>
    );
  }
}

export default Examine;
