# 商城

更新日期：2026-10-22

## 需求

- [商城完整需求](需求文档/商城需求.md)：移动端、运营后台、服务端，无表格整理版。

## H5 页面

- [移动端商城](index.html)
- [后台商城列表](admin.html#products)
- [后台购买记录](admin.html#orders)
- [后台靓号商品配置](admin.html#ids)

## 文件用途

- `index.html`：客户端商城的页面入口，负责加载商城原型。
- `admin.html`：运营后台的统一页面入口，包含「商城列表」「购买记录」和「靓号商品配置」，通过左侧菜单切换。
- `app.js`：客户端商城与运营后台共用的 JavaScript 文件，处理商品展示、TAB 切换、商品预览、购买弹窗、模拟购买与充值、后台商品配置、购买记录查询等交互逻辑。
- `orders.html`：旧版购买记录独立入口。当前统一通过 `admin.html#orders` 进入购买记录；若旧入口文件仍保留，仅用于跳转兼容，不再维护独立页面。

## 在线预览

- [移动端商城](https://guigui88866.github.io/Yaloka/store/)
- [后台商城列表](https://guigui88866.github.io/Yaloka/store/admin.html#products)
- [后台购买记录](https://guigui88866.github.io/Yaloka/store/admin.html#orders)
- [后台靓号商品配置](https://guigui88866.github.io/Yaloka/store/admin.html#ids)

## 说明

纯静态 H5，共用 app.js，保留以上文件相对位置后可通过静态服务器预览。后台商城列表与购买记录统一通过 admin.html 访问，使用左侧菜单切换。资源、充值和订单均为模拟数据，配置与购买数据通过同源浏览器本地存储联动；不接入正式支付或业务服务。

原型源码基于已发布版本，涵盖装扮商城原有交互，以及新增 ID 分类、官方预设靓号、自定义精准查询、续费与换号、靓号等级价格配置、预设号码批量管理及统一购买记录。靓号相关数据为原型模拟数据，不接入正式业务服务。
