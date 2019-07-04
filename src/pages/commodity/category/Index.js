/* eslint-disable no-plusplus */
// 系统设置 - 菜单管理
import React from 'react';
import { Tag, Tree, Icon, Divider, Modal, Popconfirm, notification, Spin } from 'antd';
import AddUp from './components/AddUp';
import { getRequest, deleteRequest } from '@/utils/api';
import { CommodityCategoryListTree, DelCommodityCategory } from './Service';
import styles from './Index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perList: [],
      info: null,
      open: false,
      type: null,
      spinning: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  initialization = async () => {
    this.setState({
      spinning: true,
    });
    let perList = await getRequest(CommodityCategoryListTree);
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
    this.setState({
      spinning: false,
    });
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
    const data = await deleteRequest(`${DelCommodityCategory}?id=${id}`);
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
                {per.categoryName}
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
          title={this.state.type === 'up' ? '编辑产品分类' : '添加产品分类'}
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
          <Spin spinning={this.state.spinning}>
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
                            categoryName: '产品分类',
                          },
                        });
                      }}
                    >
                      <Icon type="folder" />
                      &nbsp;&nbsp;产品分类
                    </Tag>
                  }
                  key="0"
                >
                  {this.recursion(perList, 0)}
                </Tree.TreeNode>
              </Tree>
            </div>
          </Spin>
          <Divider type="vertical" style={{ height: '36em' }} />
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
                    添加下级分类
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
                      修改分类
                    </span>
                  )}
                  {info.id > 0 && (
                    <Popconfirm
                      title="确认删除吗"
                      onConfirm={() => {
                        this.deleteSysPer(info.id);
                      }}
                    >
                      <span className={styles.departBtn}>删除分类</span>
                    </Popconfirm>
                  )}
                </div>
                <div className={styles.departTagWrap}>
                  <Tag>分类名称: {info.categoryName}</Tag>
                  <Tag>分类编码: {info.categoryNumber}</Tag>
                  <Tag>分类排序: {info.sort}</Tag>
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

export default Index;
