import React from 'react';
import { connect } from 'dva';
import { Icon, Checkbox, Modal, Button } from 'antd';
import { jsonString, exportExcel } from '@/utils/api';

const styles = require('./Export.less');

const CheckboxGroup = Checkbox.Group;

@connect(({ screen }) => ({
  screen,
}))
class ExportButton extends React.Component {
  constructor(props) {
    super(props);
    const checkedList = [];
    const plainOptions = [];
    this.props.columns.forEach(json => {
      plainOptions.push(json.title);
      if (json.export) {
        checkedList.push(json.title);
      }
    });
    this.state = {
      visible: false,
      plainOptions,
      checkedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChange = checkedList => {
    const { plainOptions } = this.state;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    const { plainOptions } = this.state;
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="导出"
          visible={this.state.visible}
          footer={null}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          <div className={styles.formWrap}>
            <div>
              <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  onChange={this.onCheckAllChange}
                  checked={this.state.checkAll}
                >
                  全选/反选
                </Checkbox>
              </div>
              <br />
              <CheckboxGroup
                options={this.state.plainOptions}
                value={this.state.checkedList}
                onChange={this.onChange}
              />
            </div>
            <div className={styles.btnGroup}>
              <Button
                className={styles.submitBtn}
                onClick={() => {
                  const json = JSON.parse(JSON.stringify(this.props.screen));
                  jsonString(json.query);
                  const exportArr = [];
                  this.props.columns.forEach(obj => {
                    this.state.checkedList.forEach(title => {
                      if (obj.title === title) {
                        exportArr.push(obj);
                      }
                    });
                  });
                  json.export = exportArr;
                  exportExcel(this.props.exportUrl, json);
                  this.setState({
                    visible: false,
                  });
                }}
                type="primary"
              >
                导出
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    visible: false,
                  });
                }}
                className={styles.cancelBtn}
              >
                取消
              </Button>
            </div>
          </div>
        </Modal>
        <span
          style={{
            marginLeft: '34px',
            verticalAlign: 'middle',
            fontSize: '16px',
            color: 'rgba(26, 179, 147, 1)',
            cursor: 'pointer',
          }}
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
        >
          <Icon
            style={{ display: 'inline-block', marginRight: '6px', fontSize: '14px', color: '#999' }}
            type="cloud-download"
            key="Icon"
          />
          导出
        </span>
      </div>
    );
  }
}

export default ExportButton;
