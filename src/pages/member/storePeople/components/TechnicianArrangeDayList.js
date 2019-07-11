import React from 'react';
import { Button, Modal, Divider, notification, Popconfirm } from 'antd';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { GetTechnicianArrangeDayId, DelTechnicianArrangeDay } from '../Service';

import AddUpTime from './AddUpTime';

import { deleteRequest } from '@/utils/api';

class TechnicianArrangeDayList extends React.Component {
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
          title: '预约状态',
          width: '20%',
          dataIndex: 'isAppointmentStr',
        },
        {
          title: '开始时间',
          width: '25%',
          dataIndex: 'startDate',
        },
        {
          title: '结束时间',
          width: '25%',
          dataIndex: 'endDate',
        },
        {
          title: '操作',
          width: '20%',
          dataIndex: 'opt',
          render(text, record) {
            if (record.isAppointment === 0) {
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
                  <Popconfirm
                    title="确定删除吗？"
                    onConfirm={() => {
                      that.delete(record.id);
                    }}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </div>
              );
            }
            return null;
          },
        },
      ],
    });
  };

  delete = async id => {
    const data = await deleteRequest(`${DelTechnicianArrangeDay}?id=${id}`);
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
          title="追加时段"
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
          <AddUpTime
            id={this.state.id}
            arrangeId={this.props.id}
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
        <Button onClick={this.add}>追加时段</Button>
        <InfoTable
          scroll={{ x: 900 }}
          pageSize={15}
          columns={this.state.columns}
          listUrl={GetTechnicianArrangeDayId}
          additionalData={{ arrangeId: this.props.id }}
          renovate={this.state.renovate}
        />
      </div>
    );
  }
}

export default TechnicianArrangeDayList;
