// pages/my_module/color/index.js
// 国风颜色（中国传统颜色名字 + 色值）
const CHINESE_COLORS = [
  { name: '朱砂', hex: '#FF461F', desc: '赤红如火' },
  { name: '石榴红', hex: '#F20C00', desc: '石榴籽红' },
  { name: '绛红', hex: '#C3272B', desc: '庄重大红' },
  { name: '海棠红', hex: '#DB5A6B', desc: '海棠花色' },
  { name: '酡红', hex: '#DC3023', desc: '酒后微醺' },
  { name: '妃色', hex: '#ED5736', desc: '妃子之红' },
  { name: '胭脂', hex: '#9D2933', desc: '妆面娇红' },
  { name: '桃红', hex: '#F47983', desc: '桃花之色' },
  { name: '藕荷', hex: '#E4C6D0', desc: '莲藕淡粉' },
  { name: '琥珀', hex: '#CA6924', desc: '松脂化石色' },
  { name: '杏红', hex: '#FF8C31', desc: '杏子熟红' },
  { name: '藤黄', hex: '#FFB61E', desc: '藤汁明黄' },
  { name: '鹅黄', hex: '#FFF143', desc: '雏鹅嫩羽' },
  { name: '明黄', hex: '#FFD900', desc: '明艳之黄' },
  { name: '杏黄', hex: '#FFA631', desc: '杏子黄' },
  { name: '姜黄', hex: '#FFC773', desc: '姜汁之黄' },
  { name: '缃色', hex: '#F0C239', desc: '浅黄如桑' },
  { name: '秋香', hex: '#D9B611', desc: '秋日稻香' },
  { name: '驼色', hex: '#C8A15D', desc: '骆驼绒毛色' },
  { name: '茶色', hex: '#B35C44', desc: '茶汤之色' },
  { name: '竹青', hex: '#789262', desc: '竹叶青翠' },
  { name: '葱绿', hex: '#9ED900', desc: '青葱之绿' },
  { name: '松花绿', hex: '#057748', desc: '松花之绿' },
  { name: '石绿', hex: '#16A951', desc: '矿物翠绿' },
  { name: '碧色', hex: '#1BD1A5', desc: '碧玉之色' },
  { name: '缥碧', hex: '#7EC0C0', desc: '碧水青绿' },
  { name: '水色', hex: '#88ADA6', desc: '水光青碧' },
  { name: '苍青', hex: '#A3C6C4', desc: '苍茫青灰' },
  { name: '竹月', hex: '#7F9FAF', desc: '竹间月色' },
  { name: '湖蓝', hex: '#30DFF3', desc: '湖水之蓝' },
  { name: '天青', hex: '#66CCFF', desc: '雨后天青' },
  { name: '靛青', hex: '#177CB0', desc: '蓝靛之色' },
  { name: '石青', hex: '#1685A9', desc: '矿物青蓝' },
  { name: '群青', hex: '#4C8DAE', desc: '青蓝颜料' },
  { name: '宝蓝', hex: '#4B5CC4', desc: '宝石之蓝' },
  { name: '藏蓝', hex: '#3B2E7E', desc: '藏族之蓝' },
  { name: '黛蓝', hex: '#425066', desc: '远山含黛' },
  { name: '鸦青', hex: '#424C50', desc: '鸦羽青黑' },
  { name: '黛紫', hex: '#574266', desc: '黛色偏紫' },
  { name: '玄色', hex: '#622A1D', desc: '玄黑带赤' },
  { name: '墨色', hex: '#50616D', desc: '浓墨之色' },
  { name: '月白', hex: '#D6ECF0', desc: '月下淡青' },
  { name: '米色', hex: '#F5F5DC', desc: '稻米之白' },
  { name: '银红', hex: '#F4D8CD', desc: '银朱淡红' }
];

