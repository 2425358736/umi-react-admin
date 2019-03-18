import React from 'react';
import styles from './index.less';

class MidCardOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {
        title: '使用条件',
        arr: [
          { title: '产品分类', date: '2019-01-01' },
          { title: '产品分类', date: '2019-01-01' },
          { title: '产品分类', date: '2019-01-01' },
          { title: '产品分类', date: '2019-01-01' },
          { title: '产品分类', date: '2019-01-01' },
          { title: '产品分类', date: '2019-01-01' },
        ],
      },
    };
  }

  render() {
    return (
      <div className={styles.midOneWrap}>
        <div className={styles.midOneLeft}>
          <div className={styles.midOneTitle}>
            <span />
            <span>{this.state.json.title}</span>
          </div>
          <div className={styles.conWrap}>
            {this.state.json.arr.map((item, index) => {
              const i = index;
              return (
                <div className={styles.itemDom} key={i}>
                  <span>{item.title}</span>
                  <p>{item.date}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.midOneRight}>
          <div className={styles.midOneTitle}>
            <span />
            <span>{this.state.json.title}</span>
          </div>
          <ol className={styles.olDom}>
            {this.state.json.arr.map((item, index) => {
              const i = index;
              return (
                <li key={i}>
                  <span>
                    {item.title}:{item.date}
                  </span>
                  <span>
                    {item.title}:{item.date}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default MidCardOne;
