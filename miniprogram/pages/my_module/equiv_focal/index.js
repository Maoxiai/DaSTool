// 等效焦距换算：不同画幅镜头的等效全画幅焦距与等效光圈

const FORMATS = [
  { name: '全画幅 36×24mm', crop: 1.0 },
  { name: 'APS-C 尼康/索尼/富士', crop: 1.5 },
  { name: 'APS-C 佳能', crop: 1.6 },
  { name: 'M4/3', crop: 2.0 },
  { name: '1 英寸', crop: 2.7 },
  { name: '1/2.3 英寸（手机）', crop: 5.6 }
];

function fmt(v) {
  return (Math.round(v * 100) / 100);
}

Page({
  data: {
    formats: FORMATS.map(f => f.name),
    fIndex: 1,
    focal: '35', // 实际焦距 mm
    aperture: '1.8',
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
    const focal = parseFloat(this.data.focal);
    const aperture = parseFloat(this.data.aperture);
    const crop = FORMATS[this.data.fIndex].crop;

    if (isNaN(focal) || isNaN(aperture)) return;
    if (focal <= 0 || aperture <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    this.setData({
      result: {
        eqFocal: fmt(focal * crop),
        eqAperture: fmt(aperture * crop),
        crop: crop
      }
    });
  }
});
