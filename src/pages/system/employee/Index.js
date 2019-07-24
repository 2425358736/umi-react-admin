import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized'; // 权限组件---（建议不用，权限由后台来控制）
import { Divider, notification } from 'antd';
import Details from './components/Details';
import NoAuth from '@/pages/error/403/Index';
import {
  OrdinaryTable, // 列表组件
  Search, // 搜索组件
  Add, // 添加包层
  Up, // 修改包层
  Operation, // 操作按钮
  ScreeningTag, // 筛选标签展示组件
  Info, // 详情弹出包层
} from '@/components/BusinessComponent/BusCom';

import AddUp from './components/AddUp'; // 添加编辑页面

import styles from './index.less';

import { postFormDateRequest } from '@/utils/api'; // post请求 formDate格式参数

import { employeeList, delEmployee } from './Service';

// 搜索json
const search = {
  // 基础搜索， 输入框
  ordinary: {
    queryTitle: '用户名',
    queryField: 'userName',
  },
  // 高级搜索
  senior: [
    {
      queryTitle: '创建日期',
      queryField: 'createTime',
      component: 'DatePicker', // 日期选择框
    },
    {
      queryTitle: '办公室电话',
      queryField: 'officephone',
      component: 'Input', // 输入框
    },
    {
      queryTitle: '删除状态',
      queryField: 'isDeleted',
      component: 'Select-Multiple', // 多选框
      componentData: [{ value: '0', title: '未删除' }, { value: '1', title: '已删除' }],
    },
    {
      queryTitle: '修改日期',
      queryField: 'updateTime',
      component: 'RangePicker', // 日期周期框
    },
    {
      queryTitle: '用户状态',
      queryField: 'status',
      component: 'Select', // 单选框
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

// 获取当前全县默认sysUserList， 正常应该从缓存中拿取
const { Secured } = RenderAuthorized('sysUserList');

// 注解式授权
@Secured('sysUserList', <NoAuth />)
class Index extends React.Component {
  constructor(props) {
    super(props);
    /**
     * columns 表格列
     * renovate true 刷新表格 false 不刷新表格
     * @type {{columns: Array, renovate: boolean}}
     */
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
          width: '13%',
          dataIndex: 'createTime',
        },
        {
          title: '修改日期',
          width: '13%',
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
          width: '14%',
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
                  x: 1200,
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
