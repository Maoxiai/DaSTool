// 随机乐园：随机数 / 骰子 / 硬币 / 抽数字 四种玩法
const DICE_SYMBOLS = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

Page({
  data: {
    mode: 'number',
    // 随机数
    num1: 1,
    num2: 100,
    result: '?',
    // 骰子
    diceCount: 1,
    diceResults: [1],
    diceTotal: 1,
    diceSymbols: DICE_SYMBOLS,
    // 硬币
    coinSide: '正',
    coinSymbol: '🪙',
    // 抽数字
    pickMin: 1,
    pickMax: 100,
    pickCount: 3,
    pickResults: [],
    // 通用
    rolling: false,
    history: []
  },

  onLoad() {
    const num1 = wx.getStorageSync('num1');
    const num2 = wx.getStorageSync('num2');
    if (num1) this.setData({ num1 });
    if (num2) this.setData({ num2 });
  },

  onUnload() {
    this.clearTimer();
  },

  onHide() {
    this.clearTimer();
  },

  clearTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  },

  switchMode(e) {
    this.clearTimer();
    this.setData({ mode: e.currentTarget.dataset.mode, rolling: false });
  },

  incDice() {
    if (this.data.diceCount < 6) {
      const results = this.data.diceResults.concat([1]);
      this.setData({ diceCount: this.data.diceCount + 1, diceResults: results, diceTotal: results.reduce((a, b) => a + b, 0) });
    }
  },

  decDice() {
    if (this.data.diceCount > 1) {
      const results = this.data.diceResults.slice(0, -1);
      this.setData({ diceCount: this.data.diceCount - 1, diceResults: results, diceTotal: results.reduce((a, b) => a + b, 0) });
    }
  },

  onField(e) {
    const key = e.currentTarget.dataset.key;
    let v = parseInt(e.detail.value, 10);
    if (isNaN(v)) v = 0;
    this.setData({ [key]: v });
    if (key === 'num1') wx.setStorageSync('num1', v);
    if (key === 'num2') wx.setStorageSync('num2', v);
  },

  vibrate() {
    if (wx.vibrateShort) wx.vibrateShort({ type: 'medium' });
  },

  addHistory(icon, text) {
    const history = [{ icon, text }].concat(this.data.history).slice(0, 10);
    this.setData({ history });
  },

  clearHistory() {
    this.setData({ history: [] });
  },

  go() {
    if (this.data.rolling) return;
    if (this.data.mode === 'number') this.rollNumber();
    else if (this.data.mode === 'dice') this.rollDice();
    else if (this.data.mode === 'coin') this.flipCoin();
    else this.pickNumbers();
  },

  // 随机数：老虎机式快速滚动后定格
  rollNumber() {
    const min = Math.min(this.data.num1, this.data.num2);
    const max = Math.max(this.data.num1, this.data.num2);
    if (isNaN(min) || isNaN(max) || min > max) {
      wx.showToast({ title: '请设置合理的范围', icon: 'none' });
      return;
    }
    const total = max - min;
    const steps = 18 + Math.floor(Math.random() * 8);
    let count = 0;
    this.clearTimer();
    this.setData({ rolling: true });
    this._timer = setInterval(() => {
      count++;
      this.setData({ result: min + Math.floor(Math.random() * (total + 1)) });
      if (count >= steps) {
        this.clearTimer();
        const final = min + Math.floor(Math.random() * (total + 1));
        this.setData({ result: final, rolling: false });
        this.vibrate();
        this.addHistory('🔢', min + ' ~ ' + max + ' → ' + final);
      }
    }, 60);
  },

  // 骰子：多颗骰子滚动后定格并求和
  rollDice() {
    const count = Math.max(1, Math.min(6, this.data.diceCount));
    const steps = 14 + Math.floor(Math.random() * 6);
    let step = 0;
    this.clearTimer();
    this.setData({ rolling: true });
    this._timer = setInterval(() => {
      step++;
      const results = [];
      for (let i = 0; i < count; i++) results.push(1 + Math.floor(Math.random() * 6));
      this.setData({
        diceResults: results,
        diceTotal: results.reduce((a, b) => a + b, 0)
      });
      if (step >= steps) {
        this.clearTimer();
        this.vibrate();
        this.setData({ rolling: false });
        this.addHistory('🎲', '掷 ' + count + ' 颗骰子 → ' + this.data.diceResults.join('、') + '（和 ' + this.data.diceTotal + '）');
      }
    }, 70);
  },

  // 硬币：快速翻转正反面
  flipCoin() {
    const steps = 10 + Math.floor(Math.random() * 6);
    let step = 0;
    this.clearTimer();
    this.setData({ rolling: true });
    this._timer = setInterval(() => {
      step++;
      const side = Math.random() < 0.5 ? '正' : '反';
      this.setData({ coinSide: side, coinSymbol: side === '正' ? '🪙' : '🪙' });
      if (step >= steps) {
        this.clearTimer();
        const final = Math.random() < 0.5 ? '正' : '反';
        this.setData({ coinSide: final, coinSymbol: final === '正' ? '🙂' : '👑', rolling: false });
        this.vibrate();
        this.addHistory('🪙', '抛硬币 → ' + final);
      }
    }, 70);
  },

  // 抽数字：从范围内不重复抽取 N 个
  pickNumbers() {
    const min = parseInt(this.data.pickMin, 10);
    const max = parseInt(this.data.pickMax, 10);
    const n = parseInt(this.data.pickCount, 10);
    if (isNaN(min) || isNaN(max) || isNaN(n)) {
      wx.showToast({ title: '请填写范围与数量', icon: 'none' });
      return;
    }
    if (max - min + 1 < n || n < 1) {
      wx.showToast({ title: '数量需在范围内', icon: 'none' });
      return;
    }
    const pool = [];
    for (let i = min; i <= max; i++) pool.push(i);
    const picked = [];
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    this.setData({ pickResults: picked });
    this.vibrate();
    this.addHistory('🎯', '抽 ' + n + ' 个 → ' + picked.join('、'));
  },

  onShareAppMessage() {
    return { title: '随机乐园：随机数/骰子/硬币/抽数字', path: '/pages/my_module/randomNum/randomNum' };
  },
  onShareTimeline() {
    return { title: '随机乐园：随机数/骰子/硬币/抽数字', path: '/pages/my_module/randomNum/randomNum' };
  }
});