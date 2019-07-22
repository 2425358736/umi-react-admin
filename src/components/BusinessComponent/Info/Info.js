import React from 'react';
import { Drawer } from 'antd';

import { connect } from 'dva';
import style from './Info.less';

@connect(({ breadcrumb }) => ({
  breadcrumb,
  list: breadcrumb.list,
}))
class Info extends React.Component {
  constructor(props) {
    super(props);
    const identifying = this.digui(Math.round(Math.random() * 999999999));
    this.state = {
      open: false,
      title: '',
      identifying,
    };
  }

  digui = identifying => {
    const { list } = this.props;
    let on = true;
    list.forEach(json => {
      if (json.toString() === identifying.toString()) {
        on = false;
      }
    });
    if (on) {
      return identifying;
    }
    return this.digui(Math.round(Math.random() * 999999999));
  };

  componentWillReceiveProps = async nextProps => {
    const { list } = nextProps;
    let title1 = '';
    let on = false;
    list.forEach(json => {
      if (json.key === this.state.identifying) {
        on = json.open;
        title1 = json.title;
      }
    });
    this.setState({
      open: on,
      title: title1,
    });
  };

  componentWillUnmount = () => {
    if (this.state.open) {
      const { list, dispatch } = this.props;
      list.forEach((json, i) => {
        if (json.key === this.state.identifying) {
          list.splice(i, 1);
        }
      });
      dispatch({
        type: 'breadcrumb/fetch',
        payload: { list },
      });
    }
  };

  render() {
    const { dispatch, list, children, title, id, callback } = this.props;
    const { identifying, open } = this.state;
    return (
      <div style={{ display: 'inline-block' }}>
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
          getContainer="main"
          className={style.breadDom}
          maskStyle={{
            position: 'absolute',
            height: 'calc(100vh - 112px)',
            overflow: 'auto',
          }}
          zIndex={0}
          title={this.props.title || this.state.title}
          placement="right"
          width="1000px"
          onClose={() => {
            list.forEach((json, i) => {
              if (json.key === identifying) {
                list.splice(i, list.length);
              }
            });
            dispatch({
              type: 'breadcrumb/fetch',
              payload: { list },
            });
            callback();
          }}
          visible={open}
          destroyOnClose
        >
          {this.props.info && this.props.info}
        </Drawer>
      </div>
    );
  }
}

export default Info;
