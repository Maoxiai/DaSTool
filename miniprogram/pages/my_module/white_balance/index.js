// 白平衡色温参考：色温 → 颜色预览 + 常见场景预设

// 常见场景色温预设
const PRESETS = [
  { name: '蜡烛', kelvin: 1800 },
  { name: '白炽灯', kelvin: 2800 },
  { name: '日出日落', kelvin: 3200 },
  { name: '暖白荧光灯', kelvin: 3500 },
  { name: '正午阳光', kelvin: 5500 },
  { name: '阴天', kelvin: 6500 },
  { name: '蓝天阴影', kelvin: 7500 },
  { name: '晴朗蓝天', kelvin: 10000 }
];

// 色温转 RGB（近似算法）
function kelvinToRGB(kelvin) {
  const t = kelvin / 100;
  let r, g, b;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  r = Math.round(Math.max(0, Math.min(255, r)));
  g = Math.round(Math.max(0, Math.min(255, g)));
  b = Math.round(Math.max(0, Math.min(255, b)));
  const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  return { hex, r, g, b };
}

Page({
  data: {
    kelvin: 5500,
    color: '#ffd7a3',
    presets: PRESETS,
    presetNames: PRESETS.map(p => p.name),
    desc: ''
  },

  onLoad() {
    this.setData({
      presets: PRESETS.map(p => Object.assign({}, p, { hex: kelvinToRGB(p.kelvin).hex }))
    });
    this.update(5500);
  },

  onSlider(e) {
    this.update(Number(e.detail.value));
  },

  onPreset(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    this.update(PRESETS[idx].kelvin);
  },

  update(kelvin) {
    const c = kelvinToRGB(kelvin);
    let desc = '中性';
    if (kelvin < 3200) desc = '暖色调（偏橙黄）';
    else if (kelvin < 5000) desc = '暖白（偏暖）';
    else if (kelvin < 6000) desc = '中性白（日光）';
    else if (kelvin < 7500) desc = '冷白（偏蓝）';
    else desc = '冷色调（偏深蓝）';
    this.setData({ kelvin, color: c.hex, desc });
  }
});
