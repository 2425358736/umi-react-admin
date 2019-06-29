import React from 'react';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.homeWrap} />;
  }
}

export default Index;
