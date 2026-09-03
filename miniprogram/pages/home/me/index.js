// pages/home/me/index.js
const DEFAULT_AVATAR = "../../../images/ic_user_img.png";

Page({
  data: {
    title: "我的",
    version: "3.0.0",
    headeSrcPath: DEFAULT_AVATAR,
    userName: ""
  },
  onShareAppMessage: function () {},
  onShareTimeline: function () {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    this.loadUserInfo();
  },
  onShow() {

  },
  onHide() {

  },

  // 读取本地已保存的用户头像与昵称
  loadUserInfo() {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        headeSrcPath: userInfo.avatarUrl || DEFAULT_AVATAR,
        userName: userInfo.nickName || ""
      });
    }
  },

  // 点击头像，选择微信头像
  onChooseAvatar(e) {
    let tempAvatar = e.detail.avatarUrl;
    if (!tempAvatar) {
      return;
    }
    let fs = wx.getFileSystemManager();
    try {
      // 将临时头像保存到本地，得到可长期使用的路径
      let savedFilePath = fs.saveFileSync(tempAvatar);
      this.setData({
        headeSrcPath: savedFilePath
      });
    } catch (err) {
      // 保存失败时退而使用临时路径（下次进入可能失效）
      this.setData({
        headeSrcPath: tempAvatar
      });
    }
    this.saveUserInfo();
  },

  // 输入昵称
  onNicknameInput(e) {
    this.setData({
      userName: e.detail.value
    });
  },

  // 昵称输入完成（失焦）时保存
  onNicknameBlur() {
    this.saveUserInfo();
  },

  // 保存用户信息到本地缓存
  saveUserInfo() {
    wx.setStorageSync('userInfo', {
      nickName: this.data.userName || "",
      avatarUrl: this.data.headeSrcPath || ""
    });
  }
})
