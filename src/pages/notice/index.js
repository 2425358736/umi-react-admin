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

import NoticeDetail from './components/NoticeDetail';
import NoticeAdd from './components/NoticeAdd';

import styles from './index.less';

import { NOTICE_LIST_HEADER, NOTICE_LIST } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'zg',
    },
    {
      displayTitle: '新闻',
      displayField: 'xw',
      queryTitle: '类型',
      queryField: 'type',
      queryValue: ['0'],
    },
    {
      displayTitle: '公告',
      displayField: 'gg',
      queryTitle: '类型',
      queryField: 'type',
      queryValue: ['1'],
    },
    {
      displayTitle: '通知',
      displayField: 'tz',
      queryTitle: '类型',
      queryField: 'type',
      queryValue: ['2'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '标题',
    queryField: 'title',
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
      column: 'typeStr',
    },
    {
      title: '标题',
      column: 'title',
    },
    {
      title: '发布状态',
      column: 'stateStr',
    },
    {
      title: '浏览次数',
      column: 'browseFrequency',
    },
    {
      title: '管理员',
      column: 'administrators',
    },
    {
      title: '创建时间',
      column: 'createDate',
    },
  ],
};

class Notice extends React.Component {
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
          dataIndex: 'type',
          column: 'typeStr',
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
          width: '16%',
          dataIndex: 'title',
        },
        {
          title: '发布状态',
          width: '10%',
          dataIndex: 'state',
          column: 'stateStr',
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
          title: '浏览次数',
          width: '10%',
          dataIndex: 'browseFrequency',
        },
        {
          title: '管理员',
          width: '10%',
          dataIndex: 'administrators',
        },
        {
          title: '创建时间',
          width: '16%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="通告详情" info={<NoticeDetail id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Up id={record.id} width={800} title="编辑" component={NoticeAdd} />
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className={styles.baseTableWrap}>
        <TopStatistics sourceUrl={NOTICE_LIST_HEADER} topJson={topStatistics.topJson} />
        <div className={styles.screenTag}>
          <Search
            ordinary={search.ordinary}
            senior={search.senior}
            operationBlock={[
              <Add key="1" width={800} title="新建" component={NoticeAdd} />,
              <ExportButton key="2" exportUrl={NOTICE_LIST} columns={exportButton.columns} />,
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
              listUrl={NOTICE_LIST}
              columns={this.state.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Notice;
