/* eslint-disable guard-for-in */
import React from 'react';
import { connect } from 'dva';
import { Tag, Icon } from 'antd';

@connect(({ screen }) => ({
  screen,
}))
class ScreeningTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ergodic = () => {
    const {
      screen: { queryShow, query },
      dispatch,
    } = this.props;
    const arr = [];
    for (const key in queryShow) {
      const json = queryShow[key];
      if (json !== null && json.queryValue.length > 0)
        arr.push(
          <Tag
            key={key}
            closable
            onClose={() => {
              delete queryShow[key];
              delete query[key];
              dispatch({
                type: 'screen/fetch',
                payload: { queryShow, query },
              });
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
    const {
      screen: { queryShow },
    } = this.props;

    if (JSON.stringify(queryShow) !== '{}') {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div style={{ background: '#fff' }}>
        <span style={{ fontSize: '14px', color: '#333' }}>{this.head() && '检索项： '}</span>
        {this.ergodic()}
        {this.head() && (
          <a
            onClick={() => {
              const { dispatch } = this.props;
              const queryShow = {};
              const query = {};
              dispatch({
                type: 'screen/fetch',
                payload: { queryShow, query },
              });
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
    );
  }
}

export default ScreeningTag;
