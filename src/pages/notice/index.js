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

import PayDetail from './components/NoticeDetail';
import NoticeAdd from './components/NoticeAdd';

import styles from './index.less';

import { PAYMENT_LIST_HEADER, PAYMENT_LIST } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'zg',
    },
    {
      displayTitle: '新闻',
      displayField: 'wfb',
      queryTitle: '类型',
      queryField: 'releaseStatus',
      queryValue: ['0'],
    },
    {
      displayTitle: '公告',
      displayField: 'yfb',
      queryTitle: '类型',
      queryField: 'releaseStatus',
      queryValue: ['1'],
    },
    {
      displayTitle: '通知',
      displayField: 'tjs',
      queryTitle: '类型',
      queryField: 'releaseStatus',
      queryValue: ['2'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '标题',
    queryField: 'entryName',
  },
  senior: [
    {
      queryTitle: '创建时间起',
      queryField: 'startCreateDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '创建时间止',
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
      title: '类型',
      column: 'entryName',
    },
    {
      title: '标题',
      column: 'releaseStatusStr',
    },
    {
      title: '发布状态',
      column: 'paymentObjectStr',
    },
    {
      title: '浏览次数',
      column: 'administrators',
    },
    {
      title: '管理员',
      column: 'createDate',
    },
    {
      title: '创建时间',
      column: 'paymentNumber',
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
          title: '类型',
          width: '10%',
          dataIndex: 'entryName',
          column: 'paymentObjectStr',
          filters: [
            {
              text: '新闻',
              value: '0',
            },
            {
              text: '公告',
              value: '1',
            },
            {
              text: '通知',
              value: '2',
            },
          ],
        },
        {
          title: '标题',
          width: '10%',
          dataIndex: 'administrators',
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
          ],
        },
        {
          title: '缴费对象',
          width: '10%',
          dataIndex: 'paymentObject',
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
                <Info title="通告详情" info={<PayDetail id={record.id} />}>
                  详情
                </Info>
                {record.releaseStatus !== 2 && <Divider type="vertical" />}
                {record.releaseStatus !== 2 && (
                  <Up id={record.id} width={800} title="编辑" component={NoticeAdd} />
                )}
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
                <Add key="1" width={800} title="新建" component={NoticeAdd} />,
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
