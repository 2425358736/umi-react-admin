import React from 'react';
import { Button } from 'antd';
import { postRequest } from '@/utils/api';
import { InfoTable } from '@/components/BusinessComponent/BusCom';

import { MEMBER_LIST, SYS_Dict } from '@/services/SysInterface';

const ordinary = {
  queryTitle: '姓名',
  queryField: 'fullName',
};
const senior = [
  {
    queryTitle: '几队',
    queryField: 'troops',
    component: 'Input',
  },
  {
    queryTitle: '身份证号',
    queryField: 'idNumber',
    component: 'Input',
  },
  {
    queryTitle: '手机号',
    queryField: 'phoneNumber',
    component: 'Input',
  },
  {
    queryTitle: '关系',
    queryField: 'relationShip',
    component: 'Input',
  },
];

class AddReceiver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      idArr: [],
      objArr: [],
    };
  }

  componentDidMount = async () => {
    // 几队
    const arr = [];
    const queueArr = await postRequest(`${SYS_Dict}/6`);
    if (queueArr.status === 200) {
      queueArr.data.forEach(item => {
        arr.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }

    // 与户主关系
    const arr1 = [];
    const withArr = await postRequest(`${SYS_Dict}/1`);
    if (withArr.status === 200) {
      withArr.data.forEach(item => {
        arr1.push({
          text: item.dataLabel,
          value: item.id.toString(),
        });
      });
    }

    this.setState({
      columns: [
        {
          title: '序号',
          width: '6%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '大队',
          width: '8%',
          dataIndex: 'troops',
          column: 'troopsStr',
          filters: arr,
        },
        {
          title: '姓名',
          width: '8%',
          dataIndex: 'fullName',
        },
        {
          title: '性别',
          width: '8%',
          dataIndex: 'sex',
          filters: [
            {
              text: '男',
              value: '0',
            },
            {
              text: '女',
              value: '1',
            },
            {
              text: '未知',
              value: '2',
            },
          ],
        },
        {
          title: '身份证号',
          width: '14%',
          dataIndex: 'idNumber',
        },
        {
          title: '手机号',
          width: '10%',
          dataIndex: 'phoneNumber',
        },
        {
          title: '与户主关系',
          width: '12%',
          dataIndex: 'relationship',
          column: 'relationshipsStr',
          filters: arr1,
        },
      ],
    });
  };

  render() {
    return (
      <div style={{ padding: '0 20px 2px' }}>
        <InfoTable
          columns={this.state.columns}
          listUrl={MEMBER_LIST}
          ordinary={ordinary}
          senior={senior}
          additionalData={{ paymentItemId: this.props.id }}
          selectCallback={(idArr, objArr) => {
            this.setState({ idArr, objArr });
          }}
        />
        <div style={{ margin: '94px 0 30px', textAlign: 'center' }}>
          <Button
            style={{ width: '116px', height: '36px', borderRadius: '2px' }}
            loading={this.state.buttonLoading}
            onClick={() => this.props.callback(this.state.idArr, this.state.objArr)}
            type="primary"
          >
            提交
          </Button>
          <Button
            style={{
              width: '116px',
              height: '36px',
              borderRadius: '2px',
              backgroundColor: '#fff',
              color: '#1ab393',
              marginLeft: '10px',
              border: '1px solid #1ab393',
            }}
            onClick={() => this.props.callback()}
          >
            取消
          </Button>
        </div>
      </div>
    );
  }
}

export default AddReceiver;
