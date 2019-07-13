import React from 'react';
import { Spin, Button, Icon, Calendar, Tag, Checkbox, Row, Col, notification, Tabs } from 'antd';
import moment from 'moment';
import { TimePeriodSetList, TechnicianSet, GetDates } from '../Service';

import { getRequest, postRequest } from '@/utils/api';

const styles = require('./AddUp.less');

const { TabPane } = Tabs;

class Schedul extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      loading: false,
      dayArr: [],
      timePeriodSetList: [],
      timePeriodArr: [],
      disabledDate: [],
      activeKey: '1',
    };
  }

  componentDidMount() {
    this.getTimePeriodSetList();
    this.getDates();
  }

  getDates = async () => {
    const data = await getRequest(`${GetDates}?list=${this.props.personnel}`);
    this.setState({
      disabledDate: data.data,
    });
  };

  getTimePeriodSetList = async () => {
    const timePeriodSetList = await getRequest(
      `${TimePeriodSetList}?storeId=${this.props.storeId}`
    );
    this.setState({
      timePeriodSetList: timePeriodSetList.data,
    });
  };

  dateCellRender = value => {
    if (this.state.dayArr.indexOf(value.format('YYYY-MM-DD')) >= 0) {
      return (
        <div>
          <Icon style={{ fontSize: 30, display: 'block' }} type="check-circle" theme="twoTone" />
        </div>
      );
    }
    return null;
  };

  disabledDate = value => {
    const { disabledDate } = this.state;
    console.log(moment(value).format('YYYY-MM-DD'));
    if (disabledDate.indexOf(moment(value).format('YYYY-MM-DD')) >= 0) {
      return true;
    }
    return false;
  };

  nextStep = () => {
    this.setState({
      activeKey: '2',
    });
  };

  lastStep = () => {
    this.setState({
      activeKey: '1',
    });
  };

  submit = async () => {
    this.setState({
      buttonLoading: true,
    });
    const { dayArr, timePeriodArr } = this.state;
    const { personnel } = this.props;
    const data = await postRequest(TechnicianSet, { dayArr, timePeriodArr, personnel });
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.props.callback();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
    this.setState({
      buttonLoading: false,
    });
  };

  render() {
    const { dayArr, timePeriodSetList, timePeriodArr, activeKey } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          <Tabs tabBarGutter={480} activeKey={activeKey}>
            <TabPane tab="选择日期" key="1">
              <div>
                <Calendar
                  disabledDate={this.disabledDate}
                  validRange={[moment(), moment().add(1, 'M')]}
                  dateFullCellRender={date => (
                    <div className="ant-fullcalendar-date" style={{ height: '70px' }}>
                      <div className="ant-fullcalendar-value">{date.format('D')}</div>
                      <div className="ant-fullcalendar-content">{this.dateCellRender(date)}</div>
                    </div>
                  )}
                  onSelect={date => {
                    const xb = dayArr.indexOf(date.format('YYYY-MM-DD'));
                    if (xb >= 0) {
                      dayArr.splice(xb, 1);
                    } else {
                      dayArr.push(date.format('YYYY-MM-DD'));
                    }
                    this.setState({
                      dayArr,
                    });
                    console.log(dayArr);
                  }}
                />
              </div>
            </TabPane>
            <TabPane tab="选择时间" key="2">
              <div>
                <span>选中的日期</span>
                <div>
                  {dayArr.sort().map((day, i) => (
                    <Tag style={{ display: 'inline-table' }} color="#2db7f5" key={i.toString()}>
                      {day}
                    </Tag>
                  ))}
                </div>
                <div>
                  <Checkbox.Group
                    value={timePeriodArr}
                    onChange={checkedValue => {
                      this.setState({
                        timePeriodArr: checkedValue,
                      });
                    }}
                    style={{ width: '100%' }}
                  >
                    <span>上午：</span>
                    <Row>
                      {timePeriodSetList.map(json => {
                        if (json.timeGroup === 0 && json.isOpen === 0) {
                          return (
                            <Col key={json.id.toString()} span={8}>
                              <Checkbox value={json.id}>
                                {json.startDate}~{json.endDate}
                              </Checkbox>
                            </Col>
                          );
                        }
                        return null;
                      })}
                    </Row>
                    <span>下午：</span>
                    <Row>
                      {timePeriodSetList.map(json => {
                        if (json.timeGroup === 1 && json.isOpen === 0) {
                          return (
                            <Col key={json.id.toString()} span={8}>
                              <Checkbox value={json.id}>
                                {json.startDate}~{json.endDate}
                              </Checkbox>
                            </Col>
                          );
                        }
                        return null;
                      })}
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div className={styles.btnGroup}>
            {activeKey === '1' && (
              <Button className={styles.cancelBtn} onClick={this.nextStep} type="primary">
                下一步
              </Button>
            )}
            {activeKey === '2' && (
              <Button className={styles.cancelBtn} onClick={this.lastStep} type="primary">
                上一步
              </Button>
            )}
            {activeKey === '2' && (
              <Button
                style={{ marginLeft: '10px' }}
                className={styles.submitBtn}
                onClick={this.submit}
                type="primary"
                loading={this.state.buttonLoading}
              >
                保存
              </Button>
            )}
            <Button
              onClick={() => {
                this.props.callback();
              }}
              className={styles.cancelBtn}
            >
              取消
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Schedul;
