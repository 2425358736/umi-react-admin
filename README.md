# 项目介绍

村务后台管理系统

# 技术栈

React + Ant Design + Ant Design Pro + dva + umi + less

# 项目运行

```

git clone https://gitee.com/village_affairs_project/village_front.git

cd village_front

# 安装项目依赖
yarn install

# 启动项目
yarn start

```

# 业务介绍

目录结构

    ├── config                 // 项目配置目录
    │   ├── config.js                 // 项目配置
    ├── scripts
    │   ├── prettier.js         // prettier配置 （格式化代码）
    ├── src                    // 源码目录
    │   ├── assets             // 静态资源
    │   ├── components             // 组件
    │   ├── layouts             // 布局
    │   ├── locales             // 语言
    │   ├── models             // dva models
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.js           // 页面逻辑
    │   │       ├── index.less         // 页面样式
    │   │       ├── Service.js         // 接口
    │   ├── utils              // 常用工具类
    │   ├── defaultSetting.js             // 主题设置
    │   └── global.less            // 全局样式
    ├── eslintrc.js                    // eslint配置
    └── package.json            // 项目依赖
