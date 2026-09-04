//app.js
var uuid;
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-d6g4h3r3b557b9b57',
        traceUser: true
      });
    }
    this.globalData = {
      "version": "1.0.0",
      "cacheFileDir": wx.env.USER_DATA_PATH + "/cacheFile",
      "isRelease": false,//可以网络控制 用于上架屏蔽某些页面不显示
      "darkMode": wx.getStorageSync('darkMode') || false
    }
  },
  onShow() {
  },
})