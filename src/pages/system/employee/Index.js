/* eslint-disable no-param-reassign */
import React from 'react';
import { Divider, notification } from 'antd';
import Details from './components/Details';
import {
  OrdinaryTable,
  Search,
  Add,
  Up,
  Operation,
  ScreeningTag,
  Info,
} from '@/components/BusinessComponent/BusCom';

import AddUp from './components/AddUp';

import styles from './index.less';

import { postFormDateRequest } from '@/utils/api';

import { employeeList, delEmployee } from './Service';

const search = {
  ordinary: {
    queryTitle: '用户名',
    queryField: 'userName',
  },
  senior: [
    {
      queryTitle: '创建日期',
      queryField: 'createTime',
      component: 'DatePicker',
    },
    {
      queryTitle: '办公室电话',
      queryField: 'officephone',
      component: 'Input',
    },
    {
      queryTitle: '删除状态',
      queryField: 'isDeleted',
      component: 'Select-Multiple',
      componentData: [{ value: '0', title: '未删除' }, { value: '1', title: '已删除' }],
    },
    {
      queryTitle: '修改日期',
      queryField: 'updateTime',
      component: 'RangePicker',
    },
    {
      queryTitle: '用户状态',
      queryField: 'status',
      component: 'Select',
      componentData: [{ value: '0', title: 'A状态' }, { value: '1', title: 'B状态' }],
    },
    {
      queryTitle: '所属区域',
      queryField: 'regionId',
      component: 'Cascader', // 级联选择
      componentData: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      renovate: false,
    };
  }

  componentWillMount = () => {
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
          title: '用户名',
          width: '10%',
          dataIndex: 'userName',
        },
        {
          title: '办公室电话',
          width: '10%',
          dataIndex: 'officephone',
        },
        {
          title: '创建日期',
          width: '15%',
          dataIndex: 'createTime',
        },
        {
          title: '修改日期',
          width: '15%',
          dataIndex: 'updateTime',
        },
        {
          title: '删除状态',
          width: '10%',
          dataIndex: 'isDeleted',
          filters: [
            {
              text: '未删除',
              value: '0',
            },
            {
              text: '已删除',
              value: '1',
            },
          ],
          render(text, record) {
            return record.isDeleted === 0 ? '未删除' : '已删除';
          },
        },
        {
          title: '用户状态',
          width: '10%',
          dataIndex: 'status',
          filters: [
            {
              text: 'A状态',
              value: '0',
            },
            {
              text: 'B状态',
              value: '1',
            },
          ],
          render(text, record) {
            return record.isDeleted === 0 ? 'A状态' : 'B状态';
          },
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info
                  callback={() => {
                    console.log('详情被关闭了');
                  }}
                  title="用户详情"
                  info={
                    <Details
                      callback={async () => {
                        console.log('如果详情页有编辑操作需要列表页刷新时，通知页面刷新');
                        await that.setState({
                          renovate: true,
                        });
                        await that.setState({
                          renovate: false,
                        });
                      }}
                      id={record.id}
                    />
                  }
                >
                  详情
                </Info>
                <Divider type="vertical" />
                <Up width={800} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会将用户删除，确认操作吗？"
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

  delete = async id => {
    const data = await postFormDateRequest(delEmployee, { ids: id });
    if (data.code === 200) {
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[<Add key="1" width={600} title="添加用户" component={AddUp} />]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                renovate={this.state.renovate}
                scroll={{
                  x: 1400,
                  y: 'calc(100vh - 304px)',
                }}
                method="GET"
                align="center"
                listUrl={employeeList}
                columns={this.state.columns}
                operationBlock={[
                  {
                    title: '批量操作',
                    onClick: (idArr, objArr) => {
                      console.log(idArr);
                      console.log(objArr);
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
