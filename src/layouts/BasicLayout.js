/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import router from 'umi/router';
import { Layout, Breadcrumb } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import Authorized from '@/utils/Authorized';
import logo from '../assets/logo.svg';
// import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import NotPage from '../components/error/NotPage';

import styles from './BasicLayout.less';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const {
      collapsed,
      isMobile,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
    this.matchParamsPath(pathname, breadcrumbNameMap);
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    if (pathKey) {
      const { dispatch } = this.props;
      const list = [];
      const path = pathname.split('/');
      let strPath = '';
      path.forEach(str => {
        if (str) {
          strPath += `/${str}`;
          const obj = breadcrumbNameMap[strPath];
          list.push({
            key: strPath,
            name: obj.name,
            fun: () => {
              if (obj.children.length > 0) {
                console.log('是目录');
              } else {
                router.push(obj.path);
              }
              list.forEach((obj1, i) => {
                if (obj1.key === pathKey) {
                  list.splice(i + 1, list.length);
                }
              });
              dispatch({
                type: 'breadcrumb/fetch',
                payload: { list },
              });
            },
          });
        }
      });
      dispatch({
        type: 'breadcrumb/fetch',
        payload: { list },
      });
    }
    return breadcrumbNameMap[pathKey];
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path === key) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));

    if (!pathKey) {
      return '劳务平台';
    }
    // const pageName = formatMessage({
    //   id: currRouterData.locale || currRouterData.name,
    //   defaultMessage: currRouterData.name,
    // });
    return `${breadcrumbNameMap[pathKey].name} - 劳务平台`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '170px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  breadcrumb = obj => {
    obj.fun();
  };

  getHeadWidth = () => {
    const { collapsed } = this.props;
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 170px)';
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      route: { routes },
      fixedHeader,
      breadcrumb: { list },
    } = this.props;
    const isTop = PropsLayout === 'topmenu';
    const routerConfig = this.getRouterAuthority(pathname, routes);
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const width = this.getHeadWidth();
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
            background: '#f4f4f4',
            overflowX: 'auto',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Breadcrumb style={{ width }} className={styles.breadDom}>
            {list.map((obj, i) => (
              <Breadcrumb.Item key={i.toString()}>
                <a
                  onClick={() => {
                    this.breadcrumb(obj);
                  }}
                >
                  {obj.name}
                </a>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content className={styles.content} style={contentStyle}>
            <Authorized authority={routerConfig} noMatch={<NotPage />}>
              {children}
            </Authorized>
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu, breadcrumb }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  breadcrumb,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
