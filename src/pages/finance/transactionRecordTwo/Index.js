import React from 'react';
import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  ScreeningTag,
  Operation,
} from '@/components/BusinessComponent/BusCom';

import { notification } from 'antd';

import { postRequest } from '@/utils/api';

import styles from './index.less';

import {
  TransactionRecordListTwo,
  TransactionRecordListTopTwo,
  PaymentReimbursement,
} from '@/services/Finance';

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
    queryTitle: '设备商名称',
    queryField: 'equipmentDealerCompany',
  },
  senior: [
    {
      queryTitle: '交易日期起',
      queryField: 'createDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '交易日期止',
      queryField: 'createDateEnd',
      component: 'DatePicker',
    },
  ],
};

const exportButton = {
  columns: [
    {
      title: '历史剩余金额',
      column: 'historicalSurplusAmount',
    },
    {
      title: '历史剩余体验金',
      column: 'historicalExperienceAmount',
    },
    {
      title: '历史冻结金额',
      column: 'historicalFreezingAmount',
    },
    {
      title: '交易类型',
      column: 'transactionTypeStr',
    },
    {
      title: '交易简述',
      column: 'transactionModeStr',
    },
    {
      title: '交易金额',
      column: 'transactionAmount',
    },
    {
      title: '交易日期',
      column: 'createDate',
    },
    {
      title: '交易描述',
      column: 'transactionDescription',
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

  delete = async id => {
    const data = await postRequest(`${PaymentReimbursement}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.getDataSource(this.props.id);
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
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
          title: '交易类型',
          width: '10%',
          dataIndex: 'transactionType',
          column: 'transactionTypeStr',
          // filters: [
          //   {
          //     text: '收入',
          //     value: '0',
          //   },
          //   {
          //     text: '冻结',
          //     value: '1',
          //   },
          //   {
          //     text: '支出',
          //     value: '2',
          //   },
          // ],
        },
        {
          title: '交易简述',
          width: '10%',
          dataIndex: 'transactionMode',
          column: 'transactionModeStr',
          // filters: [
          //   {
          //     text: '线上充值',
          //     value: '0',
          //   },
          //   {
          //     text: '线下充值',
          //     value: '1',
          //   },
          //   {
          //     text: '体验金充值',
          //     value: '2',
          //   },
          //   {
          //     text: '冻结金额',
          //     value: '3',
          //   },
          //   {
          //     text: '解冻金额',
          //     value: '4',
          //   },
          //   {
          //     text: '线上提现',
          //     value: '5',
          //   },
          //   {
          //     text: '线下提现',
          //     value: '6',
          //   },
          //   {
          //     text: '平台付款',
          //     value: '7',
          //   },
          // ],
        },
        {
          title: '交易金额',
          width: '10%',
          dataIndex: 'transactionAmount',
        },
        {
          title: '交易日期',
          width: '15%',
          dataIndex: 'createDate',
        },
        {
          title: '交易描述',
          width: '40%',
          dataIndex: 'transactionDescription',
        },
        {
          title: '操作',
          dataIndex: 'opt',
          width: '10%',
          render(text, record) {
            return (
              <div>
                <Operation
                  title="补单"
                  mode={0}
                  reminder="确认补单吗？"
                  onClick={async () => {
                    that.delete(record.id);
                  }}
                />
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <TopStatistics sourceUrl={TransactionRecordListTopTwo} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton
                  key="2"
                  exportUrl={TransactionRecordListTwo}
                  columns={exportButton.columns}
                />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable
                scroll={{
                  x: 1200,
                  y: 'calc(100vh - 252px)',
                }}
                listUrl={TransactionRecordListTwo}
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
