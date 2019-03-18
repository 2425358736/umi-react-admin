import React from 'react';

import Info from '@/components/BusinessComponent/Info/Info';

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '18px',
          right: '100px',
        }}
      >
        <Info identifying="two" title="第二个弹出" info={<div>第二个</div>}>
          点击弹出
        </Info>
      </div>
    );
  }
}

export default Operation;
