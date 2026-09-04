// pages/home/me/index.js
const DEFAULT_AVATAR = "../../../images/ic_user_img.png";

const QUOTES = [
  '生活明朗，万物可爱，人间值得。',
  '今天也要元气满满呀！',
  '慢慢来，比较快。',
  '保持热爱，奔赴山海。',
  '你所热爱的东西，终会反过来拥抱你。',
  '愿你眼中有光，心中有梦。',
  '把日子过成自己喜欢的样子。',
  '每一天都是新的开始。',
  '心之所向，素履以往。',
  '别怕，未来的你会感谢现在的自己。',
  '简单一点，快乐就多一点。',
  '世界这么大，多去看看吧。'
];

Page({
  data: {
    title: "我的",
    headeSrcPath: DEFAULT_AVATAR,
    userName: "",
    dailyQuote: "",
    darkMode: false
  },
  onShareAppMessage: function () {},
  onShareTimeline: function () {},

  onLoad() {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    this.loadUserInfo();
    this.setData({
      dailyQuote: this.getDailyQuote()
    });
  },

  onShow() {
    this.setData({
      darkMode: getApp().globalData.darkMode
    });
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

  // 每日一言（按天轮换）
  getDailyQuote() {
    const day = Math.floor(Date.now() / 86400000);
    return QUOTES[day % QUOTES.length];
  },

  // 跳转关于页
  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 切换深色模式
  onDarkModeChange(e) {
    const darkMode = e.detail.value;
    wx.setStorageSync('darkMode', darkMode);
    getApp().globalData.darkMode = darkMode;
    this.setData({ darkMode: darkMode });
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
