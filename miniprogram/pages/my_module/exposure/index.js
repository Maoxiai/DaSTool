// 曝光三要素：光圈 / 快门 / ISO，计算曝光值 EV 与场景参考

const APERTURES = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
const APERTURE_VALUES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const SHUTTERS = ['1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', '1s', '2s', '4s', '8s', '15s', '30s'];
const SHUTTER_VALUES = [1 / 4000, 1 / 2000, 1 / 1000, 1 / 500, 1 / 250, 1 / 125, 1 / 60, 1 / 30, 1 / 15, 1 / 8, 1 / 4, 1 / 2, 1, 2, 4, 8, 15, 30];
const ISOS = ['ISO 50', 'ISO 100', 'ISO 200', 'ISO 400', 'ISO 800', 'ISO 1600', 'ISO 3200', 'ISO 6400', 'ISO 12800'];
const ISO_VALUES = [50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];

function sceneOf(ev) {
  if (ev < 0) return { label: '极暗夜景', desc: '月光/星空，需三脚架与长曝光', color: '#5c6bc0' };
  if (ev < 3) return { label: '夜景', desc: '城市夜景、橱窗灯光', color: '#5c6bc0' };
  if (ev < 6) return { label: '昏暗室内', desc: '室内灯光、黄昏、街景', color: '#42a5f5' };
  if (ev < 9) return { label: '明亮室内', desc: '室内自然光、阴天', color: '#26a69a' };
  if (ev < 12) return { label: '多云 / 阴影', desc: '户外阴影、多云天气', color: '#66bb6a' };
  if (ev < 15) return { label: '晴天', desc: '阳光充足，日常拍摄', color: '#ffa726' };
  if (ev <= 16) return { label: '明亮晴天', desc: '雪地、沙滩等强反光场景', color: '#ef5350' };
  return { label: '极亮', desc: '强光逆光，建议收光圈/加 ND', color: '#e53935' };
}

Page({
  data: {
    apertures: APERTURES,
    shutters: SHUTTERS,
    isos: ISOS,
    aIndex: 5, // f/8
    sIndex: 5, // 1/125
    iIndex: 1, // ISO 100
    ev: '',
    scene: null
  },

  onLoad() {
    this.compute();
  },

  onAperture(e) {
    this.setData({ aIndex: Number(e.detail.value) });
    this.compute();
  },

  onShutter(e) {
    this.setData({ sIndex: Number(e.detail.value) });
    this.compute();
  },

  onIso(e) {
    this.setData({ iIndex: Number(e.detail.value) });
    this.compute();
  },

  compute() {
    const N = APERTURE_VALUES[this.data.aIndex];
    const t = SHUTTER_VALUES[this.data.sIndex];
    const S = ISO_VALUES[this.data.iIndex];
    // EV = log2(N^2 / t) - log2(S / 100)，以 ISO 100 为基准
    const ev = Math.log2((N * N) / t) - Math.log2(S / 100);
    this.setData({
      ev: ev.toFixed(1),
      scene: sceneOf(ev)
    });
  }
});
