import React from 'react';
import { Popconfirm, Button } from 'antd';
import { connect } from 'dva';

import styles from './Operation.less';

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
        const code = Math.round(Math.random() * 999999999);
        dispatch({
          type: 'screen/fetch',
          payload: { query, queryShow, pagination, orders, code },
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
      <span>
        {this.props.isBtn ? (
          <Button
            type={this.props.btnType === 'submit' ? 'primary' : ''}
            className={this.props.btnType === 'submit' ? styles.submitBtn : styles.cancelBtn}
            loading={this.props.buttonLoading}
            onClick={this.click}
          >
            {this.props.title}
          </Button>
        ) : (
          <div>
            {!this.props.reminder && <a onClick={this.click}>{this.props.title}</a>}
            {this.props.reminder && (
              <Popconfirm title={this.props.reminder} onConfirm={this.click}>
                <a>{this.props.title}</a>
              </Popconfirm>
            )}
          </div>
        )}
      </span>
    );
  }
}

export default Operation;
