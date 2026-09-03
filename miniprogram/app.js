//app.js
var uuid;
App({
  onLaunch: function () {
    this.globalData = {
      "version": "1.0.0",
      "cacheFileDir": wx.env.USER_DATA_PATH + "/cacheFile",
      "isRelease": false//可以网络控制 用于上架屏蔽某些页面不显示
    }
  },
  onShow() {
  },
})