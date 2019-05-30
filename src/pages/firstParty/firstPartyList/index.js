import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import AddUp from './components/AddUp';
import MemberDetail from './components/MemberDetail';
import { FIRST_PARTY_HEAD, FIRST_PARTY_LIST } from '@/services/FirstPartyInterface';
import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Add,
  Up,
  Info,
  Search,
  ExportButton,
} from '@/components/BusinessComponent/BusCom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BaseTable
          isTop={
            <TopStatistics
              sourceUrl={FIRST_PARTY_HEAD}
              topJson={[
                {
                  displayTitle: '总计',
                  displayField: 'allNum',
                },
              ]}
            />
          }
          search={
            <Search
              ordinary={{
                queryTitle: '甲方名称',
                queryField: 'factoryName',
              }}
              senior={[
                {
                  queryTitle: '创建日期',
                  queryField: 'updateDate',
                  component: 'RangePicker',
                },
                {
                  queryTitle: '名称首字母',
                  queryField: 'factoryInitials',
                  component: 'Input',
                },
                {
                  queryTitle: '甲方地址',
                  queryField: 'specificLocation',
                  component: 'Input',
                },
              ]}
              operationBlock={[
                <Add key="1" width={800} title="添加甲方" component={AddUp} />,
                <ExportButton
                  key="2"
                  exportUrl={FIRST_PARTY_LIST}
                  columns={[
                    {
                      title: '序号',
                      column: 'id',
                    },
                    {
                      title: '甲方名称',
                      column: 'factoryName',
                    },
                    {
                      title: '名称首字母',
                      column: 'factoryInitials',
                    },
                    {
                      title: '经度',
                      column: 'longitude',
                    },
                    {
                      title: '纬度',
                      column: 'latitude',
                    },
                    {
                      title: '地址',
                      column: 'specificLocation',
                    },
                    {
                      title: '创建时间',
                      column: 'createDate',
                    },
                  ]}
                />,
              ]}
            />
          }
          table={
            <OrdinaryTable
              scroll={{
                x: 1000,
                y: 'calc(100vh - 252px)',
              }}
              listUrl={FIRST_PARTY_LIST}
              // isExport
              columns={[
                {
                  title: '序号',
                  width: '5%',
                  dataIndex: 'id',
                  isIncrement: true,
                },
                {
                  title: '甲方名称',
                  width: '15%',
                  dataIndex: 'factoryName',
                },
                {
                  title: '名称首字母',
                  width: '10%',
                  dataIndex: 'factoryInitials',
                },
                {
                  title: '经度',
                  width: '10%',
                  dataIndex: 'longitude',
                },
                {
                  title: '纬度',
                  width: '10%',
                  dataIndex: 'latitude',
                },
                {
                  title: '地址',
                  width: '25%',
                  dataIndex: 'specificLocation',
                },
                {
                  title: '创建时间',
                  width: '15%',
                  dataIndex: 'createDate',
                },
                {
                  title: '操作',
                  width: '10%',
                  dataIndex: 'opt',
                  render(text, record) {
                    const opRecord = (
                      <Menu>
                        <Menu.Item>
                          <Up width={800} id={record.id} component={AddUp} title="编辑" />
                        </Menu.Item>
                        <Menu.Item>
                          <Info title="甲方信息详情" info={<MemberDetail id={record.id} />}>
                            详情
                          </Info>
                        </Menu.Item>
                      </Menu>
                    );
                    return (
                      <div>
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
              ]}
            />
          }
        />
      </div>
    );
  }
}

export default Index;
