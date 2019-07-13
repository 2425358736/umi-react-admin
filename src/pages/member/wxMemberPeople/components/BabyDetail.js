import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { GetWxMemberBaby, WxMemberBabyTreatmentList } from '../Service';

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
    const data = await getRequest(`${GetWxMemberBaby}?id=${this.props.id}`);
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
          title: '会诊时间',
          width: '30%',
          dataIndex: 'registerDate',
        },
        {
          title: '会诊原因',
          width: '30%',
          dataIndex: 'pathogeny',
        },
        {
          title: '会诊内容',
          width: '35%',
          dataIndex: 'therapeuticRegimen',
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
            <span>姓名：{InfoData.babyName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="home" className={styles.iconDom} />
                年龄
              </p>
              <p className={styles.cardContent}>{InfoData.age}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="trophy" className={styles.iconDom} />
                身份证号
              </p>
              <Tooltip title={InfoData.idNumber}>
                <p className={styles.cardContent}>{InfoData.idNumber}</p>
              </Tooltip>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="home" className={styles.iconDom} />
                性别
              </p>
              <p className={styles.cardContent}>{InfoData.genderStr}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>就诊信息</span>
          </div>
          <InfoTable
            scroll={{ x: 900 }}
            align="center"
            pageSize={15}
            columns={this.state.columns}
            listUrl={WxMemberBabyTreatmentList}
            additionalData={{ babyId: this.props.id }}
            renovate={false}
          />
        </div>
      </div>
    );
  }
}

export default Details;
