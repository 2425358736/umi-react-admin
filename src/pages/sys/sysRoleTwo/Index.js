import React from 'react';
import { Divider, notification } from 'antd';

import {
  OrdinaryTable,
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

import { SYS_ROLE_LIST, SYS_DEL_ROLE } from '@/services/SysInterface';

const search = {
  ordinary: {
    queryTitle: '角色名称',
    queryField: 'phone',
  },
};

const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
      export: true,
    },
    {
      title: '角色名称',
      column: 'roleName',
      export: true,
    },
    {
      title: '角色编号',
      column: 'roleNumber',
      export: true,
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

  componentWillMount = () => {
    this.columnsUp();
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
          title: '角色名称',
          width: '10%',
          dataIndex: 'roleName',
        },
        {
          title: '角色编号',
          width: '10%',
          dataIndex: 'roleNumber',
        },
        {
          title: '创建日期',
          width: '10%',
          dataIndex: 'createDate',
          sorter: true,
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Up width={800} id={record.id} component={AddUp} title="编辑" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会将角色删除，确认操作吗？"
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

  delete = async id => {
    const data = await postRequest(`${SYS_DEL_ROLE}/${id}`);
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
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              operationBlock={[
                <Add key="1" width={800} title="添加角色" component={AddUp} />,
                <ExportButton key="2" exportUrl={SYS_ROLE_LIST} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable align="center" listUrl={SYS_ROLE_LIST} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
