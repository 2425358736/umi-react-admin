/* eslint-disable no-param-reassign,react/sort-comp */
import React from 'react';
import { connect } from 'dva';
import { Table, notification, Button } from 'antd';
import { postRequest, getRequest, jsonString } from '@/utils/api';
import styles from './OrdinaryTable.less';

@connect(({ screen, breadcrumb }) => ({
  screen,
  list: breadcrumb.list,
}))
class OrdinaryTable extends React.Component {
  constructor(props) {
    super(props);
    const url = location.pathname;
    const { dispatch } = props;
    dispatch({
      type: 'screen/init',
    });
    this.state = {
      dataSource: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '30', '45'],
        defaultPageSize: 15,
      },
      columns: props.columns,
      loading: false,
      url,
      idArr: [],
      objArr: [],
    };
  }

  componentWillMount = () => {
    this.columnsUp(this.props);
    // this.request(this.props);
  };

  /**
   * 分页 排序 筛选 触发
   * @param paging
   * @param filters
   * @param sorter
   */
  handleTableChange = (paging, filters, sorter) => {
    const {
      screen: { query, queryShow, pagination, orders },
      dispatch,
    } = this.props;
    pagination.current = paging.current;
    pagination.pageSize = paging.pageSize;
    for (const key in filters) {
      if (filters[key]) {
        this.state.columns.forEach(json => {
          if (key === json.dataIndex || key === json.key) {
            const arr = [];
            json.filters.forEach(filtersJson => {
              filters[key].forEach(value => {
                if (filtersJson.value === value) {
                  arr.push(filtersJson.text);
                }
              });
            });

            if (filters[key].length > 0) {
              query[key] = filters[key];
              queryShow[key] = {
                queryTitle: json.title,
                queryValue: arr,
              };
            } else {
              delete queryShow[key];
              delete query[key];
            }
          }
        });
      }
    }

    if (JSON.stringify(sorter) !== '{}') {
      let type = sorter.order;
      type = type.substring(0, type.length - 3);
      Object.assign(orders, { name: sorter.field, type });
    } else {
      delete orders.name;
      delete orders.type;
    }

    dispatch({
      type: 'screen/fetch',
      payload: { query, queryShow, pagination, orders },
    });
  };

  columnsUp = props => {
    const { pagination } = this.state;
    const {
      list,
      screen: { query, orders },
      dispatch,
    } = props;
    const arr = props.columns;

    arr.forEach(json => {
      if (props.align) {
        json.align = props.align;
      }
      if (json.filters) {
        json.filteredValue = query[json.dataIndex] ? query[json.dataIndex] : null;
      }
      if (json.column) {
        if (!json.render) {
          json.render = (text, record) => record[json.column];
        }
      } else {
        json.column = json.dataIndex;
      }
      if (json.isIncrement) {
        json.render = (text, record, index) => {
          let page = (pagination.current - 1) * pagination.pageSize;
          if (isNaN(page)) {
            page = 0;
          }
          return <span>{page + index + 1}</span>;
        };
      }
      if (json.isInfo) {
        json.render = (text, record) => (
          <a
            onClick={() => {
              list.push({
                id: record.id,
                key: json.isInfo.key,
                open: true,
                name: json.isInfo.title,
                fun: () => {
                  console.log(list);
                  list.forEach((obj, i) => {
                    if (obj.key === json.isInfo.key) {
                      list.splice(i + 1, list.length);
                    }
                  });
                  dispatch({
                    type: 'breadcrumb/fetch',
                    payload: { list },
                  });
                },
              });
              dispatch({
                type: 'breadcrumb/fetch',
                payload: { list },
              });
            }}
          >
            {record[json.column]}
          </a>
        );
      }

      if (json.sorter) {
        json.sortOrder = json.dataIndex === orders.name && `${orders.type}end`;
      }
    });
    this.setState({
      columns: arr,
    });
  };

  screen = null;

  componentWillReceiveProps = nextProps => {
    this.columnsUp(nextProps);
    const { pagination } = this.state;
    this.setState({
      pagination: Object.assign(pagination, nextProps.screen.pagination),
    });
    if (JSON.stringify(nextProps.screen) !== JSON.stringify(this.screen) || nextProps.renovate) {
      this.request(nextProps);
    }
    this.screen = JSON.parse(JSON.stringify(nextProps.screen));
  };

  request = async props => {
    this.setState({
      loading: true,
    });
    const json = JSON.parse(JSON.stringify(props.screen));
    jsonString(json.query);
    let data = {};
    if (this.props.method === 'GET') {
      const obj = { ...json.query, ...json.pagination };
      data = await getRequest(props.listUrl, obj);
    } else {
      data = await postRequest(props.listUrl, json);
    }
    if (data.code === 200) {
      const { pagination } = this.state;
      pagination.total = data.total;
      pagination.current = data.current;
      this.setState({
        dataSource: data.data.records,
        pagination,
      });
    } else {
      notification.error({ message: data.msg, description: data.msg });
    }
    this.setState({
      loading: false,
    });
  };

  componentWillUnmount = async () => {
    await localStorage.setItem(this.state.url, JSON.stringify(this.props.screen));
  };

  render() {
    const { operationBlock } = this.props;
    return (
      <div>
        {operationBlock && (
          <div className={styles.optWrap}>
            <span>
              已选择<b>{this.state.idArr.length}</b>项
            </span>
            <div>
              {operationBlock.map((obj, i) => (
                <Button
                  {...obj}
                  className={styles.optBtn}
                  type="primary"
                  key={i.toString()}
                  onClick={() => {
                    obj.onClick(this.state.idArr, this.state.objArr);
                  }}
                >
                  {obj.title}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Table
          scroll={{
            x: 1200,
            y: 'calc(100vh - 252px)',
          }}
          {...this.props}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowSelection={
            operationBlock
              ? {
                  columnWidth: '2%',
                  onChange: (idArr, objArr) => {
                    this.setState({
                      idArr,
                      objArr,
                    });
                  },
                }
              : null
          }
        />
      </div>
    );
  }
}

export default OrdinaryTable;
