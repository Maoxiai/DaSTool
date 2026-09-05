// 打印尺寸换算：像素分辨率 + DPI → 打印尺寸（英寸/厘米）

Page({
  data: {
    width: '4000',  // px
    height: '3000', // px
    dpi: '300',
    result: null,
    error: ''
  },

  onLoad() {
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
    const dpi = parseFloat(this.data.dpi);

    if (isNaN(w) || isNaN(h) || isNaN(dpi)) return;
    if (w <= 0 || h <= 0 || dpi <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    const wIn = w / dpi;
    const hIn = h / dpi;
    const wCm = wIn * 2.54;
    const hCm = hIn * 2.54;

    this.setData({
      result: {
        wIn: (Math.round(wIn * 100) / 100),
        hIn: (Math.round(hIn * 100) / 100),
        wCm: (Math.round(wCm * 10) / 10),
        hCm: (Math.round(hCm * 10) / 10)
      }
    });
  }
});
