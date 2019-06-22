import React from 'react';
import { Progress } from 'antd';
import Echarts from 'echarts';
import { HOME, SYS_Dict } from '@/services/SysInterface';
import styles from './index.less';

import { getRequest, postRequest } from '@/utils/api';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData1: [],
      memberData: [],
      membershipStatistics: {
        woman: '100%',
        allPeople: 0,
        man: '100%',
      },
      orderType: [],
    };
  }

  componentDidMount = async () => {
    const data = await getRequest(HOME);
    const dataTwo = await postRequest(SYS_Dict.concat('/1'));
    if (data.status === 200) {
      await this.setState({
        orderData1: data.data.dingDanPingTu,
        memberData: data.data.sheBeiShangHeJiGongBingTu,
        membershipStatistics: data.data,
        orderType: dataTwo.data,
      });
    }
    this.setMember();
    this.setOrderData();
  };

  /**
   * 认证人数图表
   */
  setMember = () => {
    const { memberData } = this.state;
    const myChart = Echarts.init(document.getElementById('member'));
    // 绘制图表
    myChart.setOption({
      title: {
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 20,
        data: ['设备商', '技工'],
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['40%', '50%'],
          selectedMode: 'single',
          data: memberData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  };

  /**
   * 订单图表
   */
  setOrderData = async () => {
    const { orderData1 } = this.state;
    const legendData = [];
    this.state.orderType.map(str => legendData.push(str.dataLabel));
    const orderData = orderData1;

    const myChart = Echarts.init(document.getElementById('order'));
    // 绘制图表
    myChart.setOption({
      title: {
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 20,
        data: legendData,
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['42%', '50%'],
          selectedMode: 'single',
          data: orderData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
    this.setState({
      // value,
    });
  };

  render() {
    return (
      <div className={styles.homeWrap}>
        <div className={styles.headerWrap}>
          <div className={styles.homeHeader}>
            <div className={styles.progressWrap}>
              <p className={styles.totalDom}>
                认证人数:
                <span>{this.state.membershipStatistics.zongRenShu}人</span>
              </p>
              <div>
                设备商：
                <Progress
                  strokeWidth={30}
                  className={styles.lineDom}
                  percent={parseFloat(this.state.membershipStatistics.sheBeiShang)}
                />
              </div>
              <div>
                技工：
                <Progress
                  strokeWidth={30}
                  strokeColor="#e43c59"
                  className={styles.lineDom}
                  percent={parseFloat(this.state.membershipStatistics.jiGong)}
                />
              </div>
            </div>
            <div id="member" style={{ height: '300px' }} />
          </div>

          <div className={styles.homeHeader}>
            <div className={styles.progressWrap}>
              <p className={styles.totalDom}>
                订单总数:
                <span>{this.state.membershipStatistics.zongDingDan}个</span>
              </p>
              <div>
                结清：
                <Progress
                  strokeWidth={30}
                  className={styles.lineDom}
                  percent={parseFloat(this.state.membershipStatistics.jieQing)}
                />
              </div>
              <div>
                完成：
                <Progress
                  strokeWidth={30}
                  strokeColor="#e43c59"
                  className={styles.lineDom}
                  percent={parseFloat(this.state.membershipStatistics.wanChen)}
                />
              </div>
            </div>

            <div className={styles.partyPieWrap}>
              <div id="order" style={{ height: '300px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
