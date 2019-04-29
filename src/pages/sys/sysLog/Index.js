import React from 'react';
import {
  BaseTable,
  OrdinaryTable,
  TopStatistics,
  Search,
  ExportButton,
} from '@/components/BusinessComponent/BusCom';

import { SYS_LOG_TOTAL, SYS_LOG_LIST } from '@/services/SysInterface';

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
              sourceUrl={SYS_LOG_TOTAL}
              topJson={[
                {
                  displayTitle: 'GET',
                  displayField: 'GET',
                  queryTitle: '请求方式',
                  queryField: 'method',
                  queryValue: '1',
                },
                {
                  displayTitle: 'POST',
                  displayField: 'POST',
                  queryTitle: '请求方式',
                  queryField: 'method',
                  queryValue: '0',
                },
                {
                  displayTitle: '查询',
                  displayField: 'query',
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  queryValue: ['0'],
                },
                {
                  displayTitle: '新增',
                  displayField: 'add',
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  queryValue: ['1'],
                },
                {
                  displayTitle: '修改',
                  displayField: 'up',
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  queryValue: ['2'],
                },
                {
                  displayTitle: '删除',
                  displayField: 'del',
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  queryValue: ['3'],
                },
                {
                  displayTitle: '其他',
                  displayField: 'other',
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  queryValue: ['4'],
                },
              ]}
            />
          }
          search={
            <Search
              ordinary={{
                queryTitle: '接口描述',
                queryField: 'interfaceDescription',
              }}
              senior={[
                {
                  queryTitle: '创建日期',
                  queryField: 'updateDate',
                  component: 'RangePicker',
                },
                {
                  queryTitle: '请求方式',
                  queryField: 'method',
                  component: 'Select',
                  componentData: [
                    { value: '0', title: 'POST' },
                    { value: '1', title: 'GET' },
                    { value: '2', title: 'PUT ' },
                    { value: '3', title: '其他' },
                  ],
                },
                {
                  queryTitle: '接口类型',
                  queryField: 'interfaceType',
                  component: 'Select-Multiple',
                  componentData: [
                    { value: '0', title: '查询' },
                    { value: '1', title: '添加' },
                    { value: '2', title: '修改' },
                    { value: '3', title: '删除' },
                    { value: '4', title: '替他' },
                  ],
                },
              ]}
              operationBlock={[
                <ExportButton
                  key="2"
                  exportUrl={SYS_LOG_LIST}
                  columns={[
                    {
                      title: '序号',
                      column: 'id',
                    },
                    {
                      title: '访问人',
                      column: 'fullName',
                    },
                    {
                      title: '访问地址ip',
                      column: 'ip',
                    },
                    {
                      title: '访问接口',
                      column: 'url',
                    },
                    {
                      title: '访问方式',
                      column: 'methodStr',
                    },
                    {
                      title: '接口类型',
                      column: 'methodStr',
                    },
                    {
                      title: '接口描述',
                      column: 'interfaceDescription',
                    },
                    {
                      title: '接口所在服务端',
                      column: 'serverSideStr',
                    },
                  ]}
                />,
              ]}
            />
          }
          table={
            <OrdinaryTable
              scroll={{
                x: 1600,
                y: 'calc(100vh - 252px)',
              }}
              listUrl={SYS_LOG_LIST}
              // isExport
              columns={[
                {
                  title: '序号',
                  width: '5%',
                  dataIndex: 'id',
                  isIncrement: true,
                },
                {
                  title: '访问人',
                  width: '8%',
                  dataIndex: 'fullName',
                },
                {
                  title: '访问地址ip',
                  width: '10%',
                  dataIndex: 'ip',
                },
                {
                  title: '访问接口',
                  width: '20%',
                  dataIndex: 'url',
                  render(text) {
                    return <span style={{ wordBreak: 'break-all' }}>{text}</span>;
                  },
                },
                {
                  title: '访问方式',
                  width: '10%',
                  dataIndex: 'methodStr',
                },
                {
                  title: '访问时间',
                  width: '12%',
                  dataIndex: 'createDate',
                },
                {
                  title: '接口类型',
                  width: '10%',
                  dataIndex: 'interfaceTypeStr',
                },
                {
                  title: '接口描述',
                  width: '10%',
                  dataIndex: 'interfaceDescription',
                },
                {
                  title: '接口所在服务端',
                  width: '10%',
                  dataIndex: 'serverSide',
                  column: 'serverSideStr',
                  filters: [
                    { text: 'pc', value: '0' },
                    { text: 'app', value: '1' },
                    { text: '微信', value: '2' },
                  ],
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
