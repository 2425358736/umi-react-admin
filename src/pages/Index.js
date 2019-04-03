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
    const data2 = await postRequest(HOME2);
    if (data.status === 200) {
      await this.setState({
        partyMemberData1: data.data.partyPartyAgePieChart,
        partyMemberData2: data.data.partyAgePieChart,
        memberData: data.data.communityPieChart,
        membershipStatistics: data.data.membershipStatistics,
        partyMembers: data.data.partyMembers,
      });
    }

    if (data2.status === 200) {
      await this.setState({
        brigade: data2.data,
      });
    }
    this.setChart();
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

  setChart = () => {
    this.setMember();
    this.setPartyMemberData(1);
    this.setBrigade();
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
        bottom: 10,
        left: 'center',
        data: legendData,
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
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
        bottom: 10,
        left: 'center',
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
          center: ['50%', '50%'],
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
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <div>
            <span>社员总数:</span> <span>{this.state.membershipStatistics.allPeople}人</span>
            <span>男：</span>
            <Progress percent={this.state.membershipStatistics.man.toString().split('%')[0]} />
            <span>女：</span>
            <Progress percent={this.state.membershipStatistics.woman.toString().split('%')[0]} />
          </div>
          <div id="member" style={{ width: '360px', height: '450px' }} />

          <div>
            党员总数: {this.state.partyMembers.allPartyPeople}人 男：
            <Progress percent={this.state.partyMembers.manParty.toString().split('%')[0]} /> 女：
            <Progress percent={this.state.partyMembers.womanParty.toString().split('%')[0]} />
          </div>
          <div>
            <RadioGroup
              onChange={e => {
                this.setPartyMemberData(e.target.value);
              }}
              value={this.state.value}
            >
              <Radio value={1}>党龄</Radio>
              <Radio value={2}>年龄</Radio>
            </RadioGroup>
            <div id="partyMember" style={{ width: '360px', height: '450px' }} />
          </div>
          <div>
            {this.state.brigade.map((json, i) => (
              <div key={i.toString()}>
                <span>{json.name}</span>
                <span>男</span>
                <span>{json.man}</span>
                <span>{json.woman}</span>
                <span>女</span>
                <div id={`brigade${i}`} style={{ width: '200px', height: '200px' }} />
              </div>
            ))}
          </div>
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
