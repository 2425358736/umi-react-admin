import React from 'react';
import { Menu, Divider, Dropdown, Icon, notification } from 'antd';

import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Add,
  Up,
  Operation,
  Info,
} from '@/components/BusinessComponent/BusCom';

import Info2 from './components/Info';

import AddUp from './components/AddUp';

import Test from './components/Test';

import styles from './index.less';

import { postRequest } from '@/utils/api';

import {
  SYS_USER_TOP,
  SYS_USER_LIST,
  SYS_DEL_USER,
  SYS_RESET_PASSWORD,
  SYS_INFO,
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
    },
    {
      title: '登录名',
      column: 'loginName',
    },
    {
      title: '用户类别',
      column: 'userTypeStr',
    },
    {
      title: '邮箱',
      column: 'email',
    },
    {
      title: '手机',
      column: 'phone',
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

const templateOneInfo = {
  infoJson: [
    {
      title: '基础信息',
      dataIndex: 'basics',
      children: [
        {
          title: '用户名',
          dataIndex: 'loginName',
        },
        {
          title: '手机',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
      ],
    },
    {
      title: '高级信息',
      dataIndex: 'senior',
      children: [
        {
          title: '冻结状态',
          dataIndex: 'freezeStateStr',
        },
        {
          title: '用户类别',
          dataIndex: 'userTypeStr',
        },
        {
          title: '创建日期',
          dataIndex: 'createDate',
        },
      ],
    },
  ],
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const that = this;
    return (
      <div className={styles.sysUserWrap}>
        <BaseTable
          isTop={<TopStatistics sourceUrl={SYS_USER_TOP} topJson={topStatistics.topJson} />}
          search={
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="3" title="表单页面" component={Test} />,
                <Add key="1" title="添加用户" component={AddUp} />,
                <ExportButton key="2" exportUrl={SYS_USER_LIST} columns={exportButton.columns} />,
              ]}
            />
          }
          table={
            <OrdinaryTable
              operationBlock={[
                {
                  title: '批量操作1',
                  onClick: (idArr, objArr) => {
                    console.log(idArr, objArr);
                  },
                },
              ]}
              listUrl={SYS_USER_LIST}
              // isExport
              columns={[
                {
                  title: '序号',
                  width: '6%',
                  dataIndex: 'id',
                  isIncrement: true,
                },
                {
                  title: '登录名',
                  width: '10%',
                  dataIndex: 'loginName',
                  // isInfo: {
                  //   key: 'loginName',
                  //   title: '用户详情',
                  // },
                  render(text, record) {
                    return (
                      <Info
                        identifying={record.loginName}
                        title={record.loginName}
                        infoUrl={SYS_INFO}
                        infoJson={templateOneInfo.infoJson}
                        id={record.id}
                        info={<Info2 />}
                      >
                        {record.loginName}
                      </Info>
                    );
                  },
                },
                {
                  title: '用户类别',
                  width: '10%',
                  dataIndex: 'userType',
                  column: 'userTypeStr',
                },
                {
                  title: '邮箱',
                  width: '16%',
                  dataIndex: 'email',
                },
                {
                  title: '手机',
                  width: '12%',
                  dataIndex: 'phone',
                },
                {
                  title: '创建日期',
                  width: '12%',
                  dataIndex: 'createDate',
                  sorter: true,
                },
                {
                  title: '修改日期',
                  width: '11%',
                  dataIndex: 'updateDate',
                },
                {
                  title: '冻结状态',
                  width: '10%',
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
                  width: '13%',
                  dataIndex: 'opt',
                  render(text, record) {
                    const opRecord = (
                      <Menu>
                        <Menu.Item>
                          <Operation
                            title="重置密码"
                            mode={0}
                            reminder="此操作将会将密码重置，确认操作吗？"
                            onClick={() => {
                              that.reset(record.id);
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
                        <Up id={record.id} component={AddUp} title="编辑" />
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
              ]}
            />
          }
        />
      </div>
    );
  }
}

export default Index;