// 配色推荐方案
const COLOR_SCHEMES = [
  { name: '国风 · 朱砂墨黛', colors: ['#FF461F', '#425066', '#D6ECF0', '#F0C239', '#9D2933'] },
  { name: '国风 · 胭脂月白', colors: ['#9D2933', '#D6ECF0', '#F47983', '#E4C6D0', '#C3272B'] },
  { name: '国风 · 竹青黛蓝', colors: ['#789262', '#425066', '#A3C6C4', '#D6ECF0', '#16A951'] },
  { name: '国风 · 缃色黛紫', colors: ['#F0C239', '#574266', '#E4C6D0', '#CA6924', '#424C50'] },
  { name: '莫兰迪', colors: ['#C9C0B5', '#A3B1A6', '#8C9A9E', '#D4A5A5', '#B8A4C9'] },
  { name: '马卡龙', colors: ['#FFD1DC', '#FFE4B5', '#B5EAD7', '#C7CEEA', '#F5B7B1'] },
  { name: '复古胶片', colors: ['#E8B4A0', '#C27B57', '#5D4037', '#8D6E63', '#D7CCC8'] },
  { name: '清新自然', colors: ['#A8E6CF', '#DCEDC1', '#FFD3B6', '#FFAAA5', '#FF8B94'] },
  { name: '科技蓝', colors: ['#0F4C81', '#2E86C1', '#85C1E9', '#AED6F1', '#D6EAF8'] },
  { name: '秋日暖阳', colors: ['#D97941', '#E8A87C', '#F2C57C', '#8C5A3C', '#B35C44'] },
  { name: '森林绿意', colors: ['#2D6A4F', '#40916C', '#52B788', '#95D5B2', '#D8F3DC'] },
  { name: '紫罗兰', colors: ['#5B3A8E', '#7B5EA7', '#9B86C9', '#C4B5E0', '#6D28D9'] },
  { name: '高级灰', colors: ['#2C2C2C', '#5C5C5C', '#8C8C8C', '#B8B8B8', '#E0E0E0'] },
  { name: '海岸度假', colors: ['#0A9396', '#94D2BD', '#EE9B00', '#CA6702', '#9B2226'] }
];

// 常用色卡
const BASIC_COLORS = [
  { name: '红色', hex: '#FF0000' },
  { name: '橙色', hex: '#FF7F00' },
  { name: '黄色', hex: '#FFFF00' },
  { name: '绿色', hex: '#00FF00' },
  { name: '青色', hex: '#00FFFF' },
  { name: '蓝色', hex: '#0000FF' },
  { name: '紫色', hex: '#8B00FF' },
  { name: '粉色', hex: '#FFC0CB' },
  { name: '棕色', hex: '#A52A2A' },
  { name: '金色', hex: '#FFD700' },
  { name: '银色', hex: '#C0C0C0' },
  { name: '藏青', hex: '#000080' },
  { name: '黑色', hex: '#000000' },
  { name: '白色', hex: '#FFFFFF' },
  { name: '灰色', hex: '#808080' },
  { name: '深灰', hex: '#333333' }
];

// 渐变方向
const GRAD_DIRECTIONS = [
  { name: '上 → 下', angle: '180deg' },
  { name: '左 → 右', angle: '90deg' },
  { name: '下 → 上', angle: '0deg' },
  { name: '左上 → 右下', angle: '135deg' },
  { name: '左下 → 右上', angle: '45deg' }
];

// RGB -> HEX
function rgbToHex(r, g, b) {
  const clamp = v => Math.max(0, Math.min(255, Math.round(Number(v) || 0)));
  return '#' + [clamp(r), clamp(g), clamp(b)]
    .map(v => v.toString(16).padStart(2, '0').toUpperCase())
    .join('');
}

// HEX -> RGB（非法返回 null）
function hexToRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

// RGB -> HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

// HSL -> RGB
function hslToRgb(h, s, l) {
  h = ((Number(h) % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, Number(s) || 0)) / 100;
  l = Math.max(0, Math.min(100, Number(l) || 0)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

// RGB -> HSV
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h, s, v };
}

