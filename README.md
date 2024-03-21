# QQSL MATERIAL

该组件库的架构完全基于NG-ZORRO组件库，仅在NG-ZORRO组件库的基础上去掉了双语。组织目录、打包、文档生成等功能的基本实现逻辑并未改动。
且该组件库所依赖的基础组件库也为NG-ZORRO。

## 架构介绍

```.md
// 整体目录结构
├── components 存放组件库代码
│   ├── cdk
│   ├── core 一些组件库开发所需的核心公共代码
│   │   ├── environments
│   │   └── logger
│   ├── demo-test 具体的组件代码
│   ├── style 公共样式，包括主题文件等内容
│   └── version
├── docs 文档网站中的概述性文档，为md文件
├── schematics
├── scripts gulp打包的所需脚本
│   ├── build
│   ├── code-check
│   ├── gulp
│   │   ├── tasks gulp的任务合集
│   │   └── util
│   ├── prerender
│   ├── release
│   ├── schematics
│   │   └── template
│   ├── site
│   │   ├── _site 文档网站模板
│   │   ├── template 其他模板
│   │   └── utils
│   └── tslint-rules

// 单独组件目录
├── button-group.component.ts 组件
├── button.component.ts 组件
├── button.module.ts 组件module
├── button.spec.ts 组件测试文件
├── demo 在文档网站中中展示相应组件的demo
│   ├── basic.md 每一个demo包涵两个同名的md与ts文件
│   ├── basic.ts
│   └── module 为demo中的展示组件提供所以依赖的第三方module
├── doc 与该组件demo一同展示的文档，为md文件
│   └── index.zh-CN.md
├── index.ts
├── ng-package.json
├── public-api.ts
└── style
    ├── entry.less 入口样式文件
    ├── index.less
    ├── mixin.less
```

## 打包

该项目中无论是对组件库的打包还是对文档网站的打包都依赖gulp。
可以从package.json中看到如下代码

``` .json
 {
  "start": "NODE_ENV=development gulp start:dev",
  "build": "gulp build:release",
  "build:lib": "gulp build:library",
  "doc": "gulp build:preview",
 }
```

可以看出，这几个命令都是调用gulp实现的。而gulp是通过./gulpfile.js完成了配置，具体的任务在./scripts/gulp目录下。
