import React from 'react';
import { Popconfirm } from 'antd';
import { connect } from 'dva';

@connect(({ screen }) => ({
  screen,
}))
class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  click = async () => {
    if (this.props.onClick) {
      await this.props.onClick();
      const {
        screen: { query, queryShow, pagination, orders },
        dispatch,
      } = this.props;
      if (this.props.mode === 0) {
        dispatch({
          type: 'screen/fetch',
          payload: { query, queryShow, pagination, orders },
        });
      } else if (this.props.mode === 1) {
        dispatch({
          type: 'screen/init',
        });
      }
    }
  };

  render() {
    return (
      <div>
        {!this.props.reminder && <a onClick={this.click}>{this.props.title}</a>}
        {this.props.reminder && (
          <Popconfirm title={this.props.reminder} onConfirm={this.click}>
            <a>{this.props.title}</a>
          </Popconfirm>
        )}
      </div>
    );
  }
}

export default Operation;
