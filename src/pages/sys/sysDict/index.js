import React from 'react';
import DictList from './components/DictList';
import DictType from './components/DictType';
import styles from './index.less';

class SysDict extends React.Component {
  constructor(props) {
    super(props);
    /**
     * dictTypeId 当前选中的数据字典类型id
     * @type {{dictTypeId: number}}
     */
    this.state = {
      dictTypeId: 0,
    };
  }

  /**
   * 行点击事件
   * @param data
   */
  onTypeCall = async id => {
    this.setState({
      dictTypeId: id,
    });
  };

  render() {
    return (
      <div className={styles.dictWrap}>
        <div className={styles.menuLeft}>
          <DictType onTypeCall={this.onTypeCall} />
        </div>
        <div className={styles.menuRight}>
          <DictList dictTypeId={this.state.dictTypeId} />
        </div>
      </div>
    );
  }
}

export default SysDict;