// HSL -> HEX
function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// 生成色彩和谐色（互补/邻近/三色/分裂互补）
function generateHarmony(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const { h, s, l } = hsl;
  const rotate = dh => hslToHex(h + dh, s, l);
  return [
    { name: '原色', hex: rgbToHex(rgb.r, rgb.g, rgb.b) },
    { name: '互补色', hex: rotate(180) },
    { name: '邻近色', hex: rotate(30) },
    { name: '邻近色', hex: rotate(-30) },
    { name: '三色组', hex: rotate(120) },
    { name: '三色组', hex: rotate(-120) },
    { name: '分裂互补', hex: rotate(150) },
    { name: '分裂互补', hex: rotate(210) }
  ];
}

// 随机生成和谐配色方案（5 色）
function randomScheme() {
  const h = Math.floor(Math.random() * 360);
  const s = 50 + Math.floor(Math.random() * 30);
  const l = 45 + Math.floor(Math.random() * 25);
  return [0, 30, -30, 180, 120].map(dh => hslToHex(h + dh, s, l));
}

// 加权色差（redmean，更接近人眼感知）
function colorDistance(r1, g1, b1, r2, g2, b2) {
  const rmean = (r1 + r2) / 2;
  const dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
  return Math.sqrt((2 + rmean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rmean) / 256) * db * db);
}

// 识别最接近的国风色
function identifyColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const maxDist = colorDistance(0, 0, 0, 255, 255, 255);
  const matches = CHINESE_COLORS.map(c => {
    const crgb = hexToRgb(c.hex);
    const dist = colorDistance(rgb.r, rgb.g, rgb.b, crgb.r, crgb.g, crgb.b);
    return { name: c.name, hex: c.hex, desc: c.desc, dist };
  }).sort((a, b) => a.dist - b.dist);
  const top = matches.slice(0, 5).map(m => ({
    name: m.name, hex: m.hex, desc: m.desc,
    sim: Math.max(0, Math.round(100 - (m.dist / maxDist) * 100))
  }));
  return { best: top[0], top };
}

