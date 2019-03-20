import React from 'react';
import { Spin, Table, Modal, Popconfirm, Divider, Icon, notification } from 'antd';
import { postRequest } from '@/utils/api';
import AddList from './AddType';
import styles from './Add.less';

class DictType extends React.Component {
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
    this.setState({
      loading: true,
    });
    this.columnsUp();
    // 查询信息
    const data = await postRequest('/sys/sysDictTypeList');
    this.setState({
      dataSource: data.data,
      loading: false,
    });
  };

  /**
   * 添加编辑
   * @param record
   */
  addType = async record => {
    this.setState({
      record,
      isOpen: true,
    });
  };

  /**
   * 行点击时间
   * @param id
   */
  onRowClick = async id => {
    const data = await postRequest(`/sys/sysDictListType/${id}`);
    if (data.status === 200) {
      this.componentDidMount();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  /**
   * 删除
   * @param id
   */
  deleteType = async id => {
    const data = await postRequest('/sys/upSysDictType', {
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
          width: '6%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '类型标题',
          width: '12%',
          dataIndex: 'typeTitle',
        },
        {
          title: '类型编号',
          width: '14%',
          dataIndex: 'typeCode',
        },
        {
          title: '类型说明',
          width: '12%',
          dataIndex: 'typeSpecification',
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <a onClick={that.addType.bind(this, record)}>编辑</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="确认删除吗"
                  onConfirm={() => {
                    that.deleteType(record.id);
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
    const that = this;
    const { dataSource } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.dictListWrap}>
          <h2>
            <span className={styles.titlePrefix} />
            数据字典类型
            <span className={styles.addBtn} onClick={this.addType}>
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
              this.setState({ isOpen: false });
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
            dataSource={dataSource || []}
            onRow={record => ({
              onClick: async () => {
                that.onRowClick(record.id);
              },
            })}
          />
        </div>
      </Spin>
    );
  }
}

export default DictType;
