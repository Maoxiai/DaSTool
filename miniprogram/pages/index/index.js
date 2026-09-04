const { TOOLS, CATEGORY } = require('../../config/tools.js');

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
    categories: [],
    activeCategory: 0,
    viewMode: 'card',
    darkMode: false,
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getListInfo()
    this.setData({
      darkMode: getApp().globalData.darkMode
    })
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
      return;
    }

    // 上报启动次数（异步，不阻塞跳转）
    this.reportLaunch(item.type);

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

  // 上报工具启动次数
  reportLaunch(type) {
    if (!type || !wx.cloud) return;
    wx.cloud.callFunction({
      name: 'reportLaunch',
      data: { type }
    }).catch(() => {});
  },

  // 切换分类
  onSwitchCategory(event) {
    const id = Number(event.currentTarget.dataset.id);
    this.setData({ activeCategory: id });
    this.filterTools();
  },

  //获取功能列表
  getListInfo() {
    // 分类 tab：热门 + 有工具的分类（按 CATEGORY 定义顺序）
    const categories = [{ id: 0, name: '热门' }];
    Object.keys(CATEGORY).forEach(key => {
      const c = CATEGORY[key];
      if (TOOLS.some(t => t.typeId === c.id)) {
        categories.push({ id: c.id, name: c.name });
      }
    });

    // 拷贝并按 sort 降序稳定排序，sort 相同时保持数据源中的原始顺序，保证位置固定
    this._allTools = TOOLS
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        if (b.item.sort !== a.item.sort) {
          return b.item.sort - a.item.sort;
        }
        return a.index - b.index;
      })
      .map(d => d.item);

    this.setData({
      categories
    });
    this.filterTools();
    this.loadHotTools();
  },

  // 异步加载启动次数统计（云端按启动次数排序）
  loadHotTools() {
    const fallback = this._allTools.slice(0, 10);
    if (!wx.cloud) {
      this._countMap = {};
      this._hotTools = fallback;
      return;
    }
    wx.cloud.callFunction({
      name: 'getHotTools'
    }).then(res => {
      const result = res.result || {};
      const list = result.ok ? (result.list || []) : [];
      const countMap = {};
      list.forEach(s => { countMap[s.type] = s.count; });
      this._countMap = countMap;
      const hotTools = list
        .map(s => this._allTools.find(t => t.type === s.type))
        .filter(Boolean);
      this._hotTools = hotTools.length ? hotTools : fallback;
    }).catch(() => {
      this._countMap = {};
      this._hotTools = fallback;
    }).then(() => {
      this.filterTools();
    });
  },

  // 按当前分类过滤工具列表
  filterTools() {
    const active = this.data.activeCategory;
    let list = this._allTools || [];
    let viewMode = 'grid';
    if (active === 0) {
      // 热门：优先用云端榜单，无数据时回退 sort 前 10，卡片展示
      list = (this._hotTools && this._hotTools.length) ? this._hotTools : list.slice(0, 10);
      viewMode = 'card';
    } else {
      list = list.filter(t => t.typeId === active);
    }
    const countMap = this._countMap || {};
    list = list.map(item => Object.assign({}, item, {
      iconType: item.icon && (item.icon.indexOf('http') === 0 || item.icon.indexOf('/') === 0) ? 'image' : 'emoji',
      count: countMap[item.type] || 0
    }));
    this.setData({
      classlist: list,
      viewMode: viewMode,
      listDataSuccess: true
    })
  }

})
