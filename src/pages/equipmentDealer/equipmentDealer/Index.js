import React from 'react';

import {
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
  Info,
  ScreeningTag,
} from '@/components/BusinessComponent/BusCom';

import styles from './index.less';

import Details from './components/Details';

import { DealerList, DealerListTop } from '@/services/EquipmentDealer';

const topStatistics = {
  topJson: [
    {
      displayTitle: '总共',
      displayField: 'total',
    },
    {
      displayTitle: '待审核',
      displayField: 'uncertified',
      queryTitle: '审核状态',
      queryField: 'attestationState',
      queryValue: ['0'],
    },
    {
      displayTitle: '已审核',
      displayField: 'certified',
      queryTitle: '审核状态',
      queryField: 'attestationState',
      queryValue: ['1'],
    },
  ],
};

const search = {
  ordinary: {
    queryTitle: '设备商名称',
    queryField: 'leadingCadreName',
  },
  senior: [
    {
      queryTitle: '法人姓名',
      queryField: 'legalPersonName',
      component: 'Input',
    },
    {
      queryTitle: '负责人',
      queryField: 'leadingCadreName',
      component: 'Input',
    },
    {
      queryTitle: '负责人电话',
      queryField: 'leadingCadrePhone',
      component: 'Input',
    },
    {
      queryTitle: '认证日期始',
      queryField: 'attestationDateStart',
      component: 'DatePicker',
    },
    {
      queryTitle: '认证日期止',
      queryField: 'attestationDateEnd',
      component: 'DatePicker',
    },
  ],
};

const exportButton = {
  columns: [
    {
      title: '序号',
      column: 'id',
      export: true,
    },
    {
      title: '登录名',
      column: 'loginName',
      export: true,
    },
    {
      title: '邮箱',
      column: 'email',
      export: true,
    },
    {
      title: '手机',
      column: 'phone',
      export: true,
    },
    {
      title: '创建日期',
      column: 'createDate',
    },
    {
      title: '修改日期',
      column: 'updateDate',
    },
    {
      title: '冻结状态',
      column: 'freezeStateStr',
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

  columnsUp = () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '10%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '设备厂商名称',
          width: '15%',
          dataIndex: 'equipmentDealerCompany',
        },
        {
          title: '法人姓名',
          width: '10%',
          dataIndex: 'legalPersonName',
        },
        {
          title: '负责人姓名',
          width: '10%',
          dataIndex: 'leadingCadreName',
        },
        {
          title: '负责人手机号',
          width: '10%',
          dataIndex: 'leadingCadrePhone',
        },
        {
          title: '审核状态',
          width: '10%',
          dataIndex: 'attestationState',
          column: 'attestationStateStr',
          filters: [
            {
              text: '未审核',
              value: '0',
            },
            {
              text: '已审核',
              value: '1',
            },
          ],
        },
        {
          title: '信用分数',
          width: '10%',
          dataIndex: 'currentScore',
        },
        {
          title: '认证日期',
          width: '15%',
          dataIndex: 'attestationDate',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="设备商" info={<Details id={record.id} />}>
                  详情
                </Info>
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
          <TopStatistics sourceUrl={DealerListTop} topJson={topStatistics.topJson} />
          <div className={styles.screenTag}>
            <Search
              ordinary={search.ordinary}
              senior={search.senior}
              operationBlock={[
                <ExportButton key="2" exportUrl={DealerList} columns={exportButton.columns} />,
              ]}
            />
            <ScreeningTag />
          </div>
          <div className={styles.tableWrap}>
            <div>
              <OrdinaryTable listUrl={DealerList} columns={this.state.columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
