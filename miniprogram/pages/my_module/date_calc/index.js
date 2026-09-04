// pages/my_module/date_calc/index.js
function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function formatDate(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

function todayStr() {
  return formatDate(new Date());
}

function weekdayStr(dateStr) {
  const d = new Date(dateStr);
  return '星期' + '日一二三四五六'[d.getDay()];
}

Page({
  data: {
    tabs: [
      { key: 'diff', name: '日期差' },
      { key: 'age', name: '年龄计算' },
      { key: 'countdown', name: '倒计时' }
    ],
    currentTab: 'diff',
    endDate: '2100-12-31',
    // 日期差
    diffDate1: '',
    diffDate2: '',
    diffDays: 0,
    diffWeeks: '0',
    diffMonths: '0',
    diffWd1: '',
    diffWd2: '',
    // 年龄
    birth: '2000-01-01',
    age: 0,
    daysToNext: 0,
    // 倒计时
    target: '',
    countdownDays: 0
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '日期计算器' });
    const today = todayStr();
    this.setData({
      diffDate1: today,
      diffDate2: today,
      target: today
    }, () => {
      this.calcDiff();
      this.calcAge();
      this.calcCountdown();
    });
  },

  onTabTap(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key });
  },

  // 日期差
  onDiff1Change(e) {
    this.setData({ diffDate1: e.detail.value }, () => this.calcDiff());
  },
  onDiff2Change(e) {
    this.setData({ diffDate2: e.detail.value }, () => this.calcDiff());
  },

  calcDiff() {
    const d1 = new Date(this.data.diffDate1);
    const d2 = new Date(this.data.diffDate2);
    if (isNaN(d1) || isNaN(d2)) return;
    const days = Math.round(Math.abs(d2 - d1) / 86400000);
    this.setData({
      diffDays: days,
      diffWeeks: (days / 7).toFixed(1),
      diffMonths: (days / 30).toFixed(1),
      diffWd1: weekdayStr(this.data.diffDate1),
      diffWd2: weekdayStr(this.data.diffDate2)
    });
  },

  // 年龄
  onBirthChange(e) {
    this.setData({ birth: e.detail.value }, () => this.calcAge());
  },

  calcAge() {
    const birth = new Date(this.data.birth);
    const today = new Date();
    if (isNaN(birth)) return;
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    // 距离下次生日天数
    let nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth < today) {
      nextBirth = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNext = Math.ceil((nextBirth - today) / 86400000);
    this.setData({ age: Math.max(0, age), daysToNext });
  },

  // 倒计时
  onTargetChange(e) {
    this.setData({ target: e.detail.value }, () => this.calcCountdown());
  },

  calcCountdown() {
    const target = new Date(this.data.target);
    if (isNaN(target)) return;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((target - today) / 86400000);
    this.setData({ countdownDays: days });
  }
});
