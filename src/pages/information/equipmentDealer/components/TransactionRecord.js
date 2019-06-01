import React from 'react';
import { InfoTable } from '@/components/BusinessComponent/BusCom';
import { Button, Modal } from 'antd';
import { TransactionRecordList } from '@/services/Finance';

import Recharge from './Recharge';

class ScoreRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      renovate: false,
      open: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '历史剩余金额',
          width: '10%',
          dataIndex: 'historicalSurplusAmount',
        },
        {
          title: '历史剩余体验金',
          width: '10%',
          dataIndex: 'historicalExperienceAmount',
        },
        {
          title: '历史冻结金额',
          width: '10%',
          dataIndex: 'historicalFreezingAmount',
        },
        {
          title: '交易类型',
          width: '10%',
          dataIndex: 'transactionType',
          column: 'transactionTypeStr',
          filters: [
            {
              text: '收入',
              value: '0',
            },
            {
              text: '冻结',
              value: '1',
            },
            {
              text: '支出',
              value: '2',
            },
          ],
        },
        {
          title: '交易简述',
          width: '10%',
          dataIndex: 'transactionMode',
          column: 'transactionModeStr',
          filters: [
            {
              text: '线上充值',
              value: '0',
            },
            {
              text: '线下充值',
              value: '1',
            },
            {
              text: '体验金充值',
              value: '2',
            },
            {
              text: '冻结金额',
              value: '3',
            },
            {
              text: '解冻金额',
              value: '4',
            },
            {
              text: '线上提现',
              value: '5',
            },
            {
              text: '线下提现',
              value: '6',
            },
            {
              text: '平台付款',
              value: '7',
            },
          ],
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
          width: '20%',
          dataIndex: 'transactionDescription',
        },
      ],
    });
  };

  add = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="充值"
          style={{ top: 20 }}
          width={500}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
          destroyOnClose
        >
          <Recharge
            callback={async on => {
              this.setState({
                open: false,
              });
              if (on) {
                await this.setState({
                  renovate: true,
                });
                this.props.callback();
                this.setState({
                  renovate: false,
                });
              }
            }}
            equipmentDealerId={this.props.id}
          />
        </Modal>
        <Button onClick={this.add}>充值</Button>
        <InfoTable
          scroll={{ x: 1200 }}
          columns={this.state.columns}
          listUrl={TransactionRecordList}
          additionalData={{ equipmentDealerId: this.props.id }}
          renovate={this.state.renovate}
          expandedRowRender={record => {
            if (record.transactionMode === 7) {
              return (
                <p>
                  收款方：{record.realName}, 订单名称： {record.orderName}, 平台佣金:{' '}
                  {record.platformAcquisitionAmount}, 技工获取金额：{' '}
                  {record.mechanicAcquisitionAmount}
                </p>
              );
            }
            return false;
          }}
        />
      </div>
    );
  }
}

export default ScoreRecord;
