import React from 'react';
import { Divider, notification, Popconfirm } from 'antd';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';

import TechnicianArrangeDayList from './TechnicianArrangeDayList';

import { deleteRequest } from '@/utils/api';
import { TechnicianArrangeList, DelTechnicianArrange } from '../Service';

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
          title: '日期',
          width: '10%',
          dataIndex: 'arrangeDate',
        },
        {
          title: '排班数量',
          width: '20%',
          dataIndex: 'tatol',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                {record.isAppointment === 0 && (
                  <Popconfirm
                    title="确定删除吗？"
                    onConfirm={() => {
                      that.delete(record.id);
                    }}
                  >
                    <a>删除</a>
                  </Popconfirm>
                )}
                {record.isAppointment === 0 && <Divider type="vertical" />}
                <Info title="排班详情" info={<TechnicianArrangeDayList id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
    });
  };

  delete = async id => {
    const data = await deleteRequest(`${DelTechnicianArrange}?id=${id}`);
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

  render() {
    return (
      <div>
        <InfoTable
          align="center"
          scroll={{ x: 900 }}
          columns={this.state.columns}
          listUrl={TechnicianArrangeList}
          additionalData={{ sysUserId: this.props.sysUserId }}
          renovate={this.state.renovate}
        />
      </div>
    );
  }
}

export default ScoreRecord;
