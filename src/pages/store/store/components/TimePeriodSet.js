import React from 'react';
import { Spin, Button, Form, TimePicker, Switch, Row, Col, notification } from 'antd';
import moment from 'moment';
import { TimePeriodSetList, UpTimePeriodSetAll } from '../Service';

import { getRequest, postRequest } from '@/utils/api';

const styles = require('./AddUp.less');

class TimePeriodSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: true,
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      loading: true,
    });
    const data = await getRequest(`${TimePeriodSetList}?storeId=${this.props.storeId}`);
    this.setState({
      data: data.data,
      loading: false,
    });
  };

  render() {
    const { disabled, data } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          <span>上午：</span>
          <Row gutter={16}>
            {data.map((json, i) => {
              if (json.timeGroup === 0) {
                return (
                  <Col className="gutter-row" span={8} key={json.id}>
                    <TimePicker
                      onChange={(time, timeString) => {
                        data[i].startDate = timeString;
                        this.setState({
                          data,
                        });
                      }}
                      disabled={disabled}
                      value={moment(json.startDate, 'HH:mm:ss')}
                      style={{ width: '100px' }}
                    />
                    ~
                    <TimePicker
                      onChange={(time, timeString) => {
                        data[i].endDate = timeString;
                        this.setState({
                          data,
                        });
                      }}
                      disabled={disabled}
                      value={moment(json.endDate, 'HH:mm:ss')}
                      style={{ width: '100px' }}
                    />
                    <Switch
                      onChange={checked => {
                        if (checked) {
                          data[i].isOpen = 0;
                        } else {
                          data[i].isOpen = 1;
                        }
                        this.setState({
                          data,
                        });
                      }}
                      checkedChildren="开"
                      unCheckedChildren="关"
                      checked={json.isOpen === 0}
                      disabled={disabled}
                    />
                  </Col>
                );
              }
              return null;
            })}
          </Row>

          <span>下午：</span>
          <Row gutter={16}>
            {data.map((json, i) => {
              if (json.timeGroup === 1) {
                return (
                  <Col className="gutter-row" span={8} key={json.id}>
                    <TimePicker
                      onChange={(time, timeString) => {
                        data[i].startDate = timeString;
                        this.setState({
                          data,
                        });
                      }}
                      disabled={disabled}
                      value={moment(json.startDate, 'HH:mm:ss')}
                      style={{ width: '100px' }}
                    />
                    ~
                    <TimePicker
                      onChange={(time, timeString) => {
                        data[i].endDate = timeString;
                        this.setState({
                          data,
                        });
                      }}
                      disabled={disabled}
                      value={moment(json.endDate, 'HH:mm:ss')}
                      style={{ width: '100px' }}
                    />
                    <Switch
                      onChange={checked => {
                        if (checked) {
                          data[i].isOpen = 0;
                        } else {
                          data[i].isOpen = 1;
                        }
                        this.setState({
                          data,
                        });
                      }}
                      checkedChildren="开"
                      unCheckedChildren="关"
                      checked={json.isOpen === 0}
                      disabled={disabled}
                    />
                  </Col>
                );
              }
              return null;
            })}
          </Row>

          <div className={styles.btnGroup}>
            {disabled && (
              <Button
                className={styles.submitBtn}
                type="primary"
                onClick={() => {
                  this.setState({
                    disabled: false,
                  });
                }}
              >
                编辑
              </Button>
            )}
            {!disabled && (
              <Button
                disabled={disabled}
                onClick={async () => {
                  const res = await postRequest(UpTimePeriodSetAll, { list: data });
                  if (res.status === 200) {
                    notification.success({ message: res.msg });
                    this.getData();
                    this.setState({
                      disabled: true,
                    });
                  } else {
                    notification.error({ message: res.msg, description: res.subMsg });
                  }
                }}
                className={styles.cancelBtn}
              >
                保存
              </Button>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}

const TimePeriodSetComponent = Form.create()(TimePeriodSet);

export default TimePeriodSetComponent;
