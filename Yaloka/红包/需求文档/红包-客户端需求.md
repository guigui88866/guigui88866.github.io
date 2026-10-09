# Lucky Bag（幸运红包）— 客户端 PRD

> 状态：草稿（待确认，未正式发布）  
> 时间标准：UTC+5  
> 适用范围：语音直播间、视频直播间

## 一、红包工具入口
- 工具栏 → 基础工具新增「幸运红包 / Lucky Bag」入口。
- 房间内全员可见。
- 点击后拉起「发送红包」弹窗。

## 二、发送红包弹窗

### 1. 顶部 Tab
- Room Lucky Bag
- World Lucky Bag

### 2. 红包配置
| 配置项 | 展示/交互 |
| --- | --- |
| 红包金额 | 金币图标 + 金币数量，选项由服务端返回，默认选第一项 |
| 领取人数 | 展示服务端返回的可选人数，默认选第一项 |
| 开启倒计时 | 展示服务端返回的可选倒计时，默认选第一项 |

### 3. 账户余额
- 展示当前账户 coin 余额。
- 点击余额区域拉起半屏充值弹窗。

### 4. 其他入口
- 「说明」：拉起红包规则说明弹窗。
- 「记录」：拉起用户红包记录弹窗。

### 5. 发送按钮
- 点击「发送」后校验 coin 余额。
- 余额 ≥ 发送金额：正常提交发送请求。
- 余额 < 发送金额：拦截发送并提示余额不足。

### 6. 世界红包横幅展示栏
- 选择「World Lucky Bag」Tab 时展示横幅效果区域。
- 头像使用当前用户头像（未自定义则使用默认头像）。
- 轮播文案：`{Nickname} send a lucky bag,come and receive!`

## 三、全服红包 Banner
- World Lucky Bag 发送成功后，立即向全服用户推送红包 Banner。
- 横幅轮播文案：`{发送人昵称} send a lucky bag,come and receive!`
- 点击 Banner：进入该红包所在房间，并推送对应红包弹窗。
- 红包处于「待开启」「已开启」「已领完」时均按照对应状态展示；实际领取结果以服务端为准。

## 四、发送红包公屏消息
- 用户在房间成功发送房间红包或全服红包后，立即向该房间推送公屏消息。
- 沿用此前预埋的公屏消息样式，房间全员可见。
- 展示内容：
  - 发送用户头像；
  - 主文案：`Sending a lucky bag to brighten everyone's day!`
  - 副文案：`Available in {X}min`
- 倒计时配置为 `Now` 时，副文案倒计时显示 `0min`。

## 五、房间红包挂件

### 1. 适用范围与权限
- 语音直播间、视频直播间，房间内全员可见该功能。
- 对当前用户，存在未失效且本人尚未领取的红包时展示挂件，否则隐藏。

### 2. 多红包展示规则
- 同时存在多个符合条件的红包：已开启红包优先，选失效时间最近的红包。
- 无已开启红包时，选开启时间最近的待开启红包。
- 用户领取红包后，该红包从当前用户挂件及数量统计中移除。
- 红包失效后，从所有用户挂件及数量统计中移除。

### 3. 点击交互
- 点击挂件，打开对应「领取红包」弹窗。

## 六、领取红包弹窗

### 1. 展示内容
- 发送者头像、昵称。
- 红包实际可领取金币数量。
- 「开启」按钮。

### 2. 按钮状态
| 红包状态 | 按钮展示及交互 |
| --- | --- |
| 待开启 | 显示 `mm:ss` 开启倒计时，不可点击 |
| 倒计时结束 | 自动变为 `OPEN` |
| 已开启 | 展示 `OPEN`，点击后提交领取请求并按结果拉起「领取结果」弹窗 |

### 3. 关闭
- 点击关闭按钮，关闭当前红包弹窗列表。

## 七、领取红包弹窗列表

