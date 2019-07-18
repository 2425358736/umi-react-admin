/* eslint-disable react/sort-comp */
import React from 'react';
import { Divider, Spin } from 'antd';
import { connect } from 'dva';
import styles from './TopStatistics.less';

import { getRequest } from '@/utils/api';

@connect(({ screen }) => ({
  screen,
}))
class TopStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      spinning: false,
    };
  }

  request = async () => {
    this.setState({
      spinning: true,
    });
    const data = await getRequest(this.props.sourceUrl);
    if (data.status === 200) {
      this.setState({
        dataSource: data.data,
      });
    }
    this.setState({
      spinning: false,
    });
  };

  screen = null;

  componentWillReceiveProps = nextProps => {
    if (JSON.stringify(nextProps.screen) !== JSON.stringify(this.screen) || nextProps.renovate) {
      this.request();
    }
    this.screen = JSON.parse(JSON.stringify(nextProps.screen));
  };

  render() {
    const {
      screen: { query, queryShow },
      dispatch,
    } = this.props;
    return (
      <Spin spinning={this.state.spinning}>
        <div className={styles.topStatisticsWrap}>
          {this.props.topJson.map((json, i) => {
            const j = i;
            return (
              <div
                key={j}
                onClick={() => {
                  if (json.queryField && json.queryTitle && json.queryValue) {
                    queryShow[json.queryField] = {
                      queryTitle: json.queryTitle,
                      queryValue: json.displayTitle,
                    };
                    query[json.queryField] = json.queryValue;
                    dispatch({
                      type: 'screen/fetch',
                      payload: { query, queryShow },
                    });
                  }
                }}
              >
                <p>{json.displayTitle}</p>
                <span
                  style={{
                    color:
                      json.queryField && json.queryTitle && json.queryValue ? '#1ab393' : '#999',
                    cursor:
                      json.queryField && json.queryTitle && json.queryValue ? 'pointer' : 'default',
                  }}
                >
                  {this.state.dataSource[json.displayField] || 0}
                </span>
                <Divider type="vertical" className={styles.lineDom} />
              </div>
            );
          })}
        </div>
      </Spin>
    );
  }
}

export default TopStatistics;
