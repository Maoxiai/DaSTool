/**
 * DaS云芯 工具注册表（单一数据源）
 *
 * 统一维护所有工具的元数据，主页列表与分包页面均由这里派生。
 * 新增工具：在 TOOLS 中追加一条记录，并在 app.json 的分包 pages 中登记页面。
 * 删除工具：从 TOOLS 中移除，并同步移除 app.json 分包 pages 与对应目录。
 */

/**
 * 工具分类（权威定义）
 * @enum {{id: number, name: string}}
 */
const CATEGORY = {
  MEASURE: { id: 2, name: '测算工具' },
  INFO: { id: 3, name: '信息查询' },
  COMMON: { id: 4, name: '常用工具' },
  IMAGE: { id: 5, name: '图片处理' },
  ENTERTAINMENT: { id: 6, name: '娱乐工具' }
};

/**
 * @typedef {Object} ToolMeta
 * @property {string} path 页面路径（以 / 开头）
 * @property {string} name 工具名称
 * @property {string} des 工具描述
 * @property {string} icon 图标地址（网络 URL 或 /images/ 本地路径）
 * @property {number} typeId 分类 ID（对应 CATEGORY 中的 id）
 * @property {string} typeName 分类名称（对应 CATEGORY 中的 name）
 * @property {number} sort 排序权重（降序，越大越靠前）
 * @property {string} type 工具标识（与目录名一致）
 */

