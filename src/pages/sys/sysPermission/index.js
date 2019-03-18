/* eslint-disable no-plusplus */
// 系统设置 - 菜单管理
import React from 'react';
import { Tag, Tree, Icon, Divider, Modal, Popconfirm, notification } from 'antd';
import AddUp from './components/AddUp';
import { postRequest } from '@/utils/api';
import { SYS_PER_TREE, SYS_DEL_PER } from '@/services/SysInterface';
import styles from './index.less';

class SysPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perList: [],
      info: null,
      open: false,
      type: null,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    let perList = await postRequest(SYS_PER_TREE);
    perList = perList.data;
    this.setState({
      perList,
    });
    if (this.state.info && this.state.info.id > 0) {
      const info = this.getInfo(perList);
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

  deleteSysPer = async id => {
    const data = await postRequest(`${SYS_DEL_PER}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.initialization();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  recursion(perList, i) {
    const arr = [];
    perList.forEach(per => {
      if (per.parentId === i) {
        arr.push(
          <Tree.TreeNode
            title={
              <Tag
                className={styles.treeNode}
                onClick={() => {
                  this.setState({
                    info: per,
                  });
                }}
              >
                <Icon
                  type={
                    per.perImg
                      ? per.perImg
                      : per.perType === 0
                      ? 'appstore'
                      : per.perType === 1
                      ? 'pic-right'
                      : 'poweroff'
                  }
                />
                &nbsp;&nbsp;
                {per.perName}
              </Tag>
            }
            key={per.id}
          >
            {this.recursion(per.children, per.id)}
          </Tree.TreeNode>
        );
      }
    });
    return arr;
  }

  render() {
    const { info, perList } = this.state;
    return (
      <div className={styles.perWrap}>
        <Modal
          title={this.state.type === 'up' ? '编辑权限' : '添加权限'}
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
                          perName: '菜单结构',
                        },
                      });
                    }}
                  >
                    <Icon type="folder" />
                    &nbsp;&nbsp;菜单结构
                  </Tag>
                }
                key="0"
              >
                {this.recursion(perList, 0)}
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
                    添加下级权限
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
                      修改权限
                    </span>
                  )}
                  {info.id > 0 && (
                    <Popconfirm
                      title="确认删除吗"
                      onConfirm={() => {
                        this.deleteSysPer(info.id);
                      }}
                    >
                      <span className={styles.departBtn}>删除权限</span>
                    </Popconfirm>
                  )}
                </div>
                <div className={styles.departTagWrap}>
                  <Tag>权限名称: {info.perName}</Tag>
                  <Tag>权限标识: {info.permissionCode}</Tag>
                  <Tag>权限类别: {info.perTypeStr}</Tag>
                  <Tag>权限图标: {info.perImg}</Tag>
                  <Tag>权限地址: {info.perUrl}</Tag>
                  <Tag>权限顺序: {info.sort}</Tag>
                  <Tag>父级权限: {info.parentName}</Tag>
                  <Tag>备注: {info.remarks}</Tag>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SysPermission;
