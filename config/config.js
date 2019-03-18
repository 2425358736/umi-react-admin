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
          component: './login',
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
          component: './error/401',
        },
        {
          path: '/error/403',
          component: './error/403',
        },
        {
          path: '/error/404',
          component: './error/404',
        },
        {
          path: '/error/500',
          component: './error/500',
        },
        {
          path: '/sys/sysUser',
          component: './sys/sysUser',
        },
        {
          path: '/sys/sysPermission',
          component: './sys/sysPermission',
        },
        {
          path: '/sys/sysDepartment',
          component: './sys/sysDepartment',
        },
        {
          path: '/sys/sysLog',
          component: './sys/sysLog',
        },
        {
          path: '/sys/sendRecord',
          component: './userCenter/SendRecord',
        },
        {
          path: '/sys/insideMail',
          component: './userCenter/InsideMail',
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
