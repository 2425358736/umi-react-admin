import React from 'react';
import { Divider, notification } from 'antd';

import {
  OrdinaryTable,
  Search,
  ExportButton,
  Add,
  Up,
  Operation,
  ScreeningTag,
} from '@/components/BusinessComponent/BusCom';

import AddUp from './components/AddUp';

import styles from './index.less';

import { deleteRequest } from '@/utils/api';

import { CommissionRateList, DelCommissionRate } from '@/services/Order';

const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
      export: true,
    },
    {
      title: '起始金额',
      column: 'amountStart',
      export: true,
    },
    {
      title: '结束金额',
      column: 'amountEnd',
      export: true,
    },
    {
      title: '佣金比例（%）',
      column: 'proportion',
      export: true,
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
    this.columnsUp([]);
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
          title: '起始金额',
          width: '10%',
          dataIndex: 'amountStart',
        },
        {
          title: '结束金额',
          width: '10%',
          dataIndex: 'amountEnd',
        },

        {
          title: '佣金比例（%）',
          width: '10%',
          dataIndex: 'proportion',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Up width={800} id={record.id} component={AddUp} title="编辑佣金比例规则" />
                <Divider type="vertical" />
                <Operation
                  title="删除"
                  mode={0}
                  reminder="此操作将会删除，确认操作吗？"
                  onClick={async () => {
                    await that.delete(record.id);
                  }}
                />
              </div>
            );
          },
        },
      ],
    });
  };

  componentDidMount = async () => {
    this.columnsUp();
  };

  delete = async id => {
    const data = await deleteRequest(`${DelCommissionRate}?id=${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <div className={styles.screenTag}>
            <Search
              ordinary={{
                queryTitle: '佣金比例',
                queryField: 'proportion',
              }}
              operationBlock={[
                <Add key="1" width={800} title="添加佣金比例规则" component={AddUp} />,
                <ExportButton
                  key="2"
                  exportUrl={CommissionRateList}
                  columns={exportButton.columns}
                />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable listUrl={CommissionRateList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
