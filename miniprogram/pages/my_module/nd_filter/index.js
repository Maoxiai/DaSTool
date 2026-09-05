// ND 滤镜快门计算：根据 ND 减光档位，计算延长后的曝光时间

const ND_STOPS = [
  { name: 'ND2（1 档）', factor: 2 },
  { name: 'ND4（2 档）', factor: 4 },
  { name: 'ND8（3 档）', factor: 8 },
  { name: 'ND16（4 档）', factor: 16 },
  { name: 'ND32（5 档）', factor: 32 },
  { name: 'ND64（6 档）', factor: 64 },
  { name: 'ND128（7 档）', factor: 128 },
  { name: 'ND256（8 档）', factor: 256 },
  { name: 'ND512（9 档）', factor: 512 },
  { name: 'ND1000（约 10 档）', factor: 1000 }
];

// 将秒数格式化为易读时长
function fmtDuration(sec) {
  if (sec < 1 / 1000) return '< 1/1000 s';
  if (sec < 1) {
    const inv = Math.round(1 / sec);
    return '1/' + inv + ' s';
  }
  if (sec < 60) return (Math.round(sec * 10) / 10) + ' s';
  if (sec < 3600) {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return s ? m + ' 分 ' + s + ' 秒' : m + ' 分';
  }
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return m ? h + ' 小时 ' + m + ' 分' : h + ' 小时';
}

Page({
  data: {
    ndStops: ND_STOPS.map(n => n.name),
    ndIndex: 9, // ND1000
    shutter: '1/125',
    result: null,
    error: ''
  },

  onLoad() {
    this.compute();
  },

  onNd(e) {
    this.setData({ ndIndex: Number(e.detail.value) });
    this.compute();
  },

  onField(e) {
    this.setData({ shutter: e.detail.value });
    this.compute();
  },

  // 解析快门字符串，支持 "1/125" 或 "2"（秒）
  parseShutter(str) {
    str = (str || '').trim();
    if (!str) return NaN;
    if (str.indexOf('/') > -1) {
      const parts = str.split('/');
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (isNaN(num) || isNaN(den) || den === 0) return NaN;
      return num / den;
    }
    return parseFloat(str);
  },

  compute() {
    this.setData({ result: null, error: '' });
    const base = this.parseShutter(this.data.shutter);
    const factor = ND_STOPS[this.data.ndIndex].factor;

    if (isNaN(base)) return;
    if (base <= 0) {
      this.setData({ error: '快门时间需大于 0' });
      return;
    }

    const resultSec = base * factor;
    this.setData({
      result: {
        base: fmtDuration(base),
        result: fmtDuration(resultSec),
        factor: factor
      }
    });
  }
});
