// 照片长宽比裁剪：给定原始尺寸与目标比例，计算裁剪后的尺寸

const RATIOS = [
  { name: '1:1（正方形）', w: 1, h: 1 },
  { name: '4:3（传统照片）', w: 4, h: 3 },
  { name: '3:2（相机默认）', w: 3, h: 2 },
  { name: '16:9（宽屏）', w: 16, h: 9 },
  { name: '21:9（电影）', w: 21, h: 9 },
  { name: '9:16（竖屏/短视频）', w: 9, h: 16 },
  { name: '3:4（竖版）', w: 3, h: 4 },
  { name: '2:3（竖版）', w: 2, h: 3 }
];

Page({
  data: {
    ratios: RATIOS.map(r => r.name),
    rIndex: 2,
    width: '4000',
    height: '3000',
    result: null,
    error: ''
  },

  onLoad() {
    this.compute();
  },

  onRatio(e) {
    this.setData({ rIndex: Number(e.detail.value) });
    this.compute();
  },

  onField(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [key]: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null, error: '' });
    const w = parseFloat(this.data.width);
    const h = parseFloat(this.data.height);
    const r = RATIOS[this.data.rIndex];

    if (isNaN(w) || isNaN(h)) return;
    if (w <= 0 || h <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    const origRatio = w / h;
    const targetRatio = r.w / r.h;

    let nw, nh, cutW, cutH;
    if (origRatio > targetRatio) {
      // 原图更宽，裁宽度
      nh = h;
      nw = Math.round(h * targetRatio);
      cutW = w - nw;
      cutH = 0;
    } else {
      // 原图更高，裁高度
      nw = w;
      nh = Math.round(w / targetRatio);
      cutW = 0;
      cutH = h - nh;
    }

    this.setData({
      result: {
        nw,
        nh,
        cutW,
        cutH,
        same: Math.abs(origRatio - targetRatio) < 0.001
      }
    });
  }
});
