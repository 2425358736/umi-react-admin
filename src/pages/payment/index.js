import React from 'react';
import { Divider } from 'antd';

import {
  ScreeningTag,
  OrdinaryTable,
  TopStatistics,
  Search,
  Info,
  Add,
  Up,
  ExportButton,
} from '@/components/BusinessComponent/BusCom';

import PayDetail from './components/PayDetail';
import PayAdd from './components/PayAdd';

import styles from './index.less';

import { PAYMENT_LIST_HEADER, PAYMENT_LIST } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'zg',
    },
    {
      displayTitle: '未发布',
      displayField: 'wfb',
      queryTitle: '消息状态',
      queryField: 'releaseStatus',
      queryValue: ['0'],
    },
    {
      displayTitle: '已发布',
      displayField: 'yfb',
      queryTitle: '消息状态',
      queryField: 'releaseStatus',
      queryValue: ['1'],
    },
    {
      displayTitle: '已结束',
      displayField: 'tjs',
      queryTitle: '消息状态',
      queryField: 'releaseStatus',
      queryValue: ['2'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '项目名称',
    queryField: 'entryName',
  },
  senior: [
    {
      queryTitle: '创建日期起',
      queryField: 'startCreateDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '创建日期止',
      queryField: 'endCreateDate',
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
      title: '项目名称',
      column: 'entryName',
    },
    {
      title: '状态',
      column: 'releaseStatusStr',
    },
    {
      title: '缴费对象',
      column: 'paymentObjectStr',
    },
    {
      title: '管理员',
      column: 'administrators',
    },
    {
      title: '创建时间',
      column: 'createDate',
    },
    {
      title: '参缴数',
      column: 'paymentNumber',
    },
    {
      title: '总金额',
      column: 'aggregateAmount',
    },
  ],
};

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount = async () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '项目名称',
          width: '10%',
          dataIndex: 'entryName',
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'releaseStatus',
          column: 'releaseStatusStr',
          filters: [
            {
              text: '未发布',
              value: '0',
            },
            {
              text: '已发布',
              value: '1',
            },
            {
              text: '已结束',
              value: '2',
            },
          ],
        },
        {
          title: '缴费对象',
          width: '10%',
          dataIndex: 'paymentObject',
          column: 'paymentObjectStr',
          filters: [
            {
              text: '每户',
              value: '0',
            },
            {
              text: '个人',
              value: '1',
            },
          ],
        },
        {
          title: '管理员',
          width: '10%',
          dataIndex: 'administrators',
        },
        {
          title: '创建时间',
          width: '12%',
          dataIndex: 'createDate',
        },
        {
          title: '参缴数',
          width: '10%',
          dataIndex: 'paymentNumber',
        },
        {
          title: '总金额',
          width: '10%',
          dataIndex: 'aggregateAmount',
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="缴费项目详情" info={<PayDetail id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Up id={record.id} width={800} title="编辑" component={PayAdd} />
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
          <TopStatistics sourceUrl={PAYMENT_LIST_HEADER} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={800} title="缴费项目录入" component={PayAdd} />,
                <ExportButton key="2" exportUrl={PAYMENT_LIST} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 1350,
                  y: 'calc(100vh - 218px)',
                }}
                listUrl={PAYMENT_LIST}
                columns={this.state.columns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
