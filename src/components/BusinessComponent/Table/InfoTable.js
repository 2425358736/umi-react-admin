import React from 'react';
import { Input, DatePicker, Select, Icon, Tag, Table, notification } from 'antd';
import moment from 'moment';
import { postRequest, jsonString } from '@/utils/api';
import styles from './InfoTable.less';

const SearchB = Input.Search;

class InfoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalData: props.additionalData || {},
      data: {},
      dataShow: {},
      pagination: {
        current: 1,
        pageSize: props.pageSize ? props.pageSize : 5,
      },
      query: {},
      queryShow: {},
      orders: props.orders || {
        name: 'a.id',
        type: 'desc',
      },
      columns: props.columns || [],
      paginationTable: props.paginationTable || {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15'],
        defaultPageSize: props.pageSize ? props.pageSize : 5,
      },
      loading: false,
      listUrl: props.listUrl || null,
    };
  }

  componentDidMount = () => {
    this.columnsUp();
    this.request();
  };

  componentWillReceiveProps = async nextProps => {
    if (nextProps.renovate) {
      this.request();
    }
    await this.setState({
      columns: nextProps.columns,
    });
    this.columnsUp();
  };

  columnsUp = () => {
    const { pagination, query, orders, columns } = this.state;
    const arr = columns;
    const { align } = this.props;
    arr.forEach((json, i) => {
      if (align) {
        arr[i].align = align;
      }
      if (json.filters) {
        arr[i].filteredValue = query[json.dataIndex] ? query[json.dataIndex] : null;
      }
      if (json.column) {
        if (!json.render) {
          arr[i].render = (text, record) => record[json.column];
        }
      } else {
        arr[i].column = json.dataIndex;
      }
      if (json.isIncrement) {
        arr[i].render = (text, record, index) => {
          let page = (pagination.current - 1) * pagination.pageSize;
          if (isNaN(page)) {
            page = 0;
          }
          return <span>{page + index + 1}</span>;
        };
      }

      if (json.sorter) {
        arr[i].sortOrder = json.dataIndex === orders.name && `${orders.type}end`;
      }
    });
    this.setState({
      columns: arr,
    });
  };

  /**
   * 分页 排序 筛选 触发
   * @param paging
   * @param filters
   * @param sorter
   */
  handleTableChange = async (paging, filters, sorter) => {
    const { query, queryShow, pagination, orders, data, dataShow } = this.state;
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
              data[key] = filters[key];
              queryShow[key] = {
                queryTitle: json.title,
                queryValue: arr,
              };
              dataShow[key] = {
                queryTitle: json.title,
                queryValue: arr,
              };
            } else {
              delete queryShow[key];
              delete query[key];
              delete data[key];
              delete dataShow[key];
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

    await this.setState({
      query,
      queryShow,
      pagination,
      orders,
      data,
      dataShow,
    });
    this.columnsUp();
    this.request();
  };

  request = async () => {
    const {
      listUrl,
      pagination,
      query,
      queryShow,
      orders,
      additionalData,
      paginationTable,
    } = this.state;
    if (listUrl) {
      this.setState({
        loading: true,
      });
      Object.assign(query, additionalData);
      const screen = {
        pagination,
        query,
        queryShow,
        orders,
      };
      const json = JSON.parse(JSON.stringify(screen));
      jsonString(json.query);
      const data = await postRequest(listUrl, json);
      if (data.status === 200) {
        paginationTable.total = data.data.total;
        paginationTable.current = data.data.pageNum;
        this.setState({
          dataSource: data.data.list,
          paginationTable,
        });
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
      this.setState({
        loading: false,
      });
    } else {
      notification.error({ message: '组件初始化错误', description: 'listUrlurl未赋值' });
    }
  };

  ergodic = () => {
    const { queryShow, query, dataShow, data } = this.state;
    const arr = [];
    for (const key in queryShow) {
      const json = queryShow[key];
      if (json !== null && json.queryValue.length > 0)
        arr.push(
          <Tag
            key={key}
            closable
            onClose={async () => {
              delete queryShow[key];
              delete query[key];
              delete data[key];
              delete dataShow[key];
              await this.setState({
                query,
                queryShow,
                data,
                dataShow,
              });
              this.columnsUp();
              this.request();
            }}
          >
            {json.queryTitle}:{' '}
            {json.queryValue.constructor === Array ? json.queryValue.toString() : json.queryValue}
          </Tag>
        );
    }
    return arr;
  };

  head = () => {
    const { queryShow } = this.state;

    if (JSON.stringify(queryShow) !== '{}') {
      return true;
    }
    return false;
  };

  render() {
    const { query, queryShow, data, dataShow } = this.state;
    return (
      <div className={styles.infoTableWrap}>
        <div className={styles.screenTag}>
          <div className={styles.searchWrap}>
            {// 普通搜索
            this.props.ordinary && (
              <span>
                <SearchB
                  style={{ width: 266, marginBottom: '10px' }}
                  placeholder={`请输入${this.props.ordinary.queryTitle}`}
                  value={this.state.data[this.props.ordinary.queryField]}
                  onChange={e => {
                    const { value } = e.target;
                    if (value.length > 0) {
                      data[this.props.ordinary.queryField] = value;

                      dataShow[this.props.ordinary.queryField] = {
                        queryTitle: this.props.ordinary.queryTitle,
                        queryValue: value,
                      };
                    } else {
                      delete data[this.props.ordinary.queryField];
                      delete dataShow[this.props.ordinary.queryField];
                    }
                    this.setState({
                      data,
                      dataShow,
                    });
                  }}
                  onSearch={async () => {
                    Object.assign(query, data);
                    Object.assign(queryShow, dataShow);
                    await this.setState({
                      query,
                      queryShow,
                    });
                    this.request();
                  }}
                  enterButton
                />
              </span>
            )}{' '}
            {this.props.senior && (
              <span
                className={styles.highSearchBtn}
                style={{ color: this.state.isOpen ? '#f56c6c' : '#1ab393' }}
                onClick={() => {
                  const { isOpen } = this.state;
                  this.setState({
                    isOpen: !isOpen,
                  });
                }}
              >
                高级搜索
              </span>
            )}
            <div className={styles.btnGroup}>
              {this.props.operationBlock && this.props.operationBlock.map(obj => obj)}
            </div>
            {this.props.senior && (
              // 高级搜索
              <div>
                {this.state.isOpen && (
                  <div className={styles.highSearchWrap}>
                    {this.props.senior.map((json, i) => {
                      const j = i;
                      if (json.component === 'Input' || !json.component) {
                        return (
                          <div key={j}>
                            <span>{json.queryTitle}:</span>
                            <Input
                              className={styles.inputDom}
                              placeholder="请输入"
                              value={this.state.data[json.queryField]}
                              onChange={e => {
                                const { value } = e.target;
                                if (value.length > 0) {
                                  data[json.queryField] = value;

                                  dataShow[json.queryField] = {
                                    queryTitle: json.queryTitle,
                                    queryValue: value,
                                  };
                                } else {
                                  delete data[json.queryField];
                                  delete dataShow[json.queryField];
                                }
                                this.setState({
                                  data,
                                  dataShow,
                                });
                              }}
                            />
                          </div>
                        );
                      }
                      if (json.component === 'DatePicker') {
                        return (
                          <div key={j}>
                            <span>{json.queryTitle}:</span>
                            <DatePicker
                              className={styles.inputDom}
                              placeholder="请选择"
                              value={
                                this.state.data[json.queryField]
                                  ? moment(this.state.data[json.queryField])
                                  : null
                              }
                              onChange={(date, dateString) => {
                                const value = dateString;
                                if (value.length > 0) {
                                  data[json.queryField] = value;

                                  dataShow[json.queryField] = {
                                    queryTitle: json.queryTitle,
                                    queryValue: value,
                                  };
                                } else {
                                  delete data[json.queryField];
                                  delete dataShow[json.queryField];
                                }
                                this.setState({
                                  data,
                                  dataShow,
                                });
                              }}
                            />
                          </div>
                        );
                      }

                      if (json.component === 'Select-Multiple') {
                        return (
                          <div key={j}>
                            <span>{json.queryTitle}:</span>
                            <Select
                              className={styles.inputDom}
                              placeholder="请选择"
                              mode="multiple"
                              value={
                                this.state.data[json.queryField]
                                  ? this.state.data[json.queryField]
                                  : []
                              }
                              onChange={(value, objectArr) => {
                                if (value.length > 0) {
                                  data[json.queryField] = value;

                                  const arr = [];
                                  objectArr.forEach(object => {
                                    arr.push(object.props.children);
                                  });
                                  dataShow[json.queryField] = {
                                    queryTitle: json.queryTitle,
                                    queryValue: arr,
                                  };
                                } else {
                                  delete data[json.queryField];
                                  delete dataShow[json.queryField];
                                }
                                this.setState({
                                  data,
                                  dataShow,
                                });
                              }}
                            >
                              {json.componentData.map((jsonData, z) => {
                                const x = z;
                                return (
                                  <Select.Option key={x} value={jsonData.value}>
                                    {jsonData.title}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </div>
                        );
                      }

                      if (json.component === 'Select') {
                        return (
                          <div key={j}>
                            <span>{json.queryTitle}:</span>
                            <Select
                              className={styles.inputDom}
                              placeholder="请选择"
                              value={
                                this.state.data[json.queryField]
                                  ? this.state.data[json.queryField]
                                  : null
                              }
                              onChange={(value, object) => {
                                if (value.length > 0) {
                                  data[json.queryField] = value;

                                  dataShow[json.queryField] = {
                                    queryTitle: json.queryTitle,
                                    queryValue: object.props.children,
                                  };
                                } else {
                                  delete data[json.queryField];
                                  delete dataShow[json.queryField];
                                }
                                this.setState({
                                  data,
                                  dataShow,
                                });
                              }}
                            >
                              {json.componentData.map((jsonData, z) => {
                                const x = z;
                                return (
                                  <Select.Option key={x} value={jsonData.value}>
                                    {jsonData.title}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </div>
                        );
                      }

                      if (json.component === 'RangePicker') {
                        return (
                          <div key={j}>
                            <span>{json.queryTitle}:</span>
                            <DatePicker.RangePicker
                              className={styles.inputDom}
                              value={
                                this.state.data[json.queryField]
                                  ? [
                                      moment(this.state.data[json.queryField][0]),
                                      moment(this.state.data[json.queryField][1]),
                                    ]
                                  : null
                              }
                              placeholder="请选择"
                              onChange={(date, dateString) => {
                                const value = dateString;
                                if (value.length > 0) {
                                  data[json.queryField] = value;

                                  dataShow[json.queryField] = {
                                    queryTitle: json.queryTitle,
                                    queryValue: value,
                                  };
                                } else {
                                  delete data[json.queryField];
                                  delete dataShow[json.queryField];
                                }
                                this.setState({
                                  data,
                                  dataShow,
                                });
                              }}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ background: '#fff' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>{this.head() && '检索项： '}</span>
            {this.ergodic()}
            {this.head() && (
              <a
                onClick={async () => {
                  await this.setState({
                    query: {},
                    queryShow: {},
                    data: {},
                    dataShow: {},
                  });
                  this.columnsUp();
                  this.request();
                }}
              >
                <Icon
                  type="delete"
                  theme="filled"
                  key="Icon"
                  style={{ color: '#999', verticalAlign: 'middle' }}
                />
              </a>
            )}
          </div>
        </div>
        <div className={styles.tableWrap}>
          <div>
            <div>
              <Table
                {...this.props}
                rowKey="id"
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                pagination={this.state.paginationTable}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                rowSelection={
                  this.props.selectCallback
                    ? {
                        columnWidth: '2%',
                        onChange: (idArr, objArr) => {
                          this.props.selectCallback(idArr, objArr);
                        },
                      }
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoTable;
