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

import { CommodityList, DelCommodity, CommodityTop, CommodityCategoryListTree } from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '商品名称',
    queryField: 'commodityName',
  },
  senior: [
    {
      queryTitle: '所属分类',
      queryField: 'categoryId',
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
      title: '所属分类',
      column: 'categoryIdStr',
    },
    {
      title: '商品名称',
      column: 'commodityName',
    },
    {
      title: '单位',
      column: 'measureStr',
    },
    {
      title: '成本价(元)',
      column: 'costPrice',
    },
    {
      title: '售价（元）',
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
    const commodityTree = await getRequest(CommodityCategoryListTree);
    search.senior[0].componentData = commodityTree.data;
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
          dataIndex: 'categoryIdStr',
        },
        {
          title: '商品名称',
          width: '10%',
          dataIndex: 'commodityName',
        },
        {
          title: '单位',
          width: '10%',
          dataIndex: 'measureStr',
        },
        {
          title: '成本价(元)',
          width: '10%',
          dataIndex: 'costPrice',
        },
        {
          title: '售价（元）',
          width: '10%',
          dataIndex: 'sellingPrice',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="商品详情" info={<Details id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Up width={700} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会将商品删除，确认操作吗？"
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
    const data = await deleteRequest(`${DelCommodity}?id=${id}`);
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
          <TopStatistics sourceUrl={CommodityTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={700} title="添加商品" component={AddUp} />,
                <ExportButton key="2" exportUrl={CommodityList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable align="center" listUrl={CommodityList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
