import React from 'react';
import { Drawer, Spin, notification } from 'antd';
import TopCard from './components/TopCard/index';
import MidCardOne from './components/MidCardOne/index';
import BottomCard from './components/BottomCard/index';
import { connect } from 'dva';
import { postRequest } from '@/utils/api';

@connect(({ breadcrumb }) => ({
  breadcrumb,
  list: breadcrumb.list,
}))
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // dataSource: {},
      loading: false,
      title: '',
    };
  }

  componentWillReceiveProps = async nextProps => {
    const { list } = nextProps;
    let id1 = 0;
    let title1 = '';
    let on = false;
    list.forEach(json => {
      if (json.key === nextProps.identifying) {
        on = json.open;
        id1 = json.id;
        title1 = json.title;
      }
    });
    this.setState({
      open: on,
      title: title1,
    });

    if (nextProps.infoUrl && id1 > 0 && this.state.open !== on) {
      this.setState({
        loading: true,
      });
      const data = await postRequest(`${nextProps.infoUrl}/${id1}`);
      this.setState({
        loading: false,
      });
      if (data.status === 200) {
        this.setState({
          // dataSource: data.data,
        });
      } else {
        notification.error({ message: data.msg, description: data.subMsg });
      }
    }
  };

  render() {
    const { dispatch, list, children, identifying, title, id } = this.props;
    return (
      <div>
        <div
          style={{
            cursor: 'pointer',
            color: '#1ab393',
          }}
          onClick={() => {
            list.push({
              id,
              key: identifying,
              open: true,
              name: title,
              fun: () => {
                list.forEach((obj, i) => {
                  if (obj.key === identifying) {
                    list.splice(i + 1, list.length);
                  }
                });
                dispatch({
                  type: 'breadcrumb/fetch',
                  payload: { list },
                });
              },
            });
            dispatch({
              type: 'breadcrumb/fetch',
              payload: { list },
            });
          }}
        >
          {children}
        </div>
        <Drawer
          style={{
            position: 'absolute',
            top: '112px',
            height: 'calc(100vh - 112px)',
            overflow: 'auto',
          }}
          title={this.props.title || this.state.title}
          placement="right"
          width="1000px"
          onClose={() => {
            list.forEach((json, i) => {
              if (json.key === this.props.identifying) {
                list.splice(i, list.length);
              }
            });
            dispatch({
              type: 'breadcrumb/fetch',
              payload: { list },
            });
          }}
          visible={this.state.open}
          destroyOnClose
        >
          {this.props.info && this.props.info}
          {this.props.infoJson && (
            <Spin spinning={this.state.loading}>
              {/* {this.props.infoJson.map((json, i) => { */}
              {/* const j = i; */}
              {/* return ( */}
              {/* <div key={j}> */}
              {/* {json.title} */}
              {/* {json.children.map((jsonOne, z) => { */}
              {/* const y = z; */}
              {/* return ( */}
              {/* <span key={y}> */}
              {/* {jsonOne.title} : {this.state.dataSource[jsonOne.dataIndex]} */}
              {/* </span> */}
              {/* ); */}
              {/* })} */}
              {/* </div> */}
              {/* ); */}
              {/* })} */}
              <div>
                <TopCard />
                <MidCardOne />
                <BottomCard />
              </div>
            </Spin>
          )}
        </Drawer>
      </div>
    );
  }
}

export default Info;
