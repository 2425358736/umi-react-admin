import React from 'react';
import { Popconfirm, Divider, notification, Modal, Table, Button } from 'antd';
import { postRequest } from '@/utils/api';
import AddUp from './components/AddUp';
import { POSITION_LIST, DEL_POSITION } from '@/services/member';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
      loading: false,
      open: false,
      id: 0,
    };
  }

  componentWillMount = () => {
    this.init();
  };

  init = () => {
    const that = this;
    this.getDataSource(this.props.id);
    this.setState({
      columns: [
        {
          title: '岗位名称',
          dataIndex: 'positionName',
        },
        {
          title: '岗位编号',
          dataIndex: 'positionNumber',
        },
        {
          title: '创建日期',
          dataIndex: 'createDate',
        },
        {
          title: '操作',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <a onClick={() => that.edit(record.id)}>编辑</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="确定删除吗?"
                  onConfirm={() => {
                    that.delete(record.id);
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

  componentWillReceiveProps = nextProps => {
    this.getDataSource(nextProps.id);
  };

  getDataSource = async departmentId => {
    this.setState({
      loading: true,
    });
    const data = await postRequest(`${POSITION_LIST}/${departmentId}`);
    if (data.status === 200) {
      this.setState({
        dataSource: data.data,
      });
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
    this.setState({
      loading: false,
    });
  };

  delete = async id => {
    const data = await postRequest(`${DEL_POSITION}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.getDataSource(this.props.id);
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  edit = id => {
    this.setState({
      open: true,
      id,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title={this.state.id > 0 ? '编辑岗位' : '添加岗位'}
          style={{ top: 20 }}
          width={800}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
              id: 0,
            });
          }}
          destroyOnClose
        >
          <AddUp
            callback={on => {
              this.setState({
                open: false,
                id: 0,
              });
              if (on) {
                this.getDataSource(this.props.id);
              }
            }}
            id={this.state.id}
            departmentId={this.props.id}
          />
        </Modal>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '20px 0 10px' }}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                open: true,
                id: 0,
              });
            }}
          >
            添加岗位
          </Button>
        </div>
        <Table
          rowKey="id"
          loading={this.state.loading}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}

export default Index;
