// 景深计算器：根据焦距、光圈、对焦距离与画幅，计算超焦距与前后景深

const FORMATS = [
  { name: '全画幅 36×24mm', coc: 0.03 },
  { name: 'APS-C 尼康/索尼/富士', coc: 0.02 },
  { name: 'APS-C 佳能', coc: 0.019 },
  { name: 'M4/3', coc: 0.015 },
  { name: '1 英寸', coc: 0.011 }
];

function fmt(v) {
  if (v === Infinity) return '∞';
  return (Math.round(v * 100) / 100) + ' m';
}

Page({
  data: {
    formats: FORMATS.map(f => f.name),
    fIndex: 0,
    focal: '50', // mm
    aperture: '8',
    distance: '5', // m
    result: null,
    error: ''
  },

  onLoad() {
    this.compute();
  },

  onFormat(e) {
    this.setData({ fIndex: Number(e.detail.value) });
    this.compute();
  },

  onField(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [key]: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null, error: '' });
    const f = parseFloat(this.data.focal);        // mm
    const N = parseFloat(this.data.aperture);     // f-number
    const s = parseFloat(this.data.distance);     // m
    const c = FORMATS[this.data.fIndex].coc;      // mm

    if (isNaN(f) || isNaN(N) || isNaN(s)) return;
    if (f <= 0 || N <= 0 || s <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    const fM = f / 1000; // 米
    const cM = c / 1000; // 米
    // 超焦距 H = f^2/(N*c) + f （米）
    const H = (fM * fM) / (N * cM) + fM;

    // 近景深 / 远景深
    const near = (s * H) / (H + (s - fM));
    const far = s < H ? (s * H) / (H - (s - fM)) : Infinity;
    const dof = far === Infinity ? Infinity : far - near;
    const front = s - near;
    const back = far === Infinity ? Infinity : far - s;

    this.setData({
      result: {
        hyper: fmt(H),
        near: fmt(near),
        far: fmt(far),
        dof: fmt(dof),
        front: fmt(front),
        back: fmt(back)
      }
    });
  }
});
