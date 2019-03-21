import React from 'react';
import { notification } from 'antd';

import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Add,
  Operation,
  Info,
} from '@/components/BusinessComponent/BusCom';

import SendMsg from './components/SendMsg';
import SendInfo from './components/SendInfo';

import styles from './index.less';

import { postRequest } from '@/utils/api';

import { SYS_RECORD_TOP, SYS_LIST_INFO, SYS_WITHDRAW_INFO } from '@/services/SysInterface';

const topStatistics = {
  topJson: [
    {
      displayTitle: '已发送',
      displayField: 'alreadySent',
      queryTitle: '消息状态',
      queryField: 'informationState',
      queryValue: ['0'],
    },
    {
      displayTitle: '已撤回',
      displayField: 'noSend',
      queryTitle: '消息状态',
      queryField: 'informationState',
      queryValue: ['2'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '标题',
    queryField: 'informationTitle',
  },
  senior: [
    {
      queryTitle: '消息状态',
      queryField: 'informationState',
      component: 'Select',
      componentData: [{ value: '0', title: '已发送' }, { value: '2', title: '已撤回' }],
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
      title: '发送方式',
      column: 'informationChannelStr',
    },
    {
      title: '消息类型',
      column: 'informationTypeStr',
    },
    {
      title: '标题',
      column: 'informationTitle',
    },
    {
      title: '内容',
      column: 'informationContent',
    },
    {
      title: '消息状态',
      column: 'informationStateStr',
    },
    {
      title: '发送时间',
      column: 'createDate',
    },
  ],
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * 撤回
   * @param id
   */

  withDraw = async id => {
    const data = await postRequest(`${SYS_WITHDRAW_INFO}/${id}`);
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
          isTop={<TopStatistics sourceUrl={SYS_RECORD_TOP} topJson={topStatistics.topJson} />}
          search={
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <Add key="1" title="发送消息" component={SendMsg} />,
                <ExportButton key="2" exportUrl={SYS_LIST_INFO} columns={exportButton.columns} />,
              ]}
            />
          }
          table={
            <OrdinaryTable
              listUrl={SYS_LIST_INFO}
              // isExport
              columns={[
                {
                  title: '序号',
                  width: '6%',
                  dataIndex: 'id',
                  isIncrement: true,
                },
                {
                  title: '发送方式',
                  width: '16%',
                  dataIndex: 'informationChannel',
                  column: 'informationChannelStr',
                  filters: [
                    {
                      text: '站内信',
                      value: '0',
                    },
                    {
                      text: '短信',
                      value: '1',
                    },
                    {
                      text: '微信',
                      value: '2',
                    },
                    {
                      text: '移动端推送',
                      value: '3',
                    },
                  ],
                },
                {
                  title: '消息类型',
                  width: '16%',
                  dataIndex: 'informationType',
                  column: 'informationTypeStr',
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
                  width: '20%',
                  dataIndex: 'informationTitle',
                  render(text, record) {
                    return (
                      <Info title={record.informationTitle} info={<SendInfo id={record.id} />}>
                        {record.informationTitle}
                      </Info>
                    );
                  },
                },
                {
                  title: '消息状态',
                  width: '16%',
                  dataIndex: 'informationState',
                  column: 'informationStateStr',
                },
                {
                  title: '发送时间',
                  width: '12%',
                  dataIndex: 'createDate',
                  sorter: true,
                },
                {
                  title: '操作',
                  width: '12%',
                  dataIndex: 'opt',
                  render(text, record) {
                    return (
                      <div>
                        {record.informationState === 0 && (
                          <Operation
                            title="撤回"
                            mode={0}
                            reminder="确认撤回吗？"
                            onClick={async () => {
                              await that.withDraw(record.id);
                            }}
                          />
                        )}
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
