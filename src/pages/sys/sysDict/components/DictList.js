import React from 'react';
import { Spin, Table, Modal, Popconfirm, Divider, Icon, notification } from 'antd';
import { postRequest } from '@/utils/api';
import AddList from './AddList';
import styles from './Add.less';

class DictList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [],
      record: {},
      loading: false,
      isOpen: false,
    };
  }

  componentDidMount = async () => {
    this.columnsUp();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      loading: true,
    });
    if (nextProps.dataSource) {
      this.setState({ dataSource: nextProps.dataSource });
    }
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  };

  /**
   * 添加编辑
   * @param record
   */
  addDict = async record => {
    this.setState({
      record,
      isOpen: true,
    });
  };

  /**
   * 删除
   * @param id
   */
  deleteDict = async id => {
    const data = await postRequest('/sys/upSysDict', {
      id,
      delFlag: 1,
    });
    if (data.status === 200) {
      this.componentDidMount();
      notification.success({ message: data.msg });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  /**
   * 添加回调
   * @param type
   */
  addCall = type => {
    this.setState({ isOpen: false });
    if (type === 'refresh') {
      this.componentDidMount();
    }
  };

  /**
   * 更新表头
   * @returns {*}
   */
  columnsUp = () => {
    const that = this;
    this.setState({
      columns: [
        {
          title: '序号',
          width: '9%',
          dataIndex: 'id2',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '字典展示',
          width: '14%',
          dataIndex: 'dataLabel',
        },
        {
          title: '排序',
          width: '14%',
          dataIndex: 'sort',
        },
        {
          title: '字典值',
          width: '12%',
          dataIndex: 'id',
        },
        {
          title: '描述',
          width: '12%',
          dataIndex: 'description',
        },
        {
          title: '操作',
          width: '15%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <a onClick={that.addDict.bind(this, record)}>编辑</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="确认删除吗"
                  onConfirm={() => {
                    that.deleteDict(record.id);
                  }}
                >
                  <a>删除</a>
                </Popconfirm>
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.dictListWrap}>
          <h2>
            <span className={styles.titlePrefix} />
            数据字典
            <span className={styles.addBtn} onClick={this.addDict}>
              <Icon className={styles.iconDom} type="plus-circle" key="Icon" />
              添加
            </span>
          </h2>
          <Modal
            title="添加"
            width={800}
            visible={this.state.isOpen}
            footer={null}
            onCancel={() => {
              this.setState({
                isOpen: false,
              });
            }}
            destroyOnClose
          >
            <AddList record={this.state.record} callback={this.addCall} />
          </Modal>
        </div>

        <div>
          <Table
            rowKey="id"
            pagination={false}
            columns={this.state.columns}
            dataSource={dataSource}
          />
        </div>
      </Spin>
    );
  }
}

export default DictList;
