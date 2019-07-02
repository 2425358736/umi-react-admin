import React from 'react';
import { connect } from 'dva';
import { Input, DatePicker, Select, Cascader } from 'antd';
import moment from 'moment';
import styles from './Search.less';

const SearchB = Input.Search;

@connect(({ screen }) => ({
  screen,
}))
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.screen.query,
      dataShow: props.screen.queryShow,
      isOpen: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      data: nextProps.screen.query,
      dataShow: nextProps.screen.queryShow,
    });
  };

  render() {
    const {
      screen: { queryShow, query },
      dispatch,
    } = this.props;

    return (
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
                const { data, dataShow } = this.state;
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
              onSearch={() => {
                Object.assign(query, this.state.data);
                Object.assign(queryShow, this.state.dataShow);
                dispatch({
                  type: 'screen/fetch',
                  payload: { query, queryShow },
                });
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
                            const { data, dataShow } = this.state;
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
                  if (json.component === 'Cascader' || !json.component) {
                    return (
                      <div key={j}>
                        <span>{json.queryTitle}:</span>
                        <Cascader
                          style={{ textAlign: '-webkit-auto' }}
                          className={styles.inputDom}
                          value={
                            this.state.data[json.queryField] ? this.state.data[json.queryField] : []
                          }
                          options={json.componentData || []}
                          placeholder={`请选择${json.queryTitle}`}
                          changeOnSelect
                          onChange={(value, selectedOptions) => {
                            const { data, dataShow } = this.state;
                            const text = [];
                            selectedOptions.forEach(obj => {
                              text.push(obj.label);
                            });
                            if (value.length > 0) {
                              data[json.queryField] = value;
                              dataShow[json.queryField] = {
                                queryTitle: json.queryTitle,
                                queryValue: text,
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
                            const { data, dataShow } = this.state;
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
                            this.state.data[json.queryField] ? this.state.data[json.queryField] : []
                          }
                          onChange={(value, objectArr) => {
                            const { data, dataShow } = this.state;
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
                            const { data, dataShow } = this.state;
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

                            const { data, dataShow } = this.state;
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
    );
  }
}

export default Search;
