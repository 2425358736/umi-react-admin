import React from 'react';
import { Button, Modal, Divider, notification } from 'antd';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { ChargeProjectList, DelChargeProject } from '../Service';

import AddUpScoreRecord from './AddUpScoreRecord';

import { deleteRequest } from '@/utils/api';

class ScoreRecord extends React.Component {
  constructor(props) {
    super(props);
    /**
     * renovate 是否刷新列表
     * @type {{columns: Array, renovate: boolean, open: boolean}}
     */
    this.state = {
      columns: [],
      renovate: false,
      open: false,
      id: 0,
    };
  }

  componentDidMount = async () => {
    const that = this;
    this.setState({
      columns: [
        {
          title: '序号',
          width: '10%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '类型',
          width: '10%',
          dataIndex: 'typeStr',
        },
        {
          title: '名称',
          width: '20%',
          dataIndex: 'chargeProjectName',
        },
        {
          title: '描述',
          width: '25%',
          dataIndex: 'describe',
        },
        {
          title: '价格',
          width: '20%',
          dataIndex: 'price',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <a
                  onClick={() => {
                    that.setState({
                      open: true,
                      id: record.id,
                    });
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    that.delete(record.id);
                  }}
                >
                  删除
                </a>
              </div>
            );
          },
        },
      ],
    });
  };

  delete = async id => {
    const data = await deleteRequest(`${DelChargeProject}?id=${id}`);
    if (data.status === 200) {
      await this.setState({
        renovate: true,
      });
      this.setState({
        renovate: false,
      });
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
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
          title="添加费项"
          style={{ top: 20 }}
          width={500}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              id: 0,
              open: false,
            });
          }}
          destroyOnClose
        >
          <AddUpScoreRecord
            id={this.state.id}
            storeId={this.props.id}
            callback={async on => {
              this.setState({
                open: false,
                id: 0,
              });
              if (on) {
                await this.setState({
                  renovate: true,
                });
                this.setState({
                  renovate: false,
                });
              }
            }}
          />
        </Modal>
        <Button onClick={this.add}>添加费项</Button>
        <InfoTable
          scroll={{ x: 900 }}
          align="center"
          columns={this.state.columns}
          listUrl={ChargeProjectList}
          additionalData={{ storeId: this.props.id }}
          renovate={this.state.renovate}
        />
      </div>
    );
  }
}

export default ScoreRecord;
