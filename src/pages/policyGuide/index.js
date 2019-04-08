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

import { POLICYGUIDEHEAD, POLICYGUIDELIST } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'allNum',
    },
    {
      displayTitle: '户籍',
      displayField: 'hjNum',
      queryTitle: '服务类型',
      queryField: 'type',
      queryValue: ['0'],
    },
    {
      displayTitle: '教育',
      displayField: 'jyNum',
      queryTitle: '服务类型',
      queryField: 'type',
      queryValue: ['1'],
    },
    {
      displayTitle: '养老保险',
      displayField: 'ylbxNum',
      queryTitle: '服务类型',
      queryField: 'type',
      queryValue: ['2'],
    },
    {
      displayTitle: '医疗保险',
      displayField: 'ylNum',
      queryTitle: '服务类型',
      queryField: 'type',
      queryValue: ['3'],
    },
    {
      displayTitle: '五保户',
      displayField: 'wbhNum',
      queryTitle: '类型',
      queryField: 'type',
      queryValue: ['4'],
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
      title: '服务类型',
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
          title: '服务类型',
          width: '10%',
          dataIndex: 'type',
          column: 'typeStr',
          filters: [
            {
              text: '户籍',
              value: '0',
            },
            {
              text: '教育',
              value: '1',
            },
            {
              text: '养老保险',
              value: '2',
            },
            {
              text: '医疗保险',
              value: '3',
            },
            {
              text: '五保户',
              value: '4',
            },
          ],
        },
        {
          title: '指南类型',
          width: '10%',
          dataIndex: 'fileType',
          column: 'fileTypeStr',
          filters: [
            {
              text: '政策文件',
              value: '0',
            },
            {
              text: '流程说明',
              value: '1',
            },
            {
              text: '常见问题',
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
          title: '创建员',
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
                <Info title="详情" info={<NoticeDetail id={record.id} />}>
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
        <TopStatistics sourceUrl={POLICYGUIDEHEAD} topJson={topStatistics.topJson} />
        <div className={styles.screenTag}>
          <Search
            ordinary={search.ordinary}
            senior={search.senior}
            operationBlock={[
              <Add key="1" width={800} title="新建" component={NoticeAdd} />,
              <ExportButton key="2" exportUrl={POLICYGUIDELIST} columns={exportButton.columns} />,
            ]}
          />
          <ScreeningTag />
        </div>
        <div className={styles.tableWrap}>
          <div>
            <OrdinaryTable
              scroll={{
                x: 1350,
                y: 'calc(100vh - 252px)',
              }}
              listUrl={POLICYGUIDELIST}
              columns={this.state.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Notice;
