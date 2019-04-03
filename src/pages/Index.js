import React from 'react';
import { Radio } from 'antd';
import Echarts from 'echarts';
import { EXAMINE_LIST } from '@/services/SysInterface';
import { Info, InfoTable } from '@/components/BusinessComponent/BusCom';
import ExamineDetail from './examine/components/ExamineDetail';
import ExamineInfo from './examine/components/ExamineInfo';
import styles from './index.less';

const RadioGroup = Radio.Group;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      brigade: [],
      columns: [],
    };
  }

  componentWillMount = async () => {
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

  componentDidMount = async () => {
    this.setMember();
    this.setPartyMemberData(1);
    await this.setBrigade();
  };

  setBrigade = async () => {
    await this.setState({
      brigade: [
        {
          name: '1队',
          a: '50%',
          b: '50%',
          data: [10, 52, 200, 334, 390, 330, 220, 44],
        },
        {
          name: '2队',
          a: '25%',
          b: '75%',
          data: [10, 22, 33, 44, 55, 66, 77, 55],
        },
        {
          name: '3队',
          a: '30%',
          b: '70%',
          data: [44, 66, 77, 22, 99, 33, 220, 66],
        },
      ],
    });
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

  setPartyMemberData = value => {
    let partyMemberData = [];
    let legendData = [];
    if (value === 1) {
      legendData = ['5年以下', '5-15年', '15-25年', '25-35年', '35-45年', '45-55年', '55年以上'];
      partyMemberData = [
        { value: 1548, name: '5年以下' },
        { value: 535, name: '5-15年' },
        { value: 510, name: '15-25年' },
        { value: 634, name: '25-35年' },
        { value: 735, name: '35-45年' },
        { value: 735, name: '45-55年' },
        { value: 735, name: '55年以上' },
      ];
    } else {
      legendData = ['18-30岁', '30-40岁', '40-50岁', '50-60岁', '60-70岁', '70岁以上'];
      partyMemberData = [
        { value: 50, name: '18-30岁' },
        { value: 50, name: '30-40岁' },
        { value: 50, name: '40-50岁' },
        { value: 50, name: '50-60岁' },
        { value: 50, name: '60-70岁' },
        { value: 50, name: '70岁以上' },
      ];
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
    const memberData = [
      { value: 1548, name: '3岁以下' },
      { value: 535, name: '3-6岁' },
      { value: 634, name: '6-12岁' },
      { value: 735, name: '12-18岁' },
      { value: 735, name: '18-30岁' },
      { value: 735, name: '30-50岁' },
      { value: 735, name: '50-70岁' },
      { value: 735, name: '70岁以上' },
    ];
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
          <div id="member" style={{ width: '360px', height: '450px' }} />
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
                <span>{json.a}</span>
                <span>{json.b}</span>
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
