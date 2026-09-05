getApp();
Page({
  data: {
    l1: 0,
    l2: 0,
    l3: "1990年1月",
    l4: "1990-01",
    l5: "life_time",
    l6: 0,
    monthPassed: 0,
    monthLeft: 900,
    percent: 0
  },
  onLoad: function (t) {
    var i = this;
    wx.getStorage({
      key: this.data.l5,
      success: function (t) {
        i.setData({ l6: t.data });
      }
    });
    var e = 74 * wx.getSystemInfoSync().windowWidth / 75,
      n = parseInt((e - 2) / 30);
    e = 30 * n + 2;
    this.setData({
      l1: e,
      singleWidth: n
    });
  },
  onReady: function () {
    var t = wx.getStorageSync("lift_time_birth_date");
    if (t && t.length > 0) {
      this.processDate(t, false);
    } else {
      this.drawGrid(0);
      this.updateStats(0);
    }
  },
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {
    this.currentNum = this.monthNum;
    this.isAnimating = false;
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      title: "一生时间",
      path: "/pages/my_module/life_time/life_time"
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "一生时间",
      path: "/pages/my_module/life_time/life_time"
    };
  },

  // 更新统计数字（与格子动画联动）
  updateStats: function (n) {
    this.setData({
      monthPassed: n,
      monthLeft: 900 - n,
      percent: Math.round(n / 900 * 100)
    });
  },

  drawGrid: function (t) {
    var i = this.data.l1,
      e = this.data.singleWidth,
      n = wx.createCanvasContext("canvas-grid");
    if (n.setFillStyle("#8ac6d1"), t > 0)
      for (var a = 0; a < 30; a++) {
        for (var r = false, s = 0; s < 30; s++)
          if (n.fillRect(s * e + 1, a * e + 1, e, e),
            30 * a + s >= t - 1) {
            r = true;
            break;
          }
        if (r) break;
      }
    for (n.setStrokeStyle("#e0e0e0"), n.strokeRect(0, 0, i, i), a = 0; a < 30; a++)
      for (s = 0; s < 30; s++) n.strokeRect(s * e + 1, a * e + 1, e, e);
    n.draw();
  },

  // 逐格填充动画（约 1.5 秒完成，速度随差距自适应）
  drawGridWithAnim: function () {
    var t = this;
    this.drawGrid(this.currentNum);
    this.updateStats(this.currentNum);
    if (this.currentNum !== this.monthNum) {
      var diff = Math.abs(this.monthNum - this.currentNum);
      var step = Math.max(1, Math.round(diff / 90));
      setTimeout(function () {
        t.isAnimating = true;
        t.currentNum > t.monthNum ? (t.currentNum -= step) : (t.currentNum += step);
        t.drawGridWithAnim();
      }, 16);
    } else {
      this.isAnimating = false;
    }
  },

  bindDateChange: function (t) {
    this.processDate(t.detail.value, true);
  },

  processDate: function (t, i) {
    var e = new Date(),
      n = e.getFullYear(),
      a = e.getMonth() + 1;
    var r = t.split("-"),
      s = parseInt(r[0]),
      o = parseInt(r[1]);
    if (s > n || (s == n && o > a)) {
      this.showModal("所选时间超过当前时间");
    } else {
      var h = 12 * (n - s) + (a - o);
      if (h >= 720 && i && !this.shownWish) {
        this.showModal("祝愿身体健康");
        this.shownWish = true;
      }
      if (h > 900) h = 900;
      if (i) {
        this.currentNum = this.currentNum || 0;
        this.monthNum = h;
        if (!this.isAnimating) this.drawGridWithAnim();
      } else {
        this.monthNum = this.currentNum = h;
        this.drawGrid(h);
        this.updateStats(h);
      }
      this.setData({
        l4: t,
        l3: this.formatDateText(t)
      });
      wx.setStorage({
        key: "lift_time_birth_date",
        data: t
      });
    }
  },
  formatDateText: function (t) {
    return (t = t.split("-"))[0] + "年" + parseInt(t[1]) + "月";
  },
  showModal: function (t) {
    wx.showModal({
      title: "温馨提示",
      content: t,
      showCancel: false
    });
  }
});
