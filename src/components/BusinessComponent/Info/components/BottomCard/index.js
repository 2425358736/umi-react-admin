import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

class BottomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15'],
        defaultPageSize: 5,
      },
      columns: [
        {
          title: '序号',
          width: '4%',
          dataIndex: 'id',
          column: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '订货单号',
          width: '11%',
          dataIndex: 'orderNum',
        },
        {
          title: '状态',
          width: '6%',
          dataIndex: 'orderState',
          render(text) {
            return text === 0
              ? '待审核'
              : text === 1
              ? '待发货'
              : text === 2
              ? '待收货'
              : text === 3
              ? '完成'
              : '作废';
          },
        },
        {
          title: '操作',
          width: '5%',
          dataIndex: 'opt',
          render() {
            return (
              <div>
                <a>作废</a>
              </div>
            );
          },
        },
      ],
      dataSource: [],
    };
  }

  render() {
    return (
      <div className={styles.bottomWrap}>
        <div className={styles.bottomTitle}>
          <span />
          <span>发送记录</span>
        </div>
        <div>
          <Table
            // scroll={{ x: 1500 }}
            rowKey="id"
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}

export default BottomCard;