/** @type {ToolMeta[]} 工具注册表 */
const TOOLS = [
  // 测算工具
  { path: '/pages/my_module/networkSpeed/networkSpeed', name: '网速测试', des: '网速测试', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExibJJtJW5ibnibBd4dGttkiabcDXPrRXgLsfpY6KsX7yz1IfjX29Hd7dUjg/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 35, type: 'networkSpeed' },
  { path: '/pages/my_module/calc/index', name: '计算器', des: '计算器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx4qlSqeickMzuyaWiahAHb9hEVFDva36Vib3VEsxmnbWbes5rEhdKQJm1g/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 23, type: 'calc' },
  { path: '/pages/my_module/blood/blood', name: '血型计算', des: '血型计算', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExzsmdiagNFrJsWeCPOz9DGVMW75w7oymKHGPfgoy7LrBlTjdEpNsMeCA/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 19, type: 'blood' },
  { path: '/pages/my_module/calc_relative/index', name: '关系计算器', des: '关系计算器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExQ500GkQpIZ9iaEGtYzgYjHibBFiaPgE8LN56ylDaIicuEBtwhrOibv90emg/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 19, type: 'calc_relative' },
  { path: '/pages/my_module/life_time/life_time', name: '一生时间', des: '一生时间', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExvbibmw02f9OkOddEkkl9pLuhKcHPdVFfiaQXDWdzCmD3nFUG3yAS4PrQ/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 17, type: 'life_time' },
  { path: '/pages/my_module/calc_size/index', name: '尺码计算', des: '尺码计算', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExGR0SgZuic8J0YKbicgADY7sN7rKqyfEcJ0OSSNlQ1iaFia2JtE7g8DtsLw/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 15, type: 'calc_size' },
  { path: '/pages/my_module/blind/blind', name: '色盲测试', des: '色盲测试', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExCkcQbVk0Ku9dRevm66XSgsHDHbcsHWOFpIj0UiaAyLgFsobgw7WrmsQ/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 14, type: 'blind' },
  { path: '/pages/my_module/calc_mortgage/index', name: '房贷计算器', des: '房贷计算器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx0IT5JxYDHpseIJaIjL5uJ3WXP2aUkJq2FUbjJSQVia6iaicAnaeNGDIibA/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 13, type: 'calc_mortgage' },
  { path: '/pages/my_module/ruler/ruler', name: '尺子', des: '尺子', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExyBJ4SqhlBBnW42OdW36aSibZ8LaVb08Fhxia804su48ElnD4ZswS3P8w/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 13, type: 'ruler' },
  { path: '/pages/my_module/protractor/protractor', name: '量角器', des: '量角器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExicBVIpY8NJho1afRzl9wRoKefo3YBWJI7TnWsfm7L5gc125a2ULNYHA/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 13, type: 'protractor' },
  { path: '/pages/my_module/bmi/bmi', name: 'BMI计算器', des: 'bmi', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExkABNbQkOr9Z4Rnkl8MTiavuqhbNf8Bicts7iaWyy7hg72iaT6FDkcvHZ7A/0?wx_fmt=png', typeId: 2, typeName: '测算工具', sort: 12, type: 'bmi' },
  // 信息查询
  { path: '/pages/my_module/eat/index', name: '今天吃什么', des: '今天吃什么', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExKsoKhxOHicbYiaPBibkmmyZ9xLWen02OP9Mc5DtSnFBWQVY4Upy8SDl4g/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 10201, type: 'eat' },
  { path: '/pages/my_module/yueyu/index', name: '粤语翻译', des: '粤语翻译', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx6YGNCiaEPJuRmoLhI09j1gEJ7P5GulibCfRiagDycfsX18wfmic4RPVTRA/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 10039, type: 'yueyu' },
  { path: '/pages/my_module/ip_info/index', name: 'Ip查询', des: 'Ip查询', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExdcxFsBj9G7zlwLDNOV4fcLWY6g9PEfCbttsic1MmzcJX4U2AFp7P2tg/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 21, type: 'ip_info' },
  { path: '/pages/my_module/phone/phone', name: '常用号码', des: '常用号码', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExo6gFe8YZFeLtreNTUSAjHzQBXiaVEPqEY08mNx5MB9dUgViahjkJrmsA/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 19, type: 'phone' },
  { path: '/pages/my_module/oil_price/index', name: '今日油价', des: '今日油价', icon: '/images/oil_price.svg', typeId: 3, typeName: '信息查询', sort: 28, type: 'oil_price' },
  // 图片处理
  { path: '/pages/my_module/flag/index', name: '国旗头像', des: '国旗头像制作', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExj30pb3goE7AlK8xibkopNDwlMicXAuYSs1scoWYe8sMnLaHjAqN2vrzA/0?wx_fmt=png', typeId: 5, typeName: '图片处理', sort: 12032, type: 'flag' },
  { path: '/pages/my_module/screenshotConnect/screenshotConnect', name: '图片拼接', des: '图片拼接', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExE7CJh4GVGQTZJBqxDvOHZ0k5v9wLhVA6iaoak3AP4f3LSmyeWJKqMqg/0?wx_fmt=png', typeId: 5, typeName: '图片处理', sort: 17, type: 'screenshotConnect' },
  { path: '/pages/my_module/cuttingNine/cuttingNine', name: '九宫格切图', des: '九宫格切图', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExcFAmA6sNfLic8TqU8xysqYlYWIibvUlfMUNtsoAfksyAQCCE9fIAkD7w/0?wx_fmt=png', typeId: 5, typeName: '图片处理', sort: 11, type: 'cuttingNine' },
  // 常用工具
  { path: '/pages/my_module/timejs/index', name: '节日倒计时', des: '节日倒计时', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExB0ZnfOUoibI1pybZSetK3hWuk35AwngjCyz4YJyF86on4k5ztmGJLPg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 34, type: 'timejs' },
  { path: '/pages/my_module/unit_converter/index', name: '单位换算', des: '单位换算', icon: '/images/unit_converter.svg', typeId: 4, typeName: '常用工具', sort: 38, type: 'unit_converter' },
  { path: '/pages/my_module/qh/index', name: '手机清灰', des: '手机清灰', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExR9HpNEg866bZSnh7p9cqqyItK8sTAicpFn4NBZWzfbeOaZnibVzAibdFA/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 25, type: 'qh' },
  { path: '/pages/my_module/randomNum/randomNum', name: '随机数', des: '随机数', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExmSLY4KdvUUz5Hj7Y3QRicZmKMYLyh2ia471RCPtPBzpTAOShVicQdGrVw/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 20, type: 'randomNum' },
  { path: '/pages/my_module/bigWheel/bigWheel', name: '大转盘', des: '大转盘', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExG9jYd34pbJDvxsTdfmRsCUdGlZxVDCO0AQicQL16Oib3IhkyiaeIbZrjw/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 19, type: 'bigWheel' },
  { path: '/pages/my_module/clock/clock', name: '全屏时钟', des: '全屏时钟', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExvbibmw02f9OkOddEkkl9pLuhKcHPdVFfiaQXDWdzCmD3nFUG3yAS4PrQ/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 17, type: 'clock' },
  { path: '/pages/my_module/quse/index', name: '取色器', des: '取色器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx4dwpV26hicTzH0ZmHjWJln0ia6EG0gcq6Tj4eAUJfA0P0dZQWy4OOdWg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 17, type: 'quse' },
  { path: '/pages/my_module/crypt/decrypt', name: '文本解密', des: '文本解密', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExW5rdXcicxibAfzH0x4ibOzBQt8KPwF8qEahy27iccH22jWjVmF8b3nWqibA/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 16, type: 'decrypt' },
  { path: '/pages/my_module/danmu/danmu', name: '弹幕', des: '弹幕', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx4XGibicFeGKB3QJ0TcLMCXBr9XXW7Av4bfqw2weuwPlYEsr7nc2yeZ0A/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 15, type: 'danmu' },
  { path: '/pages/my_module/zhendong/index', name: '震动', des: '震动', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExqBzjm2pjBddoxUucITxY1MqvnoyZEHOic8aaIzYRnsEdfD4v95deofw/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 15, type: 'zhendong' },
  { path: '/pages/my_module/createQrcode/createQrcode', name: '二维码创建', des: '二维码创建', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExy2ffasI0lpv51nhY5rhoiaQhHzib4CT71SH7Y53Pc28GQmXUbNrlORtA/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 13, type: 'createQrcode' },
  { path: '/pages/my_module/crypt/crypt', name: '文本加密', des: '文本加密', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExgWuQKyicUvRsFUsQQjFsfNLV8cEAnD6NS0sMnC0RMamnb9udepdkiaUQ/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 12, type: 'crypt' },
  { path: '/pages/my_module/countDown/countDown', name: '倒计时', des: '倒计时', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExAXfHaTfjFq8Bt5qTQ1zeo2kyianJjRej2ML16LJXh0VagYHGJOUhMLg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 7, type: 'countDown' },
  { path: '/pages/my_module/scanQrcode/scanQrcode', name: '二维码识别', des: '二维码识别', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExAQFM979ncPl52xQLZYuic72YZF7slqam6gYGtaSAQWQ1BrCJEOXgWPg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 6, type: 'scanQrcode' },
  // 娱乐工具
  { path: '/pages/my_module/eglfq/index', name: '恶搞理发器', des: '恶搞理发器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExKNPVbnTlttGtic0yvxyGicEhpzMYUC3uv2JgEG76lzv2fuRRnv0nT29Q/0?wx_fmt=png', typeId: 6, typeName: '娱乐工具', sort: 17, type: 'eglfq' },
  { path: '/pages/my_module/money/index', name: '插电充钱', des: '插电充钱', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExNZicJKpkh4dTWVuicZicJ9g59OEmSkIVY0jdiagZfHd1JpDm2cJ4nR438g/0?wx_fmt=png', typeId: 6, typeName: '娱乐工具', sort: 14, type: 'money' },
  { path: '/pages/my_module/count_money/money', name: '数钱', des: '数钱', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx1FXVf32zWNUdrKhKrjWib4bhg1gVDvgkTKwMyFBjay2KhrXl5ia8JZfA/0?wx_fmt=png', typeId: 6, typeName: '娱乐工具', sort: 13, type: 'count_money' }
];

module.exports = {
  CATEGORY,
  TOOLS
};
