// 超焦距速查表：焦距 × 光圈 → 超焦距距离

const FORMATS = [
  { name: '全画幅 36×24mm', coc: 0.03 },
  { name: 'APS-C 尼康/索尼/富士', coc: 0.02 },
  { name: 'APS-C 佳能', coc: 0.019 },
  { name: 'M4/3', coc: 0.015 },
  { name: '1 英寸', coc: 0.011 }
];

const FOCALS = [14, 16, 24, 35, 50, 85, 135];
const APERTURES = [2, 2.8, 4, 5.6, 8, 11, 16];

function fmt(m) {
  if (m >= 100) return Math.round(m) + 'm';
  if (m >= 10) return (Math.round(m * 10) / 10) + 'm';
  return (Math.round(m * 100) / 100) + 'm';
}

function hyperfocal(fmm, N, c) {
  const f = fmm / 1000; // 米
  const cM = c / 1000;  // 米
  return (f * f) / (N * cM) + f; // 米
}

Page({
  data: {
    formats: FORMATS.map(f => f.name),
    fIndex: 0,
    apertures: APERTURES,
    rows: []
  },

  onLoad() {
    this.compute();
  },

  onFormat(e) {
    this.setData({ fIndex: Number(e.detail.value) });
    this.compute();
  },

  compute() {
    const c = FORMATS[this.data.fIndex].coc;
    const rows = FOCALS.map(f => ({
      focal: f + 'mm',
      values: APERTURES.map(N => fmt(hyperfocal(f, N, c)))
    }));
    this.setData({ rows });
  }
});
