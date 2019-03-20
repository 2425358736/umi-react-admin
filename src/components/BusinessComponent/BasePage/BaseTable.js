import React from 'react';
import { connect } from 'dva';
import styles from './BaseTable.less';

import ScreeningTag from '../ScreeningTags/ScreeningTag';

@connect(({ screen }) => ({
  screen,
}))
class BaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    return (
      <div className={styles.baseTableWrap}>
        {this.state.isTop && this.state.isTop}
        <div className={styles.screenTag}>
          {this.state.search && this.state.search}
          <ScreeningTag />
        </div>
        <div className={styles.tableWrap}>
          <div>{this.state.table && this.state.table}</div>
        </div>
        {this.state.info && this.state.info}
      </div>
    );
  }
}

export default BaseTable;
