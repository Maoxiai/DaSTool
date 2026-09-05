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
  ENTERTAINMENT: { id: 6, name: '娱乐工具' },
  EMBEDDED: { id: 7, name: '嵌入式工具' },
  PHOTO: { id: 8, name: '摄影工具' }
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
  { path: '/pages/my_module/yueyu/index', name: '粤语翻译', des: '粤语翻译', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrREx6YGNCiaEPJuRmoLhI09j1gEJ7P5GulibCfRiagDycfsX18wfmic4RPVTRA/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 10039, type: 'yueyu' },
  { path: '/pages/my_module/phone/phone', name: '常用号码', des: '常用号码', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExo6gFe8YZFeLtreNTUSAjHzQBXiaVEPqEY08mNx5MB9dUgViahjkJrmsA/0?wx_fmt=png', typeId: 3, typeName: '信息查询', sort: 19, type: 'phone' },
  { path: '/pages/my_module/oil_price/index', name: '今日油价', des: '今日油价', icon: '/images/oil_price.svg', typeId: 3, typeName: '信息查询', sort: 28, type: 'oil_price' },
  // 常用工具
  { path: '/pages/my_module/unit_converter/index', name: '单位换算', des: '单位换算', icon: '/images/unit_converter.svg', typeId: 4, typeName: '常用工具', sort: 38, type: 'unit_converter' },
  { path: '/pages/my_module/color/index', name: '颜色工具', des: 'RGB/HEX 互转 · 色卡 · 配色 · 国风色', icon: '🌈', typeId: 4, typeName: '常用工具', sort: 30, type: 'color' },
  { path: '/pages/my_module/size_converter/index', name: '尺码换算', des: '鞋码 · 服装尺码', icon: '👟', typeId: 4, typeName: '常用工具', sort: 24, type: 'size_converter' },
  { path: '/pages/my_module/date_calc/index', name: '日期计算器', des: '日期差 · 年龄 · 倒计时', icon: '📅', typeId: 4, typeName: '常用工具', sort: 22, type: 'date_calc' },
  { path: '/pages/my_module/pomodoro/index', name: '番茄钟', des: '专注计时 · 工作/休息', icon: '🍅', typeId: 4, typeName: '常用工具', sort: 21, type: 'pomodoro' },
  { path: '/pages/my_module/qh/index', name: '手机清灰', des: '手机清灰', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExR9HpNEg866bZSnh7p9cqqyItK8sTAicpFn4NBZWzfbeOaZnibVzAibdFA/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 25, type: 'qh' },
  { path: '/pages/my_module/randomNum/randomNum', name: '随机数', des: '随机数', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExmSLY4KdvUUz5Hj7Y3QRicZmKMYLyh2ia471RCPtPBzpTAOShVicQdGrVw/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 20, type: 'randomNum' },
  { path: '/pages/my_module/clock/clock', name: '全屏时钟', des: '全屏时钟', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExvbibmw02f9OkOddEkkl9pLuhKcHPdVFfiaQXDWdzCmD3nFUG3yAS4PrQ/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 17, type: 'clock' },
  { path: '/pages/my_module/zhendong/index', name: '震动', des: '震动', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExqBzjm2pjBddoxUucITxY1MqvnoyZEHOic8aaIzYRnsEdfD4v95deofw/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 15, type: 'zhendong' },
  { path: '/pages/my_module/createQrcode/createQrcode', name: '二维码创建', des: '二维码创建', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExy2ffasI0lpv51nhY5rhoiaQhHzib4CT71SH7Y53Pc28GQmXUbNrlORtA/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 13, type: 'createQrcode' },
  { path: '/pages/my_module/countDown/countDown', name: '倒计时', des: '倒计时', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExAXfHaTfjFq8Bt5qTQ1zeo2kyianJjRej2ML16LJXh0VagYHGJOUhMLg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 7, type: 'countDown' },
  { path: '/pages/my_module/scanQrcode/scanQrcode', name: '二维码识别', des: '二维码识别', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExAQFM979ncPl52xQLZYuic72YZF7slqam6gYGtaSAQWQ1BrCJEOXgWPg/0?wx_fmt=png', typeId: 4, typeName: '常用工具', sort: 6, type: 'scanQrcode' },
  // 娱乐工具
  { path: '/pages/my_module/eglfq/index', name: '恶搞理发器', des: '恶搞理发器', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExKNPVbnTlttGtic0yvxyGicEhpzMYUC3uv2JgEG76lzv2fuRRnv0nT29Q/0?wx_fmt=png', typeId: 6, typeName: '娱乐工具', sort: 17, type: 'eglfq' },
  { path: '/pages/my_module/money/index', name: '插电充钱', des: '插电充钱', icon: 'https://mmbiz.qpic.cn/mmbiz_png/ncTiaSqpEq9TOFqbxMkzsYYukItmBrRExNZicJKpkh4dTWVuicZicJ9g59OEmSkIVY0jdiagZfHd1JpDm2cJ4nR438g/0?wx_fmt=png', typeId: 6, typeName: '娱乐工具', sort: 14, type: 'money' },
  // 嵌入式工具
  { path: '/pages/my_module/resistor/resistor', name: '色环电阻计算', des: '4/5/6 环阻值识读', icon: '🎨', typeId: 7, typeName: '嵌入式工具', sort: 30, type: 'resistor' },
  { path: '/pages/my_module/converter/converter', name: '进制转换', des: 'HEX/DEC/BIN/OCT', icon: '🔢', typeId: 7, typeName: '嵌入式工具', sort: 28, type: 'converter' },
  { path: '/pages/my_module/divider/divider', name: '分压计算', des: '任填三项求第四项', icon: '⚡', typeId: 7, typeName: '嵌入式工具', sort: 26, type: 'divider' },
  { path: '/pages/my_module/timer/timer', name: '定时器计算', des: 'STM32 PSC/ARR', icon: '⏱️', typeId: 7, typeName: '嵌入式工具', sort: 24, type: 'timer' },
  { path: '/pages/my_module/protocol/protocol', name: '协议速查', des: 'UART/SPI/I2C/CAN', icon: '📡', typeId: 7, typeName: '嵌入式工具', sort: 22, type: 'protocol' },
  { path: '/pages/my_module/units/units', name: '电子单位换算', des: 'dBm/频率/波特率', icon: '📏', typeId: 7, typeName: '嵌入式工具', sort: 20, type: 'units' },
  { path: '/pages/my_module/led/led', name: 'LED 限流电阻', des: '阻值计算与推荐', icon: '💡', typeId: 7, typeName: '嵌入式工具', sort: 18, type: 'led' },
  { path: '/pages/my_module/ohm/ohm', name: '欧姆定律', des: 'V/I/R/P 任填两项', icon: '🔌', typeId: 7, typeName: '嵌入式工具', sort: 16, type: 'ohm' },
  { path: '/pages/my_module/rc/rc', name: 'RC 时间常数', des: '充放电与滤波频率', icon: '⏳', typeId: 7, typeName: '嵌入式工具', sort: 14, type: 'rc' },
  { path: '/pages/my_module/adc/adc', name: 'ADC 换算', des: '读数与电压互转', icon: '📊', typeId: 7, typeName: '嵌入式工具', sort: 12, type: 'adc' },
  { path: '/pages/my_module/ne555/ne555', name: '555 定时器', des: '无稳态/单稳态', icon: '🕐', typeId: 7, typeName: '嵌入式工具', sort: 10, type: 'ne555' },
  { path: '/pages/my_module/battery/battery', name: '电池续航', des: '容量与续航估算', icon: '🔋', typeId: 7, typeName: '嵌入式工具', sort: 8, type: 'battery' },
  // 摄影工具
  { path: '/pages/my_module/exposure/index', name: '曝光三要素', des: '光圈 · 快门 · ISO 曝光计算', icon: '📷', typeId: 8, typeName: '摄影工具', sort: 30, type: 'exposure' },
  { path: '/pages/my_module/dof/index', name: '景深计算器', des: '超焦距 · 前后景深范围', icon: '🔍', typeId: 8, typeName: '摄影工具', sort: 27, type: 'dof' },
  { path: '/pages/my_module/equiv_focal/index', name: '等效焦距', des: '画幅换算 · 等效焦距与光圈', icon: '🔭', typeId: 8, typeName: '摄影工具', sort: 25, type: 'equiv_focal' },
  { path: '/pages/my_module/nd_filter/index', name: 'ND滤镜快门', des: 'ND 减光档 · 延长曝光时间', icon: '🕶️', typeId: 8, typeName: '摄影工具', sort: 23, type: 'nd_filter' },
  { path: '/pages/my_module/composition/index', name: '构图指南', des: '三分法 · 引导线 · 对称等法则', icon: '🖼️', typeId: 8, typeName: '摄影工具', sort: 21, type: 'composition' },
  { path: '/pages/my_module/star_exposure/index', name: '星空曝光', des: '500/NPF 法则 · 不拖星快门', icon: '🌌', typeId: 8, typeName: '摄影工具', sort: 19, type: 'star_exposure' },
  { path: '/pages/my_module/golden_hour/index', name: '黄金时刻', des: '日出日落 · 黄金/蓝调时刻', icon: '🌇', typeId: 8, typeName: '摄影工具', sort: 17, type: 'golden_hour' },
  { path: '/pages/my_module/white_balance/index', name: '白平衡色温', des: '色温预览 · 场景预设', icon: '🌈', typeId: 8, typeName: '摄影工具', sort: 15, type: 'white_balance' },
  { path: '/pages/my_module/print_size/index', name: '打印尺寸', des: '像素 · DPI · 打印尺寸换算', icon: '🖨️', typeId: 8, typeName: '摄影工具', sort: 13, type: 'print_size' },
  { path: '/pages/my_module/hyperfocal/index', name: '超焦距速查', des: '焦距 · 光圈 → 超焦距距离', icon: '🎯', typeId: 8, typeName: '摄影工具', sort: 11, type: 'hyperfocal' },
  { path: '/pages/my_module/timelapse/index', name: '延时摄影', des: '张数 · 间隔时间计算', icon: '⏱️', typeId: 8, typeName: '摄影工具', sort: 9, type: 'timelapse' },
  { path: '/pages/my_module/equiv_dof/index', name: '画幅景深对比', des: '相同视角 · 两画幅景深差异', icon: '📐', typeId: 8, typeName: '摄影工具', sort: 7, type: 'equiv_dof' },
  { path: '/pages/my_module/aspect_ratio/index', name: '长宽比裁剪', des: '目标比例 · 裁剪尺寸计算', icon: '✂️', typeId: 8, typeName: '摄影工具', sort: 5, type: 'aspect_ratio' }
];

module.exports = {
  CATEGORY,
  TOOLS
};
