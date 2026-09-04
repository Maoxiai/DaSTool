// pages/my_module/pomodoro/index.js
const WORK_OPTIONS = [15, 20, 25, 30, 45, 60];
const BREAK_OPTIONS = [3, 5, 10, 15, 20];

Page({
  data: {
    workMin: 25,
    breakMin: 5,
    workOptions: WORK_OPTIONS,
    breakOptions: BREAK_OPTIONS,
    workIndex: 2,
    breakIndex: 1,
    phase: 'work',
    phaseText: '专注工作',
    total: 25 * 60,
    remaining: 25 * 60,
    timeText: '25:00',
    progress: 0,
    running: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '番茄钟' });
  },

  onUnload() {
    this.stopTimer();
  },

  onTabTap() {},

  // 开始 / 暂停
  onStartPause() {
    if (this.data.running) {
      this.stopTimer();
      this.setData({ running: false });
    } else {
      this.startTimer();
      this.setData({ running: true });
    }
  },

  // 重置当前阶段
  onReset() {
    this.stopTimer();
    const total = this.data.phase === 'work' ? this.data.workMin * 60 : this.data.breakMin * 60;
    this.setData({
      total,
      remaining: total,
      timeText: this.formatTime(total),
      progress: 0,
      running: false
    });
  },

  startTimer() {
    if (this._timer) return;
    this._timer = setInterval(() => {
      if (this.data.remaining <= 1) {
        this.switchPhase();
      } else {
        const remaining = this.data.remaining - 1;
        this.setData({
          remaining,
          timeText: this.formatTime(remaining),
          progress: Math.round((1 - remaining / this.data.total) * 100)
        });
      }
    }, 1000);
  },

  stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },

  switchPhase() {
    const isWork = this.data.phase === 'work';
    const phase = isWork ? 'break' : 'work';
    const total = (isWork ? this.data.breakMin : this.data.workMin) * 60;
    this.setData({
      phase,
      phaseText: isWork ? '休息一下' : '专注工作',
      total,
      remaining: total,
      timeText: this.formatTime(total),
      progress: 0
    });
    wx.vibrateShort({ type: 'heavy' });
    wx.showToast({ title: isWork ? '工作结束，休息一下' : '休息结束，开始工作', icon: 'none' });
  },

  // 自定义工作时长
  onWorkChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ workIndex: idx, workMin: WORK_OPTIONS[idx] });
    if (!this.data.running && this.data.phase === 'work') {
      this.onReset();
    }
  },

  // 自定义休息时长
  onBreakChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ breakIndex: idx, breakMin: BREAK_OPTIONS[idx] });
    if (!this.data.running && this.data.phase === 'break') {
      this.onReset();
    }
  },

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }
});
