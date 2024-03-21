---
category: Components
type: 通用
title: Test
subtitle: 测试组件
cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

测试组件

## 何时使用

测试组件

```

## API

### [nz-button]:standalone

> 注意：nz-button 是一个 Directive，除以下表格之外还支持例如 disabled 等原生 button 的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`nzType` -> `nzShape` -> `nzSize` -> `nzLoading` -> `disabled`

按钮的属性说明如下：

| 属性          | 说明                                                             | 类型                                  | 默认值      | 支持全局配置 |
| ------------- | ---------------------------------------------------------------- | ------------------------------------- | ----------- | ------------ |
| `[disabled]`  | 禁止与 button 交互                                               | `boolean`                             | `false`     |
| `[nzGhost]`   | 幽灵属性，使按钮背景透明                                         | `boolean`                             | `false`     |
| `[nzLoading]` | 设置按钮载入状态                                                 | `boolean`                             | `false`     |
| `[nzShape]`   | 设置按钮形状，可选值为 `circle` `round` 或者不设                 | `'circle'\|'round'`                   | -           |              |
| `[nzSize]`    | 设置按钮大小，可选值为 `small` `large` 或者不设                  | `'large'\|'small'\|'default'`         | `'default'` | ✅           |
| `[nzType]`    | 设置按钮类型，可选值为 `primary` `dashed` `text` `link` 或者不设 | `'primary'\|'dashed'\|'link'\|'text'` | -           |
| `[nzBlock]`   | 将按钮宽度调整为其父宽度的选项                                   | `boolean`                             | `false`     |
| `[nzDanger]`  | 设置危险按钮                                                     | boolean                               | `false`     |              |

### nz-button-group:standalone

| 属性       | 说明                                            | 类型                          | 默认值      | 支持全局配置 |
| ---------- | ----------------------------------------------- | ----------------------------- | ----------- | ------------ |
| `[nzSize]` | 设置按钮大小，可选值为 `small` `large` 或者不设 | `'large'\|'small'\|'default'` | `'default'` | -            |
