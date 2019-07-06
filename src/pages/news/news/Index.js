import React from 'react';
import { Divider, notification } from 'antd';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Add,
  Up,
  Operation,
  ScreeningTag,
  Info,
} from '@/components/BusinessComponent/BusCom';

import AddUp from './components/AddUp';

import Details from './components/Details';

import styles from './index.less';

import { deleteRequest } from '@/utils/api';

import { NewsBulletinList, DelNewsBulletin, NewsBulletinTop } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
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
      queryTitle: '门店类型',
      queryField: 'type',
      queryValue: ['1'],
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
      queryTitle: '创建日期起',
      queryField: 'createDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '创建日期止',
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
      title: '类型',
      column: 'typeStr',
    },
    {
      title: '标题',
      column: 'title',
    },
    {
      title: '发布状态',
      column: 'isReleaseStr',
    },
    {
      title: '浏览次数',
      column: 'readersNumber',
    },
    {
      title: '创建时间',
      column: 'sellingPrice',
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
    const that = this;
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '所属分类',
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
          ],
        },
        {
          title: '标题',
          width: '10%',
          dataIndex: 'title',
        },
        {
          title: '发布状态',
          width: '10%',
          dataIndex: 'isRelease',
          column: 'isReleaseStr',
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
          dataIndex: 'readersNumber',
        },
        {
          title: '创建时间',
          width: '10%',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title={record.storeName} info={<Details id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Up width={900} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder={`此操作将会将此${record.typeStr}删除，确认操作吗？`}
                  onClick={async () => {
                    await that.delete(record.id);
                  }}
                />
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

  delete = async id => {
    const data = await deleteRequest(`${DelNewsBulletin}?id=${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={NewsBulletinTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={900} title="添加新闻" component={AddUp} />,
                <ExportButton
                  key="2"
                  exportUrl={NewsBulletinList}
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
                listUrl={NewsBulletinList}
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
