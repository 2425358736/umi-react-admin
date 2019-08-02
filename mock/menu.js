export default {
  // 支持值为 Object 和 Array
  'GET /api/getMenu': (req, res) => {
    res.send({
      status: 200,
      subMsg: '',
      msg: '数据获取成功',
      data: [
        {
          id: 1,
          parentId: 0,
          name: '首页',
          path: '/index',
          icon: 'windows',
          children: [],
        },
        {
          id: 2,
          parentId: 0,
          name: '组态',
          path: '/configuration',
          icon: 'windows',
          children: [
            {
              id: 3,
              parentId: 2,
              name: '组态测试1',
              path: '/configuration/reactGojs',
              children: [],
            },
            {
              id: 4,
              parentId: 2,
              name: '组态测试2',
              path: '/configuration/reactTwoGojs',
              children: [],
            },
          ],
        },
        {
          id: 340,
          parentId: 0,
          name: '新闻管理',
          path: '/news',
          icon: 'profile',
          children: [
            {
              id: 341,
              parentId: 340,
              name: '新闻管理',
              path: '/news/news',
              children: [],
            },
          ],
        },
        {
          id: 2,
          parentId: 0,
          name: '系统设置',
          path: '/sys',
          icon: 'setting',
          children: [
            {
              id: 3,
              parentId: 2,
              name: '用户管理',
              path: '/sys/sysUser',
              children: [],
            },
            {
              id: 306,
              parentId: 2,
              name: '数据字典',
              path: '/sys/sysDict',
              children: [],
            },
            {
              id: 307,
              parentId: 2,
              name: '角色管理',
              path: '/sys/sysRole',
              children: [],
            },
            {
              id: 297,
              parentId: 2,
              name: '权限管理',
              path: '/sys/sysPermission',
              children: [],
            },
            {
              id: 304,
              parentId: 2,
              name: '日志管理',
              path: '/sys/sysLog',
              children: [],
            },
            {
              id: 305,
              parentId: 2,
              name: '站内信管理',
              path: '/sys/sendRecord',
              children: [],
            },
          ],
        },
      ],
    });
  },
};
