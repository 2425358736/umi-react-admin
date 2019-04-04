import React from 'react';
import { Radio, Progress } from 'antd';
import Echarts from 'echarts';
import { EXAMINE_LIST, HOME, HOME2 } from '@/services/SysInterface';
import { Info, InfoTable } from '@/components/BusinessComponent/BusCom';
import ExamineDetail from './examine/components/ExamineDetail';
import ExamineInfo from './examine/components/ExamineInfo';
import styles from './index.less';

import { postRequest } from '@/utils/api';

const RadioGroup = Radio.Group;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      brigade: [],
      columns: [],
      partyMemberData1: [],
      partyMemberData2: [],
      memberData: [],
      membershipStatistics: {
        woman: '100%',
        allPeople: 0,
        man: '100%',
      },
      partyMembers: {
        womanParty: '100%',
        manParty: '100%',
        allPartyPeople: 0,
      },
    };
  }

  componentDidMount = async () => {
    const data = await postRequest(HOME);
    if (data.status === 200) {
      await this.setState({
        partyMemberData1: data.data.partyPartyAgePieChart,
        partyMemberData2: data.data.partyAgePieChart,
        memberData: data.data.communityPieChart,
        membershipStatistics: data.data.membershipStatistics,
        partyMembers: data.data.partyMembers,
      });
    }
    this.setMember();
    this.setPartyMemberData(1);
    const data2 = await postRequest(HOME2);

    if (data2.status === 200) {
      await this.setState({
        brigade: data2.data,
      });
    }
    this.setBrigade();
    this.setState({
      columns: [
        {
          title: '序号',
          width: '5%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '编号',
          width: '6%',
          dataIndex: 'householdNumber',
        },
        {
          title: '几队',
          width: '6%',
          dataIndex: 'troopsStr',
        },
        {
          title: '户主',
          width: '8%',
          dataIndex: 'householderName',
        },
        {
          title: '身份证号',
          width: '14%',
          dataIndex: 'householderNumber',
        },
        {
          title: '户别',
          width: '8%',
          dataIndex: 'householdType',
          column: 'householdTypeStr',
          filters: [
            {
              text: '家庭户',
              value: '0',
            },
            {
              text: '集体户',
              value: '1',
            },
          ],
        },
        {
          title: '户号',
          width: '10%',
          dataIndex: 'householdRegisterNumber',
        },
        {
          title: '住址',
          width: '12%',
          dataIndex: 'homeAddress',
        },
        {
          title: '申请类型',
          width: '10%',
          dataIndex: 'changeType',
          column: 'changeTypeStr',
          filters: [
            {
              text: '迁入',
              value: '0',
            },
            {
              text: '增员',
              value: '1',
            },
            {
              text: '减员',
              value: '2',
            },
            {
              text: '注销',
              value: '3',
            },
          ],
        },
        {
          title: '状态',
          width: '10%',
          dataIndex: 'auditStatusStr',
        },
        {
          title: '操作',
          width: '10%',
          dataIndex: 'opt',
          render(text, record) {
            return (
              <span>
                {record.auditStatus === 0 && (
                  <Info
                    title={
                      record.changeType === 0
                        ? '迁入审批'
                        : record.changeType === 1
                        ? '增员审批'
                        : record.changeType === 2
                        ? '减员审批'
                        : '注销审批'
                    }
                    info={<ExamineDetail id={record.id} />}
                  >
                    {record.changeType === 0
                      ? '迁入审批'
                      : record.changeType === 1
                      ? '增员审批'
                      : record.changeType === 2
                      ? '减员审批'
                      : '注销审批'}
                  </Info>
                )}
                {record.auditStatus !== 0 && (
                  <Info title="审核详情" info={<ExamineInfo id={record.id} />}>
                    详情
                  </Info>
                )}
              </span>
            );
          },
        },
      ],
    });
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
          data: [
            '3岁以下',
            '3-6岁',
            '6-12岁',
            '12-18岁',
            '18-30岁',
            '30-50岁',
            '50-70岁',
            '70岁以上',
          ],
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

  setPartyMemberData = async value => {
    const { partyMemberData1, partyMemberData2 } = this.state;
    let partyMemberData = [];
    let legendData = [];
    if (value === 1) {
      legendData = ['5年以下', '5-15年', '15-25年', '25-35年', '35-45年', '45-55年', '55年以上'];
      partyMemberData = partyMemberData1;
    } else {
      legendData = ['18-30岁', '30-40岁', '40-50岁', '50-60岁', '60-70岁', '70岁以上'];
      partyMemberData = partyMemberData2;
    }

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
      value,
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
        data: [
          '3岁以下',
          '3-6岁',
          '6-12岁',
          '12-18岁',
          '18-30岁',
          '30-50岁',
          '50-70岁',
          '70岁以上',
        ],
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
                社员总数:
                <span>{this.state.membershipStatistics.allPeople}人</span>
              </p>
              <div>
                男：
                <Progress
                  strokeWidth={30}
                  className={styles.lineDom}
                  percent={parseFloat(this.state.membershipStatistics.man.toString().split('%')[0])}
                />
              </div>
              <div>
                女：
                <Progress
                  strokeWidth={30}
                  strokeColor="#e43c59"
                  className={styles.lineDom}
                  percent={parseFloat(
                    this.state.membershipStatistics.woman.toString().split('%')[0]
                  )}
                />
              </div>
            </div>
            <div id="member" style={{ height: '300px' }} />
          </div>

          <div className={styles.homeHeader}>
            <div className={styles.progressWrap}>
              <p className={styles.totalDom}>
                党员总数:
                <span>{this.state.partyMembers.allPartyPeople}人</span>
              </p>
              <div>
                男：
                <Progress
                  strokeWidth={30}
                  className={styles.lineDom}
                  percent={parseFloat(this.state.partyMembers.manParty.toString().split('%')[0])}
                />
              </div>
              <div>
                女：
                <Progress
                  strokeWidth={30}
                  strokeColor="#e43c59"
                  className={styles.lineDom}
                  percent={parseFloat(this.state.partyMembers.womanParty.toString().split('%')[0])}
                />
              </div>
            </div>

            <div className={styles.partyPieWrap}>
              <div id="partyMember" style={{ height: '300px' }} />
              <div className={styles.radioWrap}>
                <RadioGroup
                  onChange={e => {
                    this.setPartyMemberData(e.target.value);
                  }}
                  value={this.state.value}
                >
                  <Radio value={1}>党龄</Radio>
                  <Radio value={2}>年龄</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.homeMid}>
          {this.state.brigade.map((json, i) => (
            <div className={styles.chartsDom} key={i.toString()}>
              <p>
                {json.name}
                <span>{json.troopNum}</span>
              </p>
              <div>
                <span>男</span>
                <div style={{ display: 'inline-block', width: '30px' }}>
                  <span className={styles.perSpan}>{json.man}</span>
                  <span className={styles.perSpan}>{json.woman}</span>
                </div>
                <span>女</span>
              </div>
              <div id={`brigade${i}`} style={{ width: '200px', height: '200px' }} />
            </div>
          ))}
        </div>

        <div className={styles.tableWrap}>
          <InfoTable
            columns={this.state.columns}
            listUrl={EXAMINE_LIST}
            additionalData={{ auditStatus: '0' }}
          />
        </div>
      </div>
    );
  }
}

export default Index;
