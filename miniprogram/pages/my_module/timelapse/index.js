// 延时摄影间隔计算：张数 = 成片时长 × 帧率；间隔 = 拍摄总时长 / 张数

Page({
  data: {
    fpsList: ['24', '25', '30', '60'],
    fpsIndex: 2,
    duration: '10',  // 成片时长（秒）
    totalMin: '60',  // 拍摄总时长（分钟）
    result: null,
    error: ''
  },

  onLoad() {
    this.compute();
  },

  onFps(e) {
    this.setData({ fpsIndex: Number(e.detail.value) });
    this.compute();
  },

  onField(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [key]: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null, error: '' });
    const duration = parseFloat(this.data.duration);
    const totalMin = parseFloat(this.data.totalMin);
    const fps = parseFloat(this.data.fpsList[this.data.fpsIndex]);

    if (isNaN(duration) || isNaN(totalMin) || isNaN(fps)) return;
    if (duration <= 0 || totalMin <= 0 || fps <= 0) {
      this.setData({ error: '参数需大于 0' });
      return;
    }

    const shots = Math.round(duration * fps);
    const totalSec = totalMin * 60;
    const interval = totalSec / shots;

    this.setData({
      result: {
        shots,
        interval: interval >= 10 ? Math.round(interval) : (Math.round(interval * 10) / 10)
      }
    });
  }
});
