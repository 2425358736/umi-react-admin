import React from 'react';
import { notification } from 'antd';

import {
  BaseTable,
  OrdinaryTable,
  Search,
  ExportButton,
  Operation,
  Info,
} from '@/components/BusinessComponent/BusCom';

import styles from './index.less';

import { postRequest } from '@/utils/api';

import { SYS_LIST_MAIL, SYS_MAIL_INFO, SYS_DEL_MAIL, SYS_READ_MAIL } from '@/services/SysInterface';

const search = {
  ordinary: {
    queryTitle: '标题',
    queryField: 'mailTitle',
  },
  senior: [
    {
      queryTitle: '消息类型',
      queryField: 'mailType',
      component: 'Select-Multiple',
      componentData: [
        { value: '0', title: '通知' },
        { value: '1', title: '消息' },
        { value: '2', title: '待办' },
      ],
    },
    {
      queryTitle: '消息类型',
      queryField: 'mailState',
      component: 'Select-Multiple',
      componentData: [{ value: '0', title: '未读' }, { value: '1', title: '已读' }],
    },
    {
      queryTitle: '发送时间',
      queryField: 'createDate',
      component: 'RangePicker',
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
      title: '消息类型',
      column: 'mailTypeStr',
    },
    {
      title: '标题',
      column: 'mailTitle',
    },
    {
      title: '状态',
      column: 'mailStateStr',
    },
    {
      title: '发送人',
      column: 'createBy',
    },
    {
      title: '发送时间',
      column: 'createDate',
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
          title: '消息类型',
          dataIndex: 'mailTypeStr',
        },
        {
          title: '标题',
          dataIndex: 'mailTitle',
        },
      ],
    },
    {
      title: '高级信息',
      dataIndex: 'senior',
      children: [
        {
          title: '状态',
          dataIndex: 'mailStateStr',
        },
        {
          title: '发送人',
          dataIndex: 'createBy',
        },
        {
          title: '发送时间',
          dataIndex: 'createDate',
        },
      ],
    },
  ],
};

class InsideMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 删除
   * @param id
   */

  deleteMail = async id => {
    const data = await postRequest(`${SYS_DEL_MAIL}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  // 设置已读
  read = async id => {
    const data = await postRequest(`${SYS_READ_MAIL}/${id}`);
    if (data.status === 200) {
      // notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    const that = this;
    return (
      <div className={styles.sysUserWrap}>
        <BaseTable
          search={
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={SYS_LIST_MAIL} columns={exportButton.columns} />,
              ]}
            />
          }
          table={
            <OrdinaryTable
              listUrl={SYS_LIST_MAIL}
              // isExport
              columns={[
                {
                  title: '序号',
                  width: '8%',
                  dataIndex: 'id',
                  isIncrement: true,
                },
                {
                  title: '消息类型',
                  width: '14%',
                  dataIndex: 'mailType',
                  column: 'mailTypeStr',
                  filters: [
                    {
                      text: '通知',
                      value: '0',
                    },
                    {
                      text: '消息',
                      value: '1',
                    },
                    {
                      text: '待办',
                      value: '2',
                    },
                  ],
                },
                {
                  title: '标题',
                  width: '18%',
                  dataIndex: 'mailTitle',
                  // isInfo: {
                  //   key: 'mailTitle',
                  //   title: '站内信详情',
                  // },
                  render(text, record) {
                    return (
                      <Info
                        identifying={`${record.id}mail`}
                        title={record.mailTitle}
                        infoUrl={SYS_MAIL_INFO}
                        infoJson={templateOneInfo.infoJson}
                        id={record.id}
                      >
                        {record.mailState === 0 && (
                          <Operation
                            title={record.mailTitle}
                            mode={0}
                            onClick={async () => {
                              await that.read(record.id);
                            }}
                          />
                        )}
                        {record.mailState !== 0 && record.mailTitle}
                      </Info>
                    );
                  },
                },
                {
                  title: '状态',
                  width: '14%',
                  dataIndex: 'mailState',
                  column: 'mailStateStr',
                  filters: [
                    {
                      text: '未读',
                      value: '0',
                    },
                    {
                      text: '已读',
                      value: '1',
                    },
                  ],
                },
                {
                  title: '发送人',
                  width: '14%',
                  dataIndex: 'createBy',
                  column: 'createBy',
                },
                {
                  title: '发送时间',
                  width: '18%',
                  dataIndex: 'createDate',
                  sorter: true,
                },
                {
                  title: '操作',
                  width: '14%',
                  dataIndex: 'opt',
                  render(text, record) {
                    return (
                      <div>
                        <Operation
                          title="删除"
                          mode={0}
                          reminder="确认删除吗？"
                          onClick={async () => {
                            await that.deleteMail(record.id);
                          }}
                        />
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

export default InsideMail;
