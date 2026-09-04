// pages/about/about.js
Page({
  data: {
    version: "3.0.0",
    darkMode: false
  },

  onLoad() {
    this.setData({
      darkMode: getApp().globalData.darkMode
    });
  }
})
