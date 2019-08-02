import { primaryColor } from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: false, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/login',
      component: './login/Index',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/index' },
        // dashboard
        {
          path: '/index',
          component: './index/Index',
        },
        {
          path: '/error/401',
          component: './error/401/Index',
        },
        {
          path: '/error/403',
          component: './error/403/Index',
        },
        {
          path: '/error/404',
          component: './error/404/Index',
        },
        {
          path: '/error/500',
          component: './error/500/Index',
        },
        {
          path: '/system/employee',
          component: './system/employee/Index',
        },
        {
          path: '/configuration/reactGojs',
          component: './configuration/DemoOne/Index',
        },
        {
          path: '/configuration/reactTwoGojs',
          component: './configuration/DemoTwo/Index',
        },
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    'process.env.apiUrl': 'http://47.101.46.79',
    'process.env.wsUrl': 'ws://127.0.0.1:8010',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
