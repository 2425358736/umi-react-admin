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

import { WxMemberList, WxMemberTop } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'allNum',
    },
    {
      displayTitle: '普通会员',
      displayField: 'pthy',
      queryTitle: '状态',
      queryField: 'grade',
      queryValue: ['0'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '姓名',
    queryField: 'userName',
  },
  senior: [
    {
      queryTitle: '手机号',
      queryField: 'phone',
      component: 'Input',
    },
    {
      queryTitle: '注册日期起',
      queryField: 'createDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '注册日期止',
      queryField: 'createDateEnd',
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
      title: '微信昵称',
      column: 'nickName',
    },
    {
      title: '会员等级',
      column: 'gradeStr',
    },
    {
      title: '所属门店',
      column: 'storeName',
    },
    {
      title: '姓名',
      column: 'userName',
    },
    {
      title: '手机号',
      column: 'phone',
    },
    {
      title: '注册时间',
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
          title: '微信昵称',
          width: '10%',
          dataIndex: 'nickName',
        },
        {
          title: '会员等级',
          width: '10%',
          dataIndex: 'grade',
          column: 'gradeStr',
          filters: [
            {
              text: '普通会员',
              value: '0',
            },
          ],
        },
        {
          title: '所属门店',
          width: '15%',
          dataIndex: 'storeName',
        },
        {
          title: '姓名',
          width: '10%',
          dataIndex: 'userName',
        },
        {
          title: '手机号',
          width: '20%',
          dataIndex: 'phone',
        },
        {
          title: '注册时间',
          width: '20%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="会员详情" info={<Details id={record.id} />}>
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
          <TopStatistics sourceUrl={`${WxMemberTop}`} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={WxMemberList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable align="center" listUrl={WxMemberList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
