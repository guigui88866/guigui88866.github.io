# 商城

更新日期：2026-10-16

## 需求

- [商城完整需求](需求文档/商城需求.md)：移动端、运营后台、服务端，无表格整理版。

## H5 页面

- [移动端商城](index.html)
- [后台商城列表](admin.html#products)
- [后台购买记录](orders.html)

## 在线预览

- [移动端商城](https://yaloka-store-prototype.wintryvenus4.chatgpt.site/)
- [后台商城列表](https://yaloka-store-prototype.wintryvenus4.chatgpt.site/admin.html#products)
- [后台购买记录](https://yaloka-store-prototype.wintryvenus4.chatgpt.site/admin.html#orders)

## 说明

纯静态 H5，共用 app.js，保留以上文件相对位置后可通过静态服务器预览。后台两个入口共用同一套商城管理菜单。资源、充值和订单均为模拟数据，配置与购买数据通过同源浏览器本地存储联动；不接入正式支付或业务服务。

原型源码基于已发布版本，涵盖动态分类、日单价乘天数、购买抽屉、批量新增、成功商品缩略图及成功订单筛选汇总。
