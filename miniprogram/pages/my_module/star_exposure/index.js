// 星空曝光计算：500 法则 / NPF 法则，估算不拖星的最长快门时间

const FORMATS = [
  { name: '全画幅 36×24mm', crop: 1.0, pitch: 5.9 },
  { name: 'APS-C 尼康/索尼/富士', crop: 1.5, pitch: 3.9 },
  { name: 'APS-C 佳能', crop: 1.6, pitch: 3.7 },
  { name: 'M4/3', crop: 2.0, pitch: 3.3 },
  { name: '1 英寸', crop: 2.7, pitch: 2.4 }
];

function fmtSec(sec) {
  if (sec < 1) return (Math.round(sec * 100) / 100) + ' s';
  if (sec < 60) return (Math.round(sec * 10) / 10) + ' s';
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m + ' 分 ' + s + ' 秒';
}

Page({
  data: {
    formats: FORMATS.map(f => f.name),
    fIndex: 0,
    focal: '24', // mm
    aperture: '2.8',
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
    const fmt = FORMATS[this.data.fIndex];

    if (isNaN(focal) || isNaN(aperture)) return;
    if (focal <= 0 || aperture <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    // 500 法则：等效焦距越大，可曝光时间越短
    const eqFocal = focal * fmt.crop;
    const t500 = 500 / eqFocal;
    // NPF 法则：兼顾光圈与像素间距，更严格
    const tNpf = (35 * aperture + 30 * fmt.pitch) / focal;

    this.setData({
      result: {
        eqFocal: Math.round(eqFocal * 100) / 100,
        t500: fmtSec(t500),
        tNpf: fmtSec(tNpf),
        crop: fmt.crop
      }
    });
  }
});
