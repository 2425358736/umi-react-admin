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

import {
  EShopCommodityList,
  DelEShopCommodity,
  EShopCommodityTop,
  EShopCommodityCategoryTree,
} from './Service';

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
    queryField: 'shopCommodityName',
  },
  senior: [
    {
      queryTitle: '所属分类',
      queryField: 'shopCommodityCategoryId',
      component: 'Cascader',
      componentData: [],
    },
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
      title: '所属分类',
      column: 'shopCategoryName',
    },
    {
      title: '商品名称',
      column: 'shopCommodityName',
    },
    {
      title: '规格',
      column: 'specsStr',
    },
    {
      title: '售价(元)',
      column: 'shopSalesPrice',
    },
    {
      title: '是否上架',
      column: 'isSellStr',
    },
    {
      title: '创建日期',
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
    const commodityTree = await getRequest(EShopCommodityCategoryTree);
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
          dataIndex: 'shopCategoryName',
        },
        {
          title: '商品名称',
          width: '20%',
          dataIndex: 'shopCommodityName',
        },
        {
          title: '规格',
          width: '10%',
          dataIndex: 'specsStr',
        },
        {
          title: '售价(元)',
          width: '10%',
          dataIndex: 'shopSalesPrice',
        },
        {
          title: '是否上架',
          width: '10%',
          dataIndex: 'isSell',
          column: 'isSellStr',
          filters: [
            {
              text: '是',
              value: '0',
            },
            {
              text: '否',
              value: '1',
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
    const data = await deleteRequest(`${DelEShopCommodity}?id=${id}`);
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
          <TopStatistics sourceUrl={EShopCommodityTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={700} title="添加商品" component={AddUp} />,
                <ExportButton
                  key="2"
                  exportUrl={EShopCommodityList}
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
                listUrl={EShopCommodityList}
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
