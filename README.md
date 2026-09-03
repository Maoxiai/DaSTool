# DaS云芯

聚合型「工具箱」微信小程序，将日常高频使用的小工具集中到一个入口，纯前端本地功能，无需服务器与云开发，即开即用。

## 功能特性

- 35 个实用工具，覆盖测算、信息查询、图片处理、常用工具、娱乐五大类
- 纯本地计算，免登录、零门槛
- 内置单位换算（含计算机数据存储单位）、计算器、房贷计算器、BMI、二维码生成/识别、文本加解密等
- 底部「主页」「我的」双 Tab，「我的」页支持设置头像与昵称

## 工具清单

| 分类 | 工具 |
| --- | --- |
| 测算工具 | 网速测试、计算器、血型计算、关系计算器、一生时间、尺码计算、色盲测试、房贷计算器、尺子、量角器、BMI 计算器 |
| 信息查询 | 今天吃什么、粤语翻译、IP 查询、常用号码 |
| 图片处理 | 国旗头像、图片拼接、九宫格切图 |
| 常用工具 | 节日倒计时、手机清灰、随机数、大转盘、全屏时钟、取色器、文本解密、弹幕、震动、二维码创建、文本加密、倒计时、二维码识别、单位换算 |
| 娱乐工具 | 恶搞理发器、插电充钱、数钱 |

## 技术栈

- 微信小程序原生框架（WXML / WXSS / JS / JSON）
- 纯前端，无后端、无云开发依赖

## 目录结构

```
StarTools/
├── miniprogram/          # 小程序源码
│   ├── app.js            # 全局配置
│   ├── app.json          # 页面注册与 TabBar
│   ├── components/       # 自研通用组件库
│   ├── images/           # 图标与静态资源
│   └── pages/
│       ├── index/        # 主页（工具列表）
│       ├── home/me/      # 「我的」
│       └── my_module/    # 各工具模块
└── project.config.json   # 工程配置
```

## 快速开始

1. 用微信开发者工具导入项目根目录
2. 将 `project.config.json` 中的 `appid` 替换为你自己的小程序 AppID
3. 编译运行即可

## 合法域名配置

部分工具需联网访问第三方接口，请在小程序后台「开发管理 → 开发设置 → 服务器域名」中添加以下合法域名：

```
https://mmbiz.qpic.cn;https://res.wx.qq.com;https://apps.bdimg.com;https://fanyi.baidu.com;https://api.fanyi.baidu.com;https://whois.pconline.com.cn;https://api.btstu.cn;https://img.xjh.me
```

各接口用途：
- 首页图标地址：`https://mmbiz.qpic.cn`
- 清灰音频：`https://res.wx.qq.com`
- 测速：`https://apps.bdimg.com`
- 粤语翻译发音：`https://fanyi.baidu.com`
- 粤语翻译：`https://api.fanyi.baidu.com`
- 查 IP 归属：`https://whois.pconline.com.cn`
- 每日一图：`https://api.btstu.cn`、`https://img.xjh.me/random_img.php`

## 说明

- 未开通流量主，已移除全部广告位
- 部分需联网的工具（如粤语翻译、IP 查询）依赖第三方公开接口，需在小程序后台配置合法域名