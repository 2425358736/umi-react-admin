import React from 'react';

import {
  ScreeningTag,
  OrdinaryTable,
  TopStatistics,
  Search,
  Info,
} from '@/components/BusinessComponent/BusCom';

import ExamineDetail from './components/ExamineDetail';

import styles from './index.less';

import { postRequest } from '@/utils/api';

import { EXAMINE_LIST, EXAMINE_LIST_HEADER, SYS_Dict } from '@/services/SysInterface';

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

  componentWillMount = async () => {
    // 大队列表
    const arr = [];
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      queueArr.data.forEach(item => {
        arr.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '大队',
          width: '5%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '编号',
          width: '5%',
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
                  <Info
                    title={
                      record.changeType === 0
                        ? '迁入审批'
                        : record.changeType === 1
                        ? '增员审批'
                        : record.changeType === 2
                        ? '减员审批'
                        : '注销审批'
                    }
                    info={<ExamineDetail id={record.id} />}
                  >
                    {record.changeType === 0
                      ? '迁入审批'
                      : record.changeType === 1
                      ? '增员审批'
                      : record.changeType === 2
                      ? '减员审批'
                      : '注销审批'}
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
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={EXAMINE_LIST_HEADER} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search ordinary={search.ordinary} senior={search.senior} />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable listUrl={EXAMINE_LIST} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Examine;