Page({
  data: {
    tabs: [
      { key: 'convert', name: '颜色转换' },
      { key: 'chinese', name: '国风色' },
      { key: 'identify', name: '颜色识别' },
      { key: 'basic', name: '色卡' },
      { key: 'scheme', name: '配色推荐' },
      { key: 'harmony', name: '色彩和谐' },
      { key: 'gradient', name: '渐变生成' },
      { key: 'random', name: '随机配色' }
    ],
    currentTab: 'convert',
    // 转换
    r: '255', g: '95', b: '21',
    hex: '#FF5F15',
    h: '19', s: '100', l: '54',
    hsvText: '19°, 92%, 100%',
    previewColor: '#FF5F15',
    // 色彩和谐
    harmonyHex: '#FF5F15',
    harmonyColors: [],
    // 渐变
    gradFrom: '#FF5F15',
    gradTo: '#425066',
    gradDirections: GRAD_DIRECTIONS.map(d => d.name),
    gradIndex: 0,
    gradientStyle: 'linear-gradient(180deg, #FF5F15, #425066)',
    gradientCss: 'background: linear-gradient(180deg, #FF5F15, #425066);',
    // 随机
    randomColors: [],
    // 颜色识别
    identifyHex: '#FF5F15',
    identifyResult: null,
    identifyTop: [],
    // 列表
    chineseColors: CHINESE_COLORS,
    basicColors: BASIC_COLORS,
    schemes: COLOR_SCHEMES
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '颜色工具' });
    this.refreshHarmony();
    this.refreshGradient();
    this.refreshRandom();
    this.refreshIdentify();
  },

  onTabTap(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key });
  },

  // ===== 颜色转换 =====
  onRInput(e) { this.setData({ r: e.detail.value }, () => this.applyFromRgb(Number(this.data.r), Number(this.data.g), Number(this.data.b))); },
  onGInput(e) { this.setData({ g: e.detail.value }, () => this.applyFromRgb(Number(this.data.r), Number(this.data.g), Number(this.data.b))); },
  onBInput(e) { this.setData({ b: e.detail.value }, () => this.applyFromRgb(Number(this.data.r), Number(this.data.g), Number(this.data.b))); },

  onHexInput(e) {
    const hex = e.detail.value;
    this.setData({ hex });
    const rgb = hexToRgb(hex);
    if (rgb) this.applyFromRgb(rgb.r, rgb.g, rgb.b);
  },

  onHInput(e) { this.setData({ h: e.detail.value }, () => this.applyFromHsl()); },
  onSInput(e) { this.setData({ s: e.detail.value }, () => this.applyFromHsl()); },
  onLInput(e) { this.setData({ l: e.detail.value }, () => this.applyFromHsl()); },

  applyFromHsl() {
    const rgb = hslToRgb(this.data.h, this.data.s, this.data.l);
    this.applyFromRgb(rgb.r, rgb.g, rgb.b);
  },

  // 以 RGB 为准，派生 HEX/HSL/HSV
  applyFromRgb(r, g, b) {
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);
    this.setData({
      r: String(Math.round(r)),
      g: String(Math.round(g)),
      b: String(Math.round(b)),
      hex,
      h: String(Math.round(hsl.h)),
      s: String(Math.round(hsl.s)),
      l: String(Math.round(hsl.l)),
      hsvText: Math.round(hsv.h) + '°, ' + Math.round(hsv.s) + '%, ' + Math.round(hsv.v) + '%',
      previewColor: hex
    });
  },

  // ===== 色彩和谐 =====
  onHarmonyInput(e) {
    const hex = e.detail.value;
    this.setData({ harmonyHex: hex }, () => this.refreshHarmony());
  },

  refreshHarmony() {
    this.setData({ harmonyColors: generateHarmony(this.data.harmonyHex) });
  },

  // ===== 渐变生成 =====
  onGradFromInput(e) { this.setData({ gradFrom: e.detail.value }, () => this.refreshGradient()); },
  onGradToInput(e) { this.setData({ gradTo: e.detail.value }, () => this.refreshGradient()); },

  onGradDirChange(e) {
    this.setData({ gradIndex: Number(e.detail.value) }, () => this.refreshGradient());
  },

  refreshGradient() {
    const angle = GRAD_DIRECTIONS[this.data.gradIndex].angle;
    const style = 'linear-gradient(' + angle + ', ' + this.data.gradFrom + ', ' + this.data.gradTo + ')';
    this.setData({
      gradientStyle: style,
      gradientCss: 'background: ' + style + ';'
    });
  },

  // ===== 随机配色 =====
  onRandomRefresh() {
    this.refreshRandom();
  },

  refreshRandom() {
    this.setData({ randomColors: randomScheme() });
  },

  // ===== 颜色识别 =====
  onIdentifyInput(e) {
    this.setData({ identifyHex: e.detail.value }, () => this.refreshIdentify());
  },

  refreshIdentify() {
    const result = identifyColor(this.data.identifyHex);
    if (result) {
      this.setData({ identifyResult: result.best, identifyTop: result.top });
    } else {
      this.setData({ identifyResult: null, identifyTop: [] });
    }
  },

  // ===== 复制 =====
  onCopyColor(e) {
    const { hex, name } = e.currentTarget.dataset;
    const label = name ? (name + ' ') : '';
    wx.setClipboardData({
      data: hex,
      success: () => wx.showToast({ title: label + hex + ' 已复制', icon: 'none' })
    });
  },

  onCopyCode(e) {
    const code = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: code,
      success: () => wx.showToast({ title: 'CSS 已复制', icon: 'none' })
    });
  }
});
