import React from 'react';
import { Spin, Button, Icon, Calendar, Tag, Checkbox, Row, Col, notification } from 'antd';
import moment from 'moment';
import { TimePeriodSetList, TechnicianSet, GetDates } from '../Service';

import { getRequest, postRequest } from '@/utils/api';

const styles = require('./AddUp.less');

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
      one: true,
      two: false,
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
          <Icon style={{ fontSize: 40, textAlign: 'center' }} type="check-circle" theme="twoTone" />
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
      one: false,
      two: true,
    });
  };

  lastStep = () => {
    this.setState({
      one: true,
      two: false,
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
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
    this.setState({
      buttonLoading: false,
    });
    this.props.callback();
  };

  render() {
    const { dayArr, one, two, timePeriodSetList, timePeriodArr } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.formWrap}>
          {one && (
            <div>
              <span>选择日期</span>
              <Calendar
                disabledDate={this.disabledDate}
                validRange={[moment(), moment().add(1, 'M')]}
                dateCellRender={this.dateCellRender}
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
          )}
          {two && (
            <div>
              <span>选中的日期</span>
              <div>
                {dayArr.sort().map((day, i) => (
                  <Tag color="#2db7f5" key={i.toString()}>
                    {day}
                  </Tag>
                ))}
              </div>
              <span>选择时间段</span>
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
          )}
          <div className={styles.btnGroup}>
            {one && (
              <Button className={styles.cancelBtn} onClick={this.nextStep} type="primary">
                下一步
              </Button>
            )}
            {two && (
              <Button className={styles.cancelBtn} onClick={this.lastStep} type="primary">
                上一步
              </Button>
            )}
            {two && (
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
