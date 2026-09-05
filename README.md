# DaS云芯

聚合型「工具箱」微信小程序，将日常高频使用的小工具集中到一个入口，纯前端本地计算为主，即开即用。

## 功能特性

- 40 个实用工具，覆盖测算、信息查询、常用工具、娱乐、嵌入式电子五大类
- 主页分类 Tab（emoji 图标 + 胶囊）+ 「热门」卡片（按启动次数动态排序）
- 纯本地计算为主，免登录、零门槛
- 内置单位换算、房贷计算器、BMI、二维码生成/识别、颜色工具、日期计算器、番茄钟、嵌入式工具箱等
- 支持深色模式
- 微信云开发实现工具热度统计

## 工具清单

| 分类 | 工具 |
| --- | --- |
| 测算工具 | 网速测试、计算器、血型计算、关系计算器、一生时间、尺码计算、色盲测试、房贷计算器、尺子、量角器、BMI 计算器 |
| 信息查询 | 粤语翻译、常用号码、今日油价 |
| 常用工具 | 单位换算、颜色工具、手机清灰、尺码换算、日期计算器、番茄钟、随机数、全屏时钟、震动、二维码创建、倒计时、二维码识别 |
| 娱乐工具 | 恶搞理发器、插电充钱 |
| 嵌入式工具 | 色环电阻计算、进制转换、分压计算、定时器计算、协议速查、电子单位换算、LED 限流电阻、欧姆定律、RC 时间常数、ADC 换算、555 定时器、电池续航 |

## 技术栈

- 微信小程序原生框架（WXML / WXSS / JS / JSON）
- 微信云开发（云函数 + 云数据库），用于热门统计

## 目录结构

```
StarTools/
├── miniprogram/          # 小程序源码
│   ├── app.js            # 全局配置（云开发初始化、深色模式）
│   ├── app.json          # 页面注册、分包、TabBar
│   ├── config/
│   │   └── tools.js      # 工具注册表（单一数据源）
│   ├── components/       # 自研通用组件库
│   ├── images/           # 图标与静态资源
│   └── pages/
│       ├── index/        # 主页（分类 Tab + 热门卡片 + 工具列表）
│       ├── home/me/      # 「我的」
│       ├── about/        # 关于页
│       └── my_module/    # 各工具模块
├── cloudfunctions/       # 云函数（微信云开发）
│   ├── reportLaunch/     # 上报工具启动次数
│   └── getHotTools/      # 查询工具启动统计
└── project.config.json   # 工程配置
```

## 快速开始

1. 用微信开发者工具导入项目根目录
2. 将 `project.config.json` 中的 `appid` 替换为你自己的小程序 AppID
3. 编译运行即可

### 启用「热门」统计（需云开发）

1. 开通云开发（开发者工具工具栏「云开发」→ 开通）
2. 创建数据库集合 `tool_stats`
3. 上传云函数：右键 `cloudfunctions/reportLaunch` 与 `getHotTools` →「上传并部署：云端安装依赖」
4. 在 `miniprogram/app.js` 的 `wx.cloud.init()` 中指定你的云环境 ID

> 未开通云开发时，「热门」会自动回退到按 `sort` 静态排序，不影响其他功能。

## 合法域名配置

部分工具需联网访问第三方接口/资源，请在小程序后台「开发管理 → 开发设置 → 服务器域名」中添加以下合法域名：

```
https://mmbiz.qpic.cn;https://res.wx.qq.com;https://apps.bdimg.com;https://fanyi.baidu.com;https://api.fanyi.baidu.com;https://tmini.net;https://www.meiaile.com
```

各接口用途：

- 工具图标：`https://mmbiz.qpic.cn`
- 清灰/理发器音频：`https://res.wx.qq.com`
- 网速测试：`https://apps.bdimg.com`
- 粤语翻译发音：`https://fanyi.baidu.com`
- 粤语翻译 API：`https://api.fanyi.baidu.com`
- 今日油价：`https://tmini.net`
- 粤语翻译背景图（可选）：`https://www.meiaile.com`

## 说明

- 未开通流量主，已移除全部广告位
- 个人主体小程序提审时，需避开「用户生成内容」「加密」「IP 查询」等平台未开放类目（详见项目文档的「审核规则与不可做功能」）
