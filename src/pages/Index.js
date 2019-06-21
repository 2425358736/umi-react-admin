import React from 'react';
import { Progress } from 'antd';
import Echarts from 'echarts';
import { HOME, SYS_Dict } from '@/services/SysInterface';
// import { Info, InfoTable } from '@/components/BusinessComponent/BusCom';
// import ExamineDetail from './examine/components/ExamineDetail';
// import ExamineInfo from './examine/components/ExamineInfo';
import styles from './index.less';

import { getRequest, postRequest } from '@/utils/api';

// const RadioGroup = Radio.Group;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: 1,
      brigade: [],
      // columns: [],
      partyMemberData1: [],
      memberData: [],
      membershipStatistics: {
        woman: '100%',
        allPeople: 0,
        man: '100%',
      },
      orderType: [],
      // partyMembers: {
      //   womanParty: '100%',
      //   manParty: '100%',
      //   allPartyPeople: 0,
      // },
    };
  }

  componentDidMount = async () => {
    const data = await getRequest(HOME);
    const dataTwo = await postRequest(SYS_Dict.concat('/1'));
    if (data.status === 200) {
      await this.setState({
        partyMemberData1: data.data.dingDanPingTu,
        memberData: data.data.sheBeiShangHeJiGongBingTu,
        membershipStatistics: data.data,
        orderType: dataTwo.data,
        // partyMembers: data.data.partyMembers,
      });
    }
    this.setMember();
    this.setPartyMemberData();
    // const data2 = await postRequest(HOME2);
    //
    // if (data2.status === 200) {
    //   await this.setState({
    //     brigade: data2.data,
    //   });
    // }
    this.setBrigade();
    // this.setState({
    //   columns: [
    //     {
    //       title: '序号',
    //       width: '5%',
    //       dataIndex: 'id',
    //       isIncrement: true,
    //     },
    //     {
    //       title: '编号',
    //       width: '6%',
    //       dataIndex: 'householdNumber',
    //     },
    //     {
    //       title: '几队',
    //       width: '6%',
    //       dataIndex: 'troopsStr',
    //     },
    //     {
    //       title: '户主',
    //       width: '8%',
    //       dataIndex: 'householderName',
    //     },
    //     {
    //       title: '身份证号',
    //       width: '14%',
    //       dataIndex: 'householderNumber',
    //     },
    //     {
    //       title: '户别',
    //       width: '8%',
    //       dataIndex: 'householdType',
    //       column: 'householdTypeStr',
    //       filters: [
    //         {
    //           text: '家庭户',
    //           value: '0',
    //         },
    //         {
    //           text: '集体户',
    //           value: '1',
    //         },
    //       ],
    //     },
    //     {
    //       title: '户号',
    //       width: '10%',
    //       dataIndex: 'householdRegisterNumber',
    //     },
    //     {
    //       title: '住址',
    //       width: '12%',
    //       dataIndex: 'homeAddress',
    //     },
    //     {
    //       title: '申请类型',
    //       width: '10%',
    //       dataIndex: 'changeType',
    //       column: 'changeTypeStr',
    //       filters: [
    //         {
    //           text: '迁入',
    //           value: '0',
    //         },
    //         {
    //           text: '增员',
    //           value: '1',
    //         },
    //         {
    //           text: '减员',
    //           value: '2',
    //         },
    //         {
    //           text: '注销',
    //           value: '3',
    //         },
    //       ],
    //     },
    //     {
    //       title: '状态',
    //       width: '10%',
    //       dataIndex: 'auditStatusStr',
    //     },
    //     {
    //       title: '操作',
    //       width: '10%',
    //       dataIndex: 'opt',
    //       render(text, record) {
    //         return (
    //           <span>
    //             {record.auditStatus === 0 && (
    //               <Info
    //                 title={
    //                   record.changeType === 0
    //                     ? '迁入审批'
    //                     : record.changeType === 1
    //                     ? '增员审批'
    //                     : record.changeType === 2
    //                     ? '减员审批'
    //                     : '注销审批'
    //                 }
    //                 info={<ExamineDetail id={record.id} />}
    //               >
    //                 {record.changeType === 0
    //                   ? '迁入审批'
    //                   : record.changeType === 1
    //                   ? '增员审批'
    //                   : record.changeType === 2
    //                   ? '减员审批'
    //                   : '注销审批'}
    //               </Info>
    //             )}
    //             {record.auditStatus !== 0 && (
    //               <Info title="审核详情" info={<ExamineInfo id={record.id} />}>
    //                 详情
    //               </Info>
    //             )}
    //           </span>
    //         );
    //       },
    //     },
    //   ],
    // });
  };

  setBrigade = () => {
    this.state.brigade.forEach((json, i) => {
      const myChart = Echarts.init(document.getElementById(`brigade${i}`));
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB'],
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
        xAxis: {
          type: 'category',
          data: ['设备商', '技工'],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: json.data,
            type: 'bar',
            barWidth: '60%',
          },
        ],
      });
    });
  };

  setPartyMemberData = async () => {
    const { partyMemberData1 } = this.state;
    const legendData = [];
    let partyMemberData = [];
    this.state.orderType.map(str => legendData.push(str.dataLabel));
    partyMemberData = partyMemberData1;

    const myChart = Echarts.init(document.getElementById('partyMember'));
    // 绘制图表
    myChart.setOption({
      title: {
        // text: '天气情况统计',
        // subtext: '虚构数据',
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
          data: partyMemberData,
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

  setMember = () => {
    const { memberData } = this.state;
    const myChart = Echarts.init(document.getElementById('member'));
    // 绘制图表
    myChart.setOption({
      title: {
        // text: '天气情况统计',
        // subtext: '虚构数据',
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
              <div id="partyMember" style={{ height: '300px' }} />
              <div className={styles.radioWrap}>
                {/* <RadioGroup */}
                {/* onChange={e => { */}
                {/* this.setPartyMemberData(e.target.value); */}
                {/* }} */}
                {/* value={this.state.value} */}
                {/* > */}
                {/* <Radio value={1}>党龄</Radio> */}
                {/* <Radio value={2}>年龄</Radio> */}
                {/* </RadioGroup> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.homeMid}> */}
        {/* {this.state.brigade.map((json, i) => ( */}
        {/* <div className={styles.chartsDom} key={i.toString()}> */}
        {/* <p> */}
        {/* {json.name} */}
        {/* <span>{json.troopNum}</span> */}
        {/* </p> */}
        {/* <div className={styles.genderWrap}> */}
        {/* <span>男</span> */}
        {/* <div> */}
        {/* <span style={{ width: json.man.toString() }}>{json.man}</span> */}
        {/* <span style={{ width: json.woman.toString() }}>{json.woman}</span> */}
        {/* </div> */}
        {/* <span>女</span> */}
        {/* </div> */}
        {/* <div id={`brigade${i}`} style={{ width: '200px', height: '200px' }} /> */}
        {/* </div> */}
        {/* ))} */}
        {/* </div> */}

        {/* <div className={styles.tableWrap}> */}
        {/* <InfoTable */}
        {/* columns={this.state.columns} */}
        {/* listUrl={EXAMINE_LIST} */}
        {/* additionalData={{ auditStatus: '0' }} */}
        {/* /> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Index;
