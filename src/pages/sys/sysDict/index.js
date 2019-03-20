import React from 'react';
import DictList from './components/DictList';
import DictType from './components/DictType';
import styles from './index.less';

class SysDict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.dictWrap}>
        <div className={styles.menuLeft}>
          <DictType />
        </div>
        <div className={styles.menuRight}>
          <DictList />
        </div>
      </div>
    );
  }
}

export default SysDict;
