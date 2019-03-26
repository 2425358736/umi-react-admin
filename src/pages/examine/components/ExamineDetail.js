import React from 'react';
import { Form, Input, Icon, notification } from 'antd';
import UploadImg from '../../../components/UpLoad/UploadImage';
import MemList from '../../moveIn/components/MemList';
import MemberList from './MemberList';
import ExamineRecord from './ExamineRecord';
import styles from './components.less';
import { getRequest, postRequest, postFormDateRequest, jsonString, verVal } from '@/utils/api';

import { Info, Operation } from '@/components/BusinessComponent/BusCom';

import { EXAMINE_Detail, MOVEIN_CANCEL, MOVEIN_SUCCESS } from '@/services/SysInterface';

class MoveInExamine extends React.Component {
  homePicture = null;

  indexPictures = null;

  constructor(props) {
    super(props);
    this.state = {
      fetchData: {
        list: [],
      },
      getList: false,
      subBtnLoading: false,
      cancelBtnLoading: false,
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${EXAMINE_Detail}?id=${this.props.id}`);
    if (data.status === 200) {
      this.homePicture = data.data.homePicture;
      this.indexPictures = data.data.indexPictures;
      await this.setState({
        fetchData: data.data,
      });
    }
  };

  /**
   * 户主页上传图片回调
   */
  uploadCallback = url => {
    this.homePicture = url;
  };

  /**
   * 索引页上传图片回调
   */
  uploadCallback2 = url => {
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
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    if (adopt) {
      if (!verVal(this.homePicture)) {
        notification.error({ message: '请上传户主页' });
        return;
      }
      if (!verVal(this.indexPictures)) {
        notification.error({ message: '请上传索引页' });
        return;
      }
      if (this.state.fetchData.changeType === 0) {
        if (!verVal(this.props.form.getFieldValue('householdNumber'))) {
          notification.error({ message: '请输入该迁入户口的编号' });
          return;
        }
      }
      await this.setState({ getList: true });
      this.setState({
        subBtnLoading: true,
      });
      const json = this.props.form.getFieldsValue();
      jsonString(json);
      const fetchData = {
        ...this.state.fetchData,
        ...json,
        remarks: this.props.form.getFieldValue('remarks')
          ? this.props.form.getFieldValue('remarks')
          : '',
        list: this.state.list,
        homePicture: this.homePicture,
        indexPictures: this.indexPictures,
      };
      const data = await postRequest(MOVEIN_SUCCESS, fetchData);
      this.setState({
        subBtnLoading: false,
      });
      if (data.status === 200) {
        notification.success({ message: data.msg });
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
    }
  };

  /**
   * 作废
   */
  handleCancel = async () => {
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    if (adopt) {
      this.setState({
        cancelBtnLoading: true,
      });
      const json = {
        remarks: this.props.form.getFieldValue('remarks')
          ? this.props.form.getFieldValue('remarks')
          : '',
        id: this.props.id,
      };
      const cancelData = await postFormDateRequest(MOVEIN_CANCEL, json);
      if (cancelData.status === 200) {
        notification.success({ message: cancelData.msg });
      } else {
        notification.error({ message: cancelData.msg, description: cancelData.subMsg });
      }
      this.setState({
        cancelBtnLoading: false,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fetchData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            {fetchData.changeType === 0 && <span>户号：{fetchData.householdRegisterNumber}</span>}
            {fetchData.changeType !== 0 && <span>编号：{fetchData.householdNumber}</span>}
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="bars" className={styles.iconDom} />
                申请类型
              </p>
              <p className={styles.cardContent}>{fetchData.changeTypeStr}</p>
            </div>
            {fetchData.changeType !== 0 && (
              <div className={styles.cardDom}>
                <p className={styles.cardTitle}>
                  <Icon type="credit-card" className={styles.iconDom} />
                  户号
                </p>
                <p className={styles.cardContent}>{fetchData.householdRegisterNumber}</p>
              </div>
            )}

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                户别
              </p>
              <p className={styles.cardContent}>{fetchData.householdTypeStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="user" className={styles.iconDom} />
                户主
              </p>
              <p className={styles.cardContent}>{fetchData.householderName}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="environment" className={styles.iconDom} />
                住址
              </p>
              <p className={styles.cardContent}>{fetchData.homeAddress}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            {(fetchData.changeType === 1 || fetchData.changeType === 2) && (
              <div className={styles.btnWrap}>
                <Info title="户口簿详情" info={<MemberList id={fetchData.householdId} />}>
                  <p style={{ color: '#fff' }}>查看当前成员列表</p>
                </Info>
              </div>
            )}
            <span>
              {fetchData.changeType === 0
                ? '迁入成员列表'
                : fetchData.changeType === 1
                ? '增员列表'
                : fetchData.changeType === 2
                ? '减员列表'
                : '注销成员列表'}
            </span>
          </div>
          <div>
            <MemList
              type={fetchData.changeType}
              id={fetchData.householdId}
              list={fetchData.list}
              getList={this.state.getList}
              onListCall={this.onListCall}
            />
            <div className={styles.conWrap}>
              {fetchData.changeType === 2 && (
                <div className={styles.subPicWrap}>
                  <div className={styles.imgWrap}>
                    <img src={fetchData.homePicture} alt="" />
                  </div>
                  <p>户主页</p>
                </div>
              )}
              {fetchData.changeType !== 2 && this.homePicture !== null && (
                <div className={styles.imgWrap}>
                  <UploadImg fileList={this.homePicture} callback={this.uploadCallback} />
                  <p>户主页</p>
                </div>
              )}
              {this.indexPictures !== null && (
                <div className={styles.imgWrap}>
                  <UploadImg fileList={this.indexPictures} callback={this.uploadCallback2} />
                  <p>索引页</p>
                </div>
              )}
              <div className={styles.inputWrap}>
                <Form>
                  <Form.Item
                    className={styles.inputDom}
                    label="备注"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                  >
                    {getFieldDecorator('remarks', {})(
                      <Input.TextArea autosize={{ minRows: 4 }} placeholder="请输入备注" />
                    )}
                  </Form.Item>
                  {fetchData.changeType === 0 && (
                    <Form.Item
                      className={styles.inputDom}
                      label="编号"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 16 }}
                    >
                      {getFieldDecorator('householdNumber', {})(
                        <Input placeholder="请输入该迁入户口的编号" />
                      )}
                    </Form.Item>
                  )}
                </Form>
              </div>
            </div>
            <div className={styles.btnGroup}>
              <Operation
                isBtn
                btnType="submit"
                buttonLoading={this.state.subBtnLoading}
                onClick={this.handleSubmit}
                title={
                  fetchData.changeType === 0
                    ? '迁入通过'
                    : fetchData.changeType === 1
                    ? '增员通过'
                    : fetchData.changeType === 2
                    ? '减员通过'
                    : '注销通过'
                }
                mode={0}
              />
              <Operation
                isBtn
                buttonLoading={this.state.cancelBtnLoading}
                onClick={this.handleCancel}
                title={
                  fetchData.changeType === 0
                    ? '迁入作废'
                    : fetchData.changeType === 1
                    ? '增员作废'
                    : fetchData.changeType === 2
                    ? '减员作废'
                    : '注销作废'
                }
                mode={0}
              />
            </div>
          </div>
        </div>
        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>审核记录</span>
          </div>
          {fetchData && fetchData.id && <ExamineRecord propId={fetchData.id} />}
        </div>
      </div>
    );
  }
}

const MoveInExamineComponent = Form.create()(MoveInExamine);

export default MoveInExamineComponent;
