import React from 'react';
import { Divider } from 'antd';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { TechnicianArrangeList } from '../Service';

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
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    that.delete(record.id);
                  }}
                >
                  详情
                </a>
              </div>
            );
          },
        },
      ],
    });
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
