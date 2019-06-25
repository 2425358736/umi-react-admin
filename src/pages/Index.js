import React from 'react';
import { Progress } from 'antd';
import Echarts from 'echarts';
import { HOME, SYS_Dict } from '@/services/SysInterface';
import { formatter } from '../utils/utils';
import styles from './index.less';

import { getRequest, postRequest } from '@/utils/api';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData1: [],
      memberData: [],
      deviceData: [],
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
    const deviceData = await getRequest('/homePage/getHomePageObjTwo');
    if (deviceData.status === 200) {
      this.setState({ deviceData: deviceData.data });
    }
    this.setMember();
    this.setOrderData();
    this.setDeviceCheckData();
    this.setDevicePayData();
    this.setMechanicCheckData();
    this.setMechanicPayData();
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
        data: ['技工', '设备商'],
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
  };

  /**
   * 设备商月验收数量排名
   */
  setDeviceCheckData = async () => {
    const { deviceData } = this.state;
    const myChart = Echarts.init(document.getElementById('deviceCheck'));
    // 绘制图表
    myChart.setOption({
      color: ['#3398DB'],
      title: {
        text: '设备商月验收数量排名',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: deviceData && deviceData.yueYanShouName,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '验收数量',
          type: 'bar',
          barWidth: '60%',
          data: deviceData && deviceData.yueYanShouValue,
        },
      ],
    });
  };

  /**
   * 设备商月付款额排名
   */
  setDevicePayData = async () => {
    const { deviceData } = this.state;

    const myChart = Echarts.init(document.getElementById('devicePay'));
    // 绘制图表
    myChart.setOption({
      color: ['#ff9933'],
      title: {
        text: '设备商月付款额排名',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: deviceData && deviceData.yueDaKuanName,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '付款金额',
          type: 'bar',
          barWidth: '60%',
          data: deviceData && deviceData.yueDaKuanValue,
        },
      ],
    });
  };

  /**
   * 劳工月验收数量排名
   */
  setMechanicCheckData = async () => {
    const { deviceData } = this.state;

    const myChart = Echarts.init(document.getElementById('mechanicCheck'));
    // 绘制图表
    myChart.setOption({
      color: ['#cc0033'],
      title: {
        text: '劳工月验收数量排名',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: deviceData && deviceData.yanShouLaoGongName,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '验收数量',
          type: 'bar',
          barWidth: '60%',
          data: deviceData && deviceData.yanShouLaoGongValue,
        },
      ],
    });
  };

  /**
   * 劳工月收款额数量排名
   */
  setMechanicPayData = async () => {
    const { deviceData } = this.state;

    const myChart = Echarts.init(document.getElementById('mechanicPay'));
    // 绘制图表
    myChart.setOption({
      color: ['#660099'],
      title: {
        text: '劳工月收款额数量排名',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: deviceData && deviceData.jiGongShouRuName,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '收款金额',
          type: 'bar',
          barWidth: '60%',
          // 柱状图数据
          data: deviceData && deviceData.jiGongShouRuValue,
        },
      ],
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

        <div className={styles.conWrap}>
          <div className={styles.chartsDom}>
            <div id="deviceCheck" style={{ height: '300px' }} />
          </div>
          <div className={styles.chartsDom}>
            <div id="devicePay" style={{ height: '300px' }} />
          </div>
          <div className={styles.chartsDom}>
            <div id="mechanicCheck" style={{ height: '300px' }} />
          </div>
          <div className={styles.chartsDom}>
            <div id="mechanicPay" style={{ height: '300px' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
