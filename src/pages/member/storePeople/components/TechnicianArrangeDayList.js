import React from 'react';
import { Button, Modal, Divider, notification, Popconfirm, Icon } from 'antd';
import moment from 'moment';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import {
  GetTechnicianArrangeDayId,
  DelTechnicianArrangeDay,
  GetTechnicianArrange,
} from '../Service';

import AddUpTime from './AddUpTime';

import { deleteRequest, getRequest } from '@/utils/api';

import styles from './Detail.less';

class TechnicianArrangeDayList extends React.Component {
  constructor(props) {
    super(props);
    /**
     * renovate 是否刷新列表
     * @type {{columns: Array, renovate: boolean, open: boolean}}
     */
    this.state = {
      InfoData: {},
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

  componentWillMount = async () => {
    const data = await getRequest(`${GetTechnicianArrange}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
      });
    }
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
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>基础信息</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                日期
              </p>
              <p className={styles.cardContent}>
                {moment(InfoData.arrangeDate).format('YYYY-MM-DD')}
              </p>
            </div>
          </div>
        </div>
        <Modal
          title="追加时段"
          style={{ top: 200 }}
          width={300}
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
        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>排班详情</span>
          </div>
          <Button onClick={this.add}>追加时段</Button>
          <InfoTable
            scroll={{ x: 900 }}
            align="center"
            pageSize={15}
            columns={this.state.columns}
            listUrl={GetTechnicianArrangeDayId}
            additionalData={{ arrangeId: this.props.id }}
            renovate={this.state.renovate}
          />
        </div>
      </div>
    );
  }
}

export default TechnicianArrangeDayList;
