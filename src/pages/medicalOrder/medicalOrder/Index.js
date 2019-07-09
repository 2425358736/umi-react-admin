import React from 'react';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  ScreeningTag,
  Info,
} from '@/components/BusinessComponent/BusCom';

import Details from './components/Details';

import styles from './index.less';

import { MedicalOrderList, MedicalOrderTop } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'allNum',
    },
    {
      displayTitle: '已预约',
      displayField: 'yyy',
      queryTitle: '状态',
      queryField: 'orderState',
      queryValue: ['0'],
    },
    {
      displayTitle: '进行中',
      displayField: 'jxz',
      queryTitle: '状态',
      queryField: 'orderState',
      queryValue: ['1'],
    },
    {
      displayTitle: '已结束',
      displayField: 'yjs',
      queryTitle: '状态',
      queryField: 'orderState',
      queryValue: ['2,3,4'],
    },
    {
      displayTitle: '已取消',
      displayField: 'yqx',
      queryTitle: '状态',
      queryField: 'orderState',
      queryValue: ['5'],
    },
    {
      displayTitle: '已失效',
      displayField: 'ysx',
      queryTitle: '状态',
      queryField: 'orderState',
      queryValue: ['6'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '家长姓名',
    queryField: 'parentName',
  },
  senior: [
    {
      queryTitle: '预约门店',
      queryField: 'storeName',
      component: 'Input',
    },
    {
      queryTitle: '预约技师',
      queryField: 'realName',
      component: 'Input',
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
      title: '预约门店',
      column: 'storeName',
    },
    {
      title: '技师',
      column: 'realName',
    },
    {
      title: '家长姓名',
      column: 'parentName',
    },
    {
      title: '宝贝',
      column: 'babyName',
    },
    {
      title: '预约时间',
      column: 'appointmentDateStart',
    },
    {
      title: '状态',
      column: 'orderStateStr',
    },
    {
      title: '创建时间',
      column: 'createDate',
    },
  ],
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentWillMount = async () => {
    this.columnsUp([]);
  };

  columnsUp = () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '预约门店',
          width: '10%',
          dataIndex: 'storeName',
        },
        {
          title: '技师',
          width: '10%',
          dataIndex: 'realName',
        },
        {
          title: '家长姓名',
          width: '10%',
          dataIndex: 'parentName',
        },
        {
          title: '宝贝',
          width: '10%',
          dataIndex: 'babyName',
        },
        {
          title: '预约时间',
          width: '20%',
          dataIndex: 'appointmentDateStart',
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'orderState',
          column: 'orderStateStr',
          filters: [
            {
              text: '已预约',
              value: '0',
            },
            {
              text: '已签到',
              value: '1',
            },
            {
              text: '已结束',
              value: '2',
            },
            {
              text: '已结束',
              value: '3',
            },
            {
              text: '已结束',
              value: '4',
            },
            {
              text: '已取消',
              value: '5',
            },
            {
              text: '已失效',
              value: '6',
            },
          ],
        },
        {
          title: '创建日期',
          width: '20%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '5%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="预约单详情" info={<Details id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
    });
  };

  componentDidMount = async () => {
    this.columnsUp();
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={MedicalOrderTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton
                  key="2"
                  exportUrl={MedicalOrderList}
                  columns={exportButton.columns}
                />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                align="center"
                listUrl={MedicalOrderList}
                columns={this.state.columns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
