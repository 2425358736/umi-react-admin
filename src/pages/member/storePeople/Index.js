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

import { StorePeopleList, DelHeadquartersPeople, DelHeadquartersPeopleTop } from './Service';

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
      title: '职称',
      column: 'storeUserTypeStr',
    },
    {
      title: '姓名',
      column: 'realName',
    },
    {
      title: '所属门店',
      column: 'storeName',
    },
    {
      title: '门店类别',
      column: 'storeType',
    },
    {
      title: '工号',
      column: 'jobNumber',
    },
    {
      title: '性别',
      column: 'gender',
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
          title: '职称',
          width: '10%',
          dataIndex: 'storeUserType',
          column: 'storeUserTypeStr',
          filters: [
            {
              text: '店长',
              value: '0',
            },
            {
              text: '导诊',
              value: '1',
            },
            {
              text: '技师',
              value: '2',
            },
          ],
        },
        {
          title: '姓名',
          width: '10%',
          dataIndex: 'realName',
        },
        {
          title: '所属门店',
          width: '10%',
          dataIndex: 'storeName',
        },
        {
          title: '门店类别',
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
          title: '工号',
          width: '5%',
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
            sourceUrl={`${DelHeadquartersPeopleTop}?userType=2`}
            topJson={topStatistics.topJson}
          />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={700} title="添加门店成员" component={AddUp} />,
                <ExportButton key="2" exportUrl={StorePeopleList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                align="center"
                listUrl={StorePeopleList}
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
