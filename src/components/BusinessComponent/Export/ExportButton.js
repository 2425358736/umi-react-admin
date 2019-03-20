import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { jsonString, exportExcel } from '@/utils/api';

@connect(({ screen }) => ({
  screen,
}))
class ExportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span
        style={{
          marginLeft: '34px',
          verticalAlign: 'middle',
          fontSize: '16px',
          color: 'rgba(26, 179, 147, 1)',
          cursor: 'pointer',
        }}
        onClick={() => {
          const json = JSON.parse(JSON.stringify(this.props.screen));
          jsonString(json.query);
          json.export = this.props.columns;
          exportExcel(this.props.exportUrl, json);
        }}
      >
        <Icon
          style={{ display: 'inline-block', marginRight: '6px', fontSize: '14px', color: '#999' }}
          type="cloud-download"
          key="Icon"
        />
        导出
      </span>
    );
  }
}

export default ExportButton;
