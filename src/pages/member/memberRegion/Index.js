// 系统设置 - 区域管理
import React from 'react';
import { connect } from 'dva';
import { Tree, Tag, Icon, Divider, Modal, Popconfirm, notification, Spin } from 'antd';
import AddUp from './components/AddUp';
// import Index from '../sysRole/Index';
import { postRequest } from '@/utils/api';
import { REGION_TREE, DEL_REGION } from '@/services/member';
import styles from './Index.less';

@connect(({ screen }) => ({
  screen,
}))
class regionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
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
    let regionList = await postRequest(REGION_TREE);
    regionList = regionList.data;
    this.setState({
      regionList,
    });
    if (this.state.info && this.state.info.id > 0) {
      const info = this.getInfo(regionList);
      this.setState({
        info,
      });
    }
    this.setState({
      spinning: false,
    });
  };

  getInfo = arr => {
    for (let i = 0; i < arr.length; i += 1) {
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
    const data = await postRequest(`${DEL_REGION}/${id}`);
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.initialization();
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
    }
  };

  recursion(regionList, i) {
    const arr = [];
    regionList.forEach(region => {
      if (region.parentId === i) {
        arr.push(
          <Tree.TreeNode
            title={
              <Tag
                className={styles.treeNode}
                onClick={() => {
                  this.setState({
                    info: region,
                  });
                }}
              >
                {region.regionName}
              </Tag>
            }
            key={region.id}
          >
            {this.recursion(region.children, region.id)}
          </Tree.TreeNode>
        );
      }
    });
    return arr;
  }

  render() {
    const { info, regionList } = this.state;
    return (
      <div className={styles.departWrap}>
        <Modal
          title={this.state.type === 'up' ? '编辑区域' : '添加区域'}
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
                            regionName: '区域结构',
                          },
                        });
                      }}
                    >
                      <Icon type="folder" />
                      &nbsp;&nbsp;区域结构
                    </Tag>
                  }
                  key="0"
                >
                  {this.recursion(regionList, 0)}
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
                    添加下级区域
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
                      修改区域
                    </span>
                  )}
                  {info.id > 0 && (
                    <Popconfirm
                      title="确认删除吗"
                      onConfirm={() => {
                        this.deleteSysDepartment(info.id);
                      }}
                    >
                      <span className={styles.departBtn}>删除区域</span>
                    </Popconfirm>
                  )}
                </div>
                <div className={styles.departTagWrap}>
                  <Tag>区域名称: {info.regionName}</Tag>
                  <Tag>区域编号: {info.regionNumber}</Tag>
                  <Tag>父级区域: {info.parentName}</Tag>
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

export default regionPage;
