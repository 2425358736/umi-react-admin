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
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          component: './Index',
        },
        {
          path: '/user/login',
          component: './login/Index',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/index' },
        // dashboard
        {
          path: '/index',
          component: './Index',
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
          path: '/sys/sysPermission',
          component: './sys/sysPermission/Index',
        },
        {
          path: '/sys/sysDepartment',
          component: './sys/sysDepartment/Index',
        },
        {
          path: '/sys/sysLog',
          component: './sys/sysLog/Index',
        },
        {
          path: '/sys/sendRecord',
          component: './userCenter/sendRecord/Index',
        },
        {
          path: '/sys/insideMail',
          component: './userCenter/insideMail/Index',
        },
        {
          path: '/sys/sysUser',
          component: './sys/sysUser/Index',
        },
        {
          path: '/sys/sysDict',
          component: './sys/sysDict/index',
        },
        {
          path: '/profile',
          component: './profile/index',
        },
        {
          path: '/member/department',
          component: './member/memberDepartment/Index',
        },
        {
          path: '/memberRegion/region',
          component: './member/memberRegion/Index',
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
    'process.env.apiUrl': 'http://117.73.8.92:8091',
    'process.env.wsUrl': 'ws://117.73.8.92:8091',
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
