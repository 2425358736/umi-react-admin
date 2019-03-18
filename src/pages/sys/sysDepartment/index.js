/* eslint-disable no-plusplus */
// 系统设置 - 部门管理
import React from 'react';
import { connect } from 'dva';
import { Tree, Tag, Icon, Divider, Modal, Popconfirm, notification } from 'antd';
import AddUp from './components/AddUp';
import Index from '../sysRole/index';
import { postRequest } from '@/utils/api';
import { SYS_D_TREE, SYS_DEL_D } from '@/services/SysInterface';
import styles from './index.less';

@connect(({ screen }) => ({
  screen,
}))
class sysDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      info: null,
      open: false,
      type: null,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    let departmentList = await postRequest(SYS_D_TREE);
    departmentList = departmentList.data;
    this.setState({
      departmentList,
    });
    if (this.state.info && this.state.info.id > 0) {
      const info = this.getInfo(departmentList);
      this.setState({
        info,
      });
    }
  };

  getInfo = arr => {
    for (let i = 0; i < arr.length; i++) {
      const json = arr[i];
      if (json.id === this.state.info.id) {
        return json;
      }
      if (json.children.length > 0) {
        return this.getInfo(json.children);
      }
    }
    return null;
  };

  refresh = on => {
    this.setState({
      open: false,
      type: null,
    });
    if (on) {
      this.initialization();
    }
  };

  deleteSysDepartment = async id => {
    const data = await postRequest(`${SYS_DEL_D}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.initialization();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  recursion(departmentList, i) {
    const arr = [];
    departmentList.forEach(department => {
      if (department.parentId === i) {
        arr.push(
          <Tree.TreeNode
            title={
              <Tag
                className={styles.treeNode}
                onClick={() => {
                  this.setState({
                    info: department,
                  });
                }}
              >
                {department.departmentName}
              </Tag>
            }
            key={department.id}
          >
            {this.recursion(department.children, department.id)}
          </Tree.TreeNode>
        );
      }
    });
    return arr;
  }

  render() {
    const { info, departmentList } = this.state;
    return (
      <div className={styles.departWrap}>
        <Modal
          title={this.state.type === 'up' ? '编辑部门' : '添加部门'}
          style={{ top: 20 }}
          width={500}
          visible={this.state.open}
          footer={null}
          onCancel={() => {
            this.setState({
              open: false,
            });
          }}
          destroyOnClose
        >
          <AddUp callback={this.refresh} type={this.state.type} info={this.state.info} />
        </Modal>

        <div className={styles.menuCon}>
          <div className={styles.menuLeft}>
            <Tree showLine defaultExpandAll>
              <Tree.TreeNode
                title={
                  <Tag
                    className={styles.treeNode}
                    onClick={() => {
                      this.setState({
                        info: {
                          id: 0,
                          departmentName: '部门结构',
                        },
                      });
                    }}
                  >
                    <Icon type="folder" />
                    &nbsp;&nbsp;部门结构
                  </Tag>
                }
                key="0"
              >
                {this.recursion(departmentList, 0)}
              </Tree.TreeNode>
            </Tree>
          </div>
          <Divider type="vertical" style={{ height: '38em' }} />
          <div className={styles.menuRight}>
            {info && (
              <div>
                <div>
                  <span
                    className={styles.departBtn}
                    onClick={() => {
                      this.setState({
                        open: true,
                        type: 'add',
                      });
                    }}
                  >
                    添加下级部门
                  </span>
                  {info.id > 0 && (
                    <span
                      className={styles.departBtn}
                      onClick={() => {
                        this.setState({
                          open: true,
                          type: 'up',
                        });
                      }}
                    >
                      修改部门
                    </span>
                  )}
                  {info.id > 0 && (
                    <Popconfirm
                      title="确认删除吗"
                      onConfirm={() => {
                        this.deleteSysDepartment(info.id);
                      }}
                    >
                      <span className={styles.departBtn}>删除部门</span>
                    </Popconfirm>
                  )}
                </div>
                <div className={styles.departTagWrap}>
                  <Tag>部门名称: {info.departmentName}</Tag>
                  <Tag>部门编号: {info.departmentNumber}</Tag>
                  <Tag>父级部门: {info.parentName}</Tag>
                  <Tag>备注: {info.remarks}</Tag>
                </div>
                <div>
                  <Index id={this.state.info.id} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default sysDepartment;
