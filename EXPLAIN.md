# 项目结构

ng-zorro-antd项目使用gulp构建，相关的打包流程均通过gulp连接。
主要的gulp命令有以下几个

```bash
// 起服务
$ npm run gulp start:dev
// 打包ng-zorro-antd-lib到 ./publish 目录下
$ npm run gulp build:library
// 打包文档预览站点到 ./dist 目录下
$ npm run gulp build:preview
// 打包可发布的库到 ./publish 目录下，打包可部署的站点到 ./dist 目录下
$ npm run gulp build:release
// 已上命令可通过help查看
$ npm run gulp help
```

-
