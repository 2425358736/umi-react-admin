/* eslint-disable no-param-reassign */
import React from 'react';
import { Menu, Divider, Dropdown, Icon, notification } from 'antd';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Add,
  Up,
  Operation,
  ScreeningTag,
} from '@/components/BusinessComponent/BusCom';

import AddUp from './components/AddUp';

import styles from './index.less';

import { postRequest } from '@/utils/api';

import {
  SYS_USER_TOP,
  SYS_USER_LIST,
  SYS_DEL_USER,
  SYS_RESET_PASSWORD,
  SYS_ROLE_LIST,
  FrozenSysUser,
} from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '已冻结',
      displayField: 'frozen',
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      queryValue: ['1'],
    },
    {
      displayTitle: '未冻结',
      displayField: 'unfrozen',
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      queryValue: ['0'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '手机号',
    queryField: 'phone',
  },
  senior: [
    {
      queryTitle: '创建日期',
      queryField: 'createDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '邮箱',
      queryField: 'email',
      component: 'Input',
    },
    {
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      component: 'Select-Multiple',
      componentData: [{ value: '0', title: '未冻结' }, { value: '1', title: '已冻结' }],
    },
    {
      queryTitle: '修改日期',
      queryField: 'updateDate',
      component: 'RangePicker',
    },
    {
      queryTitle: '用户类别',
      queryField: 'userType',
      component: 'Select',
      componentData: [{ value: '0', title: 'A类别' }, { value: '1', title: 'B类别' }],
    },
  ],
};

const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
      export: true,
    },
    {
      title: '登录名',
      column: 'loginName',
      export: true,
    },
    {
      title: '邮箱',
      column: 'email',
      export: true,
    },
    {
      title: '手机',
      column: 'phone',
      export: true,
    },
    {
      title: '创建日期',
      column: 'createDate',
    },
    {
      title: '修改日期',
      column: 'updateDate',
    },
    {
      title: '冻结状态',
      column: 'freezeStateStr',
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

  componentWillMount = () => {
    this.columnsUp([]);
  };

  columnsUp = roleArr => {
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
          title: '角色',
          width: '10%',
          dataIndex: 'roleIds',
          column: 'roleNames',
          filters: roleArr,
        },
        {
          title: '登录名',
          width: '10%',
          dataIndex: 'loginName',
        },
        {
          title: '真实姓名',
          width: '10%',
          dataIndex: 'realName',
        },
        {
          title: '邮箱',
          width: '15%',
          dataIndex: 'email',
        },
        {
          title: '手机',
          width: '12%',
          dataIndex: 'phone',
        },
        {
          title: '创建日期',
          width: '10%',
          dataIndex: 'createDate',
          sorter: true,
        },
        {
          title: '修改日期',
          width: '10%',
          dataIndex: 'updateDate',
        },
        {
          title: '冻结状态',
          width: '8%',
          dataIndex: 'freezeState',
          column: 'freezeStateStr',
          filters: [
            {
              text: '未冻结',
              value: '0',
            },
            {
              text: '已冻结',
              value: '1',
            },
          ],
          render(text, record) {
            return (
              <div>
                <b
                  style={{
                    display: 'inline-block',
                    marginRight: '6px',
                    height: '9px',
                    width: '9px',
                    borderRadius: '50%',
                    background: text === '0' ? '#f00' : '#1ab393',
                  }}
                />
                <span>{record.freezeStateStr}</span>
              </div>
            );
          },
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            const opRecord = (
              <Menu>
                <Menu.Item>
                  <Operation
                    title="重置密码"
                    mode={0}
                    reminder="此操作将会将密码重置，确认操作吗？"
                    onClick={async () => {
                      await that.reset(record.id);
                    }}
                  />
                </Menu.Item>
                <Menu.Item>
                  <Operation
                    title={record.freezeState === 0 ? '冻结' : '解冻'}
                    mode={0}
                    reminder={
                      record.freezeState === 0
                        ? '此操作将会将会冻结此用户，确认操作吗？'
                        : '此操作将会将会解冻此用户，确认操作吗？'
                    }
                    onClick={async () => {
                      await that.frozen(record);
                    }}
                  />
                </Menu.Item>
                <Menu.Item>
                  <Operation
                    title="删除"
                    mode={0}
                    reminder="此操作将会将用户删除，确认操作吗？"
                    onClick={async () => {
                      await that.delete(record.id);
                    }}
                  />
                </Menu.Item>
              </Menu>
            );
            return (
              <div>
                <Up width={800} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Dropdown overlay={opRecord} placement="bottomLeft">
                  <Icon
                    type="ellipsis"
                    style={{ paddingTop: '10px', fontSize: 14, color: '#1ab393' }}
                  />
                </Dropdown>
              </div>
            );
          },
        },
      ],
    });
  };

  frozen = async record => {
    if (record.freezeState === 0) {
      // 冻结
      record.freezeState = 1;
      const data = await postRequest(FrozenSysUser, record);
      if (data.status === 200) {
        notification.success({ message: '冻结成功' });
      }
    } else {
      // 解冻
      record.freezeState = 0;
      const data = await postRequest(FrozenSysUser, record);
      if (data.status === 200) {
        notification.success({ message: '解冻成功' });
      }
    }
  };

  componentDidMount = async () => {
    const data = await postRequest(SYS_ROLE_LIST, { type: 1, query: {} });
    if (data.status === 200) {
      const arr = [];
      data.data.list.forEach(json => {
        const obj = { text: json.roleName, value: json.id.toString() };
        arr.push(obj);
      });
      this.columnsUp(arr);
    }
  };

  reset = async id => {
    const data = await postRequest(`${SYS_RESET_PASSWORD}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg, description: data.subMsg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  delete = async id => {
    const data = await postRequest(`${SYS_DEL_USER}/${id}`);
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
          <TopStatistics sourceUrl={SYS_USER_TOP} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" width={800} title="添加用户" component={AddUp} />,
                <ExportButton key="2" exportUrl={SYS_USER_LIST} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 1500,
                  y: 'calc(100vh - 252px)',
                }}
                align="center"
                listUrl={SYS_USER_LIST}
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
