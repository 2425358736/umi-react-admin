import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import styles from './index.less';

@connect(({ screen }) => ({
  screen,
}))
class Up extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  callback = on => {
    this.setState({
      open: false,
    });
    if (on) {
      const {
        screen: { query, queryShow, pagination, orders },
        dispatch,
      } = this.props;
      dispatch({
        type: 'screen/fetch',
        payload: { query, queryShow, pagination, orders },
      });
    }
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <a
          onClick={() => {
            this.setState({
              open: true,
            });
          }}
        >
          {this.props.title}
        </a>
        <Modal
          title={this.props.title}
          style={{ top: 20 }}
          width={500}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
          destroyOnClose
          {...this.props}
        >
          {this.props.component && (
            <this.props.component callback={this.callback} {...this.props} />
          )}
        </Modal>
      </div>
    );
  }
}

export default Up;
