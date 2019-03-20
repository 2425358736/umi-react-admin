import React from 'react';
import DictList from './components/DictList';
import DictType from './components/DictType';
import styles from './index.less';

class SysDict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  /**
   * 行点击事件
   * @param data
   */
  onTypeCall = async data => {
    this.setState({ data });
  };

  render() {
    return (
      <div className={styles.dictWrap}>
        <div className={styles.menuLeft}>
          <DictType onTypeCall={this.onTypeCall} />
        </div>
        <div className={styles.menuRight}>
          <DictList dataSource={this.state.data} />
        </div>
      </div>
    );
  }
}

export default SysDict;
