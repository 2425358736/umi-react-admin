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

import { getRequest, deleteRequest } from '@/utils/api';

import { StoreList, DelStore, StoreTop, GetRegion } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
    },
    {
      displayTitle: '直营店',
      displayField: 'zyd',
      queryTitle: '门店类型',
      queryField: 'storeType',
      queryValue: ['0'],
    },
    {
      displayTitle: '加盟店',
      displayField: 'jmd',
      queryTitle: '门店类型',
      queryField: 'storeType',
      queryValue: ['1'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '门店名称',
    queryField: 'storeName',
  },
  senior: [
    {
      queryTitle: '门店编号',
      queryField: 'storeNumber',
      component: 'Input',
    },
    {
      queryTitle: '所属区域',
      queryField: 'regionId',
      component: 'Cascader',
      componentData: [],
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
      title: '所属区域',
      column: 'regionName',
    },
    {
      title: '门店类型',
      column: 'storeTypeStr',
    },
    {
      title: '门店名称',
      column: 'storeName',
    },
    {
      title: '门店编号',
      column: 'storeNumber',
    },
    {
      title: '省',
      column: 'province',
    },
    {
      title: '市',
      column: 'city',
    },
    {
      title: '详细地址',
      column: 'detailedAddress',
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
    const regionTree = await getRequest(GetRegion);
    search.senior[1].componentData = regionTree.data;
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
          title: '所属区域',
          width: '10%',
          dataIndex: 'regionName',
        },
        {
          title: '门店类型',
          width: '10%',
          dataIndex: 'storeType',
          column: 'storeTypeStr',
          filters: [
            {
              text: '直营店',
              value: '0',
            },
            {
              text: '加盟店',
              value: '1',
            },
          ],
        },
        {
          title: '门店名称',
          width: '10%',
          dataIndex: 'storeName',
          render(text, record) {
            return (
              <Info title={record.storeName} info={<Details id={record.id} />}>
                {record.storeName}
              </Info>
            );
          },
        },
        {
          title: '门店编号',
          width: '10%',
          dataIndex: 'storeNumber',
        },
        {
          title: '省',
          width: '10%',
          dataIndex: 'province',
        },
        {
          title: '市',
          width: '10%',
          dataIndex: 'city',
        },
        {
          title: '详细地址',
          width: '20%',
          dataIndex: 'detailedAddress',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Up width={700} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会将门店删除，确认操作吗？"
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
    const data = await deleteRequest(`${DelStore}?id=${id}`);
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
          <TopStatistics sourceUrl={StoreTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={700} title="添加用户" component={AddUp} />,
                <ExportButton key="2" exportUrl={StoreList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable align="center" listUrl={StoreList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
