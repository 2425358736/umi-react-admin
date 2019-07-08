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
  RegionPeopleList,
  DelHeadquartersPeople,
  DelHeadquartersPeopleTop,
  GetRegionPeople,
} from './Service';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'num',
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '姓名',
    queryField: 'realName',
  },
  senior: [
    {
      queryTitle: '身份证号',
      queryField: 'idNumber',
      component: 'Input',
    },
    {
      queryTitle: '手机号',
      queryField: 'phone',
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
      title: '区域',
      column: 'regionName',
    },
    {
      title: '姓名',
      column: 'realName',
    },
    {
      title: '工号',
      column: 'jobNumber',
    },
    {
      title: '性别',
      column: 'gender',
      filters: [
        {
          text: '男',
          value: '0',
        },
        {
          text: '女',
          value: '1',
        },
      ],
    },
    {
      title: '身份证号',
      column: 'idNumber',
    },
    {
      title: '手机号',
      column: 'phone',
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
    const regionTree = await getRequest(GetRegionPeople);
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
          title: '区域',
          width: '20%',
          dataIndex: 'regionName',
        },
        {
          title: '姓名',
          width: '10%',
          dataIndex: 'realName',
        },
        {
          title: '工号',
          width: '15%',
          dataIndex: 'jobNumber',
        },
        {
          title: '性别',
          width: '5%',
          dataIndex: 'gender',
          column: 'genderStr',
          filters: [
            {
              text: '男',
              value: '0',
            },
            {
              text: '女',
              value: '1',
            },
          ],
        },
        {
          title: '身份证号',
          width: '20%',
          dataIndex: 'idNumber',
        },
        {
          title: '手机号',
          width: '10%',
          dataIndex: 'phone',
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
                <Up width={700} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会将成员删除，确认操作吗？"
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
    const data = await deleteRequest(`${DelHeadquartersPeople}?id=${id}`);
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
          <TopStatistics
            sourceUrl={`${DelHeadquartersPeopleTop}?userType=1`}
            topJson={topStatistics.topJson}
          />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={700} title="添加区域合伙人" component={AddUp} />,
                <ExportButton
                  key="2"
                  exportUrl={RegionPeopleList}
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
                listUrl={RegionPeopleList}
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
