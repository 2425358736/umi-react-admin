import React from 'react';
import { InfoTable } from '@/components/BusinessComponent/BusCom';
import { Button, Modal } from 'antd';
import { ScoreRecordList } from '@/services/WxScoreRecord';

import AddScoreRecord from './AddScoreRecord';

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
          width: '10%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '描述',
          width: '50%',
          dataIndex: 'scoringDescription',
        },
        {
          title: '历史分数',
          width: '10%',
          dataIndex: 'historicalScore',
        },
        {
          title: '变更分数',
          width: '10%',
          dataIndex: 'operationScore',
        },
        {
          title: '变更日期',
          width: '20%',
          dataIndex: 'createDate',
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
          title="添加评分"
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
          <AddScoreRecord
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
            wxId={this.props.id}
            historicalScore={this.props.historicalScore}
          />
        </Modal>
        <Button onClick={this.add}>添加评分</Button>
        <InfoTable
          scroll={{ x: 900 }}
          columns={this.state.columns}
          listUrl={ScoreRecordList}
          additionalData={{ wxId: this.props.id }}
          renovate={this.state.renovate}
        />
      </div>
    );
  }
}

export default ScoreRecord;
