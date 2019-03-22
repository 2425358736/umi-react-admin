import React from 'react';
import { Menu, Divider, Dropdown, Icon } from 'antd';
import { postRequest } from '@/utils/api';

import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Search,
  Info,
  Up,
} from '@/components/BusinessComponent/BusCom';

import HouseholdDetail from './components/HouseholdDetail';
import AddMemberApply from './components/AddMemberApply';
import SubMemberApply from './components/SubMemberApply';
import DeleteApply from './components/DeleteApply';

import styles from './index.less';

import { HOUSEHOLD_LIST_HEADER, HOUSEHOLD_LIST, SYS_Dict } from '@/services/SysInterface';

const topStatistics = {
  topJson: [],
};

const search = {
  ordinary: {
    queryTitle: '户主姓名',
    queryField: 'householderName',
  },
  senior: [
    {
      queryTitle: '户号',
      queryField: 'householdRegisterNumber',
      component: 'Input',
    },
    {
      queryTitle: '编号',
      queryField: 'householdNumber',
      component: 'Input',
    },
    {
      queryTitle: '身份证号',
      queryField: 'householderNumber',
      component: 'Input',
    },
    {
      queryTitle: '住址',
      queryField: 'homeAddress',
      component: 'Input',
    },
  ],
};

class Household extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentWillMount = async () => {
    // 大队列表
    const arr = [];
    const arr1 = [
      {
        displayTitle: '总共',
        displayField: 'name0',
      },
    ];
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      queueArr.data.forEach(item => {
        arr.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
        arr1.push({
          displayTitle: item.dataLabel,
          displayField: `name${item.id}`,
          queryTitle: '大队',
          queryField: 'troops',
          queryValue: [item.id.toString()],
        });
      });
    }
    topStatistics.topJson = arr1;

    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '编号',
          width: '10%',
          dataIndex: 'householdNumber',
        },
        {
          title: '大队',
          width: '10%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '户主',
          width: '10%',
          dataIndex: 'householderName',
        },
        {
          title: '身份证号',
          width: '10%',
          dataIndex: 'householderNumber',
        },
        {
          title: '户别',
          width: '10%',
          dataIndex: 'householdType',
          column: 'householdTypeStr',
          filters: [
            {
              text: '家庭户',
              value: '0',
            },
            {
              text: '集体户',
              value: '1',
            },
          ],
        },
        {
          title: '户号',
          width: '10%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '住址',
          width: '12%',
          dataIndex: 'homeAddress',
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'householdStatus',
          column: 'householdStatusStr',
          filters: [
            {
              text: '正常',
              value: '0',
            },
            {
              text: '注销',
              value: '1',
            },
          ],
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'opt',
          render(text, record) {
            const opRecord = (
              <Menu>
                <Menu.Item>
                  <Up width={800} id={record.id} component={AddMemberApply} title="增员" />
                </Menu.Item>
                <Menu.Item>
                  <Up width={800} id={record.id} component={SubMemberApply} title="减员" />
                </Menu.Item>
                <Menu.Item>
                  <Up width={800} id={record.id} component={DeleteApply} title="注销" />
                </Menu.Item>
              </Menu>
            );
            return (
              <div>
                <Info title="户口簿详情" info={<HouseholdDetail id={record.id} />}>
                  详情
                </Info>
                <Divider type="vertical" />
                <Dropdown overlay={opRecord} placement="bottomLeft">
                  <Icon
                    type="ellipsis"
                    style={{ paddingTop: '10px', fontSize: 14, color: '#1ab393' }}
                  />
                </Dropdown>
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
        {this.state.columns.length > 0 && (
          <BaseTable
            isTop={
              <TopStatistics sourceUrl={HOUSEHOLD_LIST_HEADER} topJson={topStatistics.topJson} />
            }
            search={<Search ordinary={search.ordinary} senior={search.senior} />}
            table={<OrdinaryTable listUrl={HOUSEHOLD_LIST} columns={this.state.columns} />}
          />
        )}
      </div>
    );
  }
}

export default Household;
