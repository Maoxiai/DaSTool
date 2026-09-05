// pages/about/about.js
const { TOOLS, CATEGORY } = require('../../config/tools.js');

Page({
  data: {
    version: "4.0.0",
    darkMode: false,
    toolCount: 0,
    categoryCount: 0,
    _tapCount: 0,
    _tapTimer: null
  },

  onLoad() {
    // 统计工具总数与分类数
    const typeIds = {};
    TOOLS.forEach(t => { typeIds[t.typeId] = true; });
    this.setData({
      darkMode: getApp().globalData.darkMode,
      toolCount: TOOLS.length,
      categoryCount: Object.keys(typeIds).length
    });
  },

  // 连续点击版本号触发彩蛋
  onVersionTap() {
    this.data._tapCount++;
    if (this.data._tapTimer) {
      clearTimeout(this.data._tapTimer);
    }
    this.data._tapTimer = setTimeout(() => {
      this.data._tapCount = 0;
    }, 1500);

    if (this.data._tapCount >= 5) {
      this.data._tapCount = 0;
      wx.showToast({
        title: '🎉 感谢使用 DaS云芯',
        icon: 'none',
        duration: 2000
      });
    }
  }
})
