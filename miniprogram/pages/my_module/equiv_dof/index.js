// 画幅景深对比：相同等效焦距（相同视角）下，两个画幅的景深差异

const FORMATS = [
  { name: '全画幅 36×24mm', crop: 1.0, coc: 0.03 },
  { name: 'APS-C 尼康/索尼/富士', crop: 1.5, coc: 0.02 },
  { name: 'APS-C 佳能', crop: 1.6, coc: 0.019 },
  { name: 'M4/3', crop: 2.0, coc: 0.015 },
  { name: '1 英寸', crop: 2.7, coc: 0.011 }
];

function fmt(v) {
  if (v === Infinity) return '∞';
  return (Math.round(v * 100) / 100) + ' m';
}

// 计算景深范围，返回近界/远界/总景深
function dofRange(fmm, N, s, coc) {
  const fM = fmm / 1000;
  const cM = coc / 1000;
  const H = (fM * fM) / (N * cM) + fM;
  const near = (s * H) / (H + (s - fM));
  const far = s < H ? (s * H) / (H - (s - fM)) : Infinity;
  const dof = far === Infinity ? Infinity : far - near;
  return { near, far, dof };
}

Page({
  data: {
    formats: FORMATS.map(f => f.name),
    aIndex: 0,
    bIndex: 1,
    eqFocal: '50',    // 等效全画幅焦距 mm
    aperture: '2.8',
    distance: '5',    // 对焦距离 m
    result: null,
    error: ''
  },

  onLoad() {
    this.compute();
  },

  onA(e) {
    this.setData({ aIndex: Number(e.detail.value) });
    this.compute();
  },

  onB(e) {
    this.setData({ bIndex: Number(e.detail.value) });
    this.compute();
  },

  onField(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [key]: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null, error: '' });
    const eqFocal = parseFloat(this.data.eqFocal);
    const aperture = parseFloat(this.data.aperture);
    const distance = parseFloat(this.data.distance);
    const A = FORMATS[this.data.aIndex];
    const B = FORMATS[this.data.bIndex];

    if (isNaN(eqFocal) || isNaN(aperture) || isNaN(distance)) return;
    if (eqFocal <= 0 || aperture <= 0 || distance <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    // 相同视角：实际焦距 = 等效焦距 / 裁切系数
    const fA = eqFocal / A.crop;
    const fB = eqFocal / B.crop;
    const dA = dofRange(fA, aperture, distance, A.coc);
    const dB = dofRange(fB, aperture, distance, B.coc);

    this.setData({
      result: {
        aName: A.name,
        bName: B.name,
        fA: Math.round(fA * 10) / 10,
        fB: Math.round(fB * 10) / 10,
        eqApertureA: Math.round(aperture * A.crop * 10) / 10,
        eqApertureB: Math.round(aperture * B.crop * 10) / 10,
        dofA: fmt(dA.dof),
        dofB: fmt(dB.dof),
        nearA: fmt(dA.near),
        nearB: fmt(dB.near),
        farA: fmt(dA.far),
        farB: fmt(dB.far)
      }
    });
  }
});
