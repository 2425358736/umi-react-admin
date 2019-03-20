import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt={401} src={require('../../../../src/assets/404.jpg')} />
      </div>
    );
  }
}
export default Index;
