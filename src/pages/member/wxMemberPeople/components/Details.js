import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';
import { InfoTable, Info } from '@/components/BusinessComponent/BusCom';
import BabyDetails from './BabyDetail';

import { GetWxMember, WxMemberBabyList } from '../Service';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
      columns: [],
    };
  }

  componentWillMount = async () => {
    this.setColumns();
    const data = await getRequest(`${GetWxMember}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
      });
    }
  };

  setColumns = async () => {
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          render(text, record, index) {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '宝贝姓名',
          width: '10%',
          dataIndex: 'babyName',
        },
        {
          title: '年龄',
          width: '5%',
          dataIndex: 'age',
        },
        {
          title: '生日',
          width: '30%',
          dataIndex: 'babyBirthday',
        },
        {
          title: '身份证号',
          width: '30%',
          dataIndex: 'idNumber',
        },
        {
          title: '性别',
          width: '10%',
          dataIndex: 'genderStr',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <div>
                <Info title="宝贝详情" info={<BabyDetails id={record.id} />}>
                  详情
                </Info>
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>姓名：{InfoData.userName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="home" className={styles.iconDom} />
                所属门店
              </p>
              <p className={styles.cardContent}>{InfoData.storeName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="trophy" className={styles.iconDom} />
                会员等级
              </p>
              <p className={styles.cardContent}>{InfoData.gradeStr}</p>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="phone" className={styles.iconDom} />
                手机号
              </p>
              <Tooltip title={InfoData.phone}>
                <p className={styles.cardContent}>{InfoData.phone}</p>
              </Tooltip>
            </div>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="pay-circle" className={styles.iconDom} />
                当前余额
              </p>
              <p className={styles.cardContent}>{InfoData.residualAmount}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>宝贝信息</span>
          </div>
          <InfoTable
            scroll={{ x: 900 }}
            align="center"
            pageSize={15}
            columns={this.state.columns}
            listUrl={WxMemberBabyList}
            additionalData={{ memberId: this.props.id }}
            renovate={false}
          />
        </div>
      </div>
    );
  }
}

export default Details;