### 1. 自动弹窗触发
- 红包开启前已经进入房间的用户（包含发送者）：红包达到开启时间后自动推送领取红包弹窗列表。
- 红包开启后进入房间的用户：不自动推送。
- 当前已有领取红包弹窗列表时，新红包不重复触发弹窗，仅更新列表。

### 2. 多红包处理
- 列表包含未失效、当前用户尚未领取的红包。
- 一个红包直接展示；多个红包横向轮播。
- 排序：已开启红包优先，失效时间从近到远；未开启红包随后，开启时间从近到远。
- 自动推送或手动打开时，默认展示排序第一的红包。
- 新红包进入列表后重新按规则排序，但不自动切换当前展示项。
- 当前用户领取完成后，当前弹窗保留该红包以展示领取结果；再次打开不展示该用户已领取的红包。
- 红包失效后，从所有用户列表中移除。
- 无可展示红包时，自动关闭领取红包弹窗列表。

## 八、领取结果弹窗

### 1. 领取成功
- 发送者头像、昵称。
- coin 图标、获得的 coin 数量。
- 文案：`You got [金币数量] coin!`

### 2. 领取失败
- 发送者头像、昵称。
- 失败占位图。
- 文案：`You didn't get the reward.`

### 3. 领取详情
- 点击入口拉起「领取详情」弹窗。

## 九、领取详情弹窗

### 1. 顶部信息
- 红包发送用户头像、昵称。
- 进度文案：`X/Y have been received, a total of N/M coins`
  - X：已成功领取人数；
  - Y：红包配置的领取人数；
  - N：已成功领取 coin 数；
  - M：红包实际可领取 coin 总额。

### 2. 领取记录
- 用户头像：不展示头像框，支持动态头像。
- 用户昵称。
- 领取时间：`hh:mm:ss`。
- 领取金额。

## 十、红包记录弹窗

### 1. Tab
- 「发送记录」：当前用户发送的全部红包，包含待开启、领取中、已领完、已失效。
- 「领取记录」：当前用户成功领取且获得 coin > 0 的红包。

### 2. 发送记录
- 按发送时间从近到远排序。
- `Room ID`：发送时所在房间的 Room ID。
- `coin Given Away: X/Y`：X 为已领取 coin 总数，Y 为红包实际可领取 coin 总数。
- `Winners: X/Y`：X 为已领取人数，Y 为配置的领取人数。
- `coin Returned`：失效后实际退回的 coin 数量。
- 创建时间：`YYYY-MM-DD HH:mm:ss`。

### 3. 领取记录
- 按领取时间从近到远排序。
- `Room ID`：领取时所在房间的 Room ID。
- `coin`：本次领取金额。
- `Sender UID`：发送者 UID。
- `Winners: X/Y`：X 为当前已领取人数，Y 为配置的领取人数。
- 领取时间：`YYYY-MM-DD HH:mm:ss`。

### 4. 空状态与展示上限
- 无记录时展示占位图与 `No more data`。
- 每个 Tab 最多展示最近 50 条记录。
- 滑动至列表底部后展示：`Only the latest 50 records are shown.`
- 发送记录和领取记录均支持下拉刷新，刷新后获取最新记录数据。

## 十一、红包规则弹窗

1. You can send a Lucky Bag by spending Coins, and other users can open it to receive a random amount of Coins.

2. A Lucky Bag can be claimed after it opens and remains available for 10 minutes.Any unclaimed Coins will be returned to your wallet after the Lucky Bag expires.

3. After you send a World Lucky Bag, a Lucky Bag banner will appear across the server, attracting more users to your room.

4. A 5% service fee applies when sending a Lucky Bag.

   For example, if you send a Lucky Bag worth 1,000 Coins, 50 Coins (1,000 × 5%) will be charged as the service fee, and 950 Coins will be distributed to users. If no one claims the Lucky Bag, 950 Coins will be returned to your wallet. The service fee is non-refundable.

5. Sending and claiming Lucky Bags will not count toward your regular spending, Wealth, or earnings records.

---
> 本文按已确认的客户端需求整理。与服务端相关的最终领取资格、到账与状态由服务端判断。
