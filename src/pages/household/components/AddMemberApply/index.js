import React from 'react';
import { Spin, Modal, Button, notification } from 'antd';
import NowMemList from './components/NowMemList';
import NewMemList from './components/NewMemList';
import UploadImg from '../../../../components/UpLoad/UploadImage';
import { getRequest, postRequest, IdentityCodeValid, verVal } from '@/utils/api';

import { HOUSEHOLD_DETAIL, ADD_MEMBER } from '@/services/SysInterface';

const styles = require('./index.less');

class AddMemberApply extends React.Component {
  indexPictures = '';

  constructor(props) {
    super(props);
    this.state = {
      fetchData: {},
      buttonLoading: false,
      loading: false,
      getList: false,
      imgVisible: false,
    };
  }

  componentDidMount = async () => {
    const data = await getRequest(`${HOUSEHOLD_DETAIL}?id=${this.props.id}`);
    if (data.status === 200) {
      this.indexPictures = data.data.indexPictures;
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  /**
   * 索引页上传图片回调
   */
  uploadCallback = url => {
    this.indexPictures = url;
  };

  /**
   * 列表回调
   */
  onListCall = list => {
    this.setState({
      list,
      getList: false,
    });
  };

  /**
   * 提交
   */
  handleSubmit = async () => {
    await this.setState({ getList: true });
    let flag = true;
    const list = [...this.state.list];
    for (let i = 0, len = list.length; i < len; i += 1) {
      if (!verVal(list[i].relationship)) {
        notification.error({ message: `请选择与户主关系` });
        flag = false;
        return;
      }
      if (!verVal(list[i].fullName)) {
        notification.error({ message: `请输入姓名` });
        flag = false;
        return;
      }
      if (!verVal(list[i].nationalities)) {
        notification.error({ message: `请选择民族` });
        flag = false;
        return;
      }
      if (!verVal(list[i].idNumber) || !IdentityCodeValid(list[i].idNumber)) {
        notification.error({ message: `${list[i].idNumber}身份证号不正确` });
        flag = false;
        return;
      }
      if (!verVal(list[i].memberPictures)) {
        notification.error({ message: `请上传${list[i].fullName}的个人单页` });
        flag = false;
        return;
      }
    }
    if (!flag) {
      return;
    }
    this.setState({
      buttonLoading: true,
    });
    const json = {
      householdId: this.props.id,
      list: this.state.list,
      homePicture: this.state.fetchData.homePicture,
      indexPictures: this.indexPictures,
    };
    const data = await postRequest(ADD_MEMBER, json);
    this.setState({
      buttonLoading: false,
    });
    if (data.status === 200) {
      notification.success({ message: data.msg });
      this.props.callback(true);
    } else {
      notification.error({ message: data.msg, description: data.subMsg });
      this.props.callback(false);
    }
  };

  /**
   * 取消
   */
  handleCancel = () => {
    this.props.callback(false);
  };

  render() {
    const { fetchData } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.addApplyWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>户口簿信息</span>
          </div>
          <ul className={styles.applyUl}>
            <li>
              <span>编号:</span>
              <span>{fetchData.householdNumber}</span>
            </li>
            <li>
              <span>几队:</span>
              <span>{fetchData.troopsStr}</span>
            </li>
            <li>
              <span>户别:</span>
              <span>{fetchData.householdTypeStr}</span>
            </li>
            <li>
              <span>户号:</span>
              <span>{fetchData.householdRegisterNumber}</span>
            </li>
            <li>
              <span>住址:</span>
              <span>{fetchData.homeAddress}</span>
            </li>
            <li>
              <span>证件:</span>
              <ul>
                <li onClick={() => this.setState({ imgVisible: true })}>
                  <div className={styles.imgWrap}>
                    <img src={fetchData.homePicture} alt="" />
                  </div>
                  <p>户主页</p>
                </li>
                <li>
                  <div className={styles.imgWrap}>
                    {this.indexPictures && this.indexPictures !== '' && (
                      <UploadImg fileList={this.indexPictures} callback={this.uploadCallback} />
                    )}
                  </div>
                  <p>索引页</p>
                </li>
              </ul>
            </li>
          </ul>

          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>当前成员列表</span>
          </div>
          {fetchData && fetchData.id > 0 && (
            <NowMemList
              list={fetchData.listMember}
              getList={this.state.getList}
              onListCall={this.onListCall}
            />
          )}

          {/* 分割线 */}

          <div className={styles.titleDom}>
            <span />
            <span>新增成员列表</span>
          </div>
          <NewMemList getList={this.state.getList} onListCall={this.onListCall} />

          {/* 分割线 */}

          <div className={styles.btnGroup}>
            <Button
              className={styles.submitBtn}
              loading={this.state.buttonLoading}
              onClick={this.handleSubmit}
              type="primary"
            >
              提交
            </Button>
            <Button onClick={this.handleCancel} className={styles.cancelBtn}>
              取消
            </Button>
          </div>

          <Modal
            title="户主页"
            visible={this.state.imgVisible}
            footer={null}
            onCancel={() => this.setState({ imgVisible: false })}
          >
            <img style={{ width: '100%' }} src={fetchData.homePicture} alt="" />
          </Modal>
        </div>
      </Spin>
    );
  }
}

export default AddMemberApply;
