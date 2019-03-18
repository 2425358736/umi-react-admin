import React from 'react';
import { connect } from 'dva';
import { Modal, Icon } from 'antd';
import styles from './index.less';

@connect(({ screen }) => ({
  screen,
}))
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  callback = () => {
    this.setState({
      open: false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'screen/init',
    });
  };

  render() {
    return (
      <div className={styles.sysUserWrap}>
        <span
          className={styles.addBtn}
          key="1"
          onClick={() => {
            this.setState({
              open: true,
            });
          }}
        >
          <Icon className={styles.iconDom} type="plus-circle" key="Icon" />
          {this.props.title}
        </span>
        <Modal
          title={this.props.title}
          style={{ top: 20 }}
          width={800}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
          destroyOnClose
        >
          {this.props.component && (
            <this.props.component callback={this.callback} {...this.props} />
          )}
        </Modal>
      </div>
    );
  }
}

export default Add;
