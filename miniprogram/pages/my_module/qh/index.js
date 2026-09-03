require("./md5.min.js");

var t = getApp(),
  audio = wx.createInnerAudioContext(),
  n = (wx.createCanvasContext("progress"), null),
  o = null;

Page({
  data: {
    title: "手机清灰",
    bar: "",
    tip: "(原理：利用声波震动，使灰尘震动脱离扬声器)",
    tip2: "(安卓、苹果通用，需打开声音)",
    isActive: "none",
    isTip2: "block",
    isGood: "none",
    progress: "清理手机喇叭灰尘",
    goodUrl: "",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=Mzg2NzUzODkzNl8yMjQ3NDgzNzI5",
    isProgress: "none",
    newprogress: "0",
    btnData: "马上清理",
    addLeft: "208.5rpx",
    isClean: 0,
    duration: 51e4,
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    wx.setKeepScreenOn({
      keepScreenOn: !0
    });
  },
  onShow: function () {
    var t = this,
      o = void 0;
    try {
      o = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    } catch (t) {
      this.setData({
        addLeft: o.left - 80 + "rpx"
      });
    }
    audio.src = this.data.src;
    wx.setInnerAudioOption && wx.setInnerAudioOption({
      obeyMuteSwitch: !1
    });
    audio.onCanplay(function () {
      audio.onPlay(function () {
        console.log("开始播放");
      });
      audio.onTimeUpdate(function () {
        console.log("进度更新：", audio.currentTime);
        var n = Math.round(audio.currentTime),
          o = Math.round(audio.duration),
          i = parseInt(n / o * 100);
        t.setData({
          newprogress: i
        });
      });
      audio.onEnded(function () {
        console.log("结束播放");
        t.setData({
          progress: "清理完成",
          tip: "(建议每周清理一次)",
          goodWidth: "44rpx",
          goodHeight: "44rpx",
          goodUrl: "good.png",
          isActive: "block",
          isGood: "block",
          isTip2: "none",
          btnData: "马上清理",
          isClean: 0
        });
        setTimeout(function () {
          n && n.show().catch(function (t) {
            console.error(t);
          });
        }, 1500);
      });
    });
  },

  onUnload() {
    if (this.data.isClean == 1) {
      audio.stop();
    }
  },

  cleanNew: function () {
    if (this.data.isClean == 1) {
      audio.stop();
      this.setData({
        progress: "清理完成",
        tip: "(建议每周清理一次)",
        goodWidth: "44rpx",
        goodHeight: "44rpx",
        goodUrl: "good.png",
        isActive: "block",
        isGood: "block",
        isTip2: "none",
        btnData: "马上清理",
        isClean: 0,
        isProgress: "none",
      })
      return
    }
    audio.play();
    this.setData({
      isActive: "block",
      progress: "清理中...",
      tip: "(将音量调至最大效果更佳)",
      isTip2: "none",
      btnData: "结束",
      isProgress: "block",
      goodUrl: "",
      isClean: 1
    });
  },

  onShareAppMessage: function () {
    return {
      title: "手机扬声器竟然有这么多灰尘😱"
    };
  }
});