const { TOOLS } = require('../../config/tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "Key_Home_Info_List_NEW",
    title: "主页",
    listDataSuccess: false,
    isShowBottomAd: false,
    classlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    const fs = wx.getFileSystemManager()
    const cacheFileDir = getApp().globalData.cacheFileDir
    try {
      fs.rmdirSync(cacheFileDir, true)
    } catch (e) {}
    try {
      fs.mkdirSync(cacheFileDir, true)
    } catch (e) {}

    // try {
    //   let value = wx.getStorageSync(this.data.key);
    //   let item = JSON.parse(value);
    //   this.setData({
    //     classlist: item
    //   })
    // } catch (error) {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getListInfo()
  },

  onShareAppMessage: function () {},
  onShareTimeline: function () {},

  //点击列表跳转
  async selectTop(event) {

    let item = event.currentTarget.dataset.id;
    let path = item.path

    if (path == null || path == "") {
      wx.showToast({
        title: item.name + ",模块已下线!",
        icon: "none"
      })
    }

    wx.navigateTo({
      url: path,
      fail(err) {
        wx.showToast({
          title: '上线中...',
          icon: "none"
        })
      }
    })
  },

  //获取功能列表
  getListInfo() {
    let source = TOOLS;
    // 拷贝并按 sort 降序稳定排序，sort 相同时保持数据源中的原始顺序，保证位置固定
    let list = source
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        if (b.item.sort !== a.item.sort) {
          return b.item.sort - a.item.sort;
        }
        return a.index - b.index;
      })
      .map(d => d.item);

    this.setData({
      classlist: list,
      listDataSuccess: true
    })
  }

})