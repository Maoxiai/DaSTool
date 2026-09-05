// pages/favorites/index.js
const { TOOLS, CATEGORY } = require('../../config/tools.js');
const favorite = require('../utils/favorite.js');

const CATEGORY_ICON = { 2: '📐', 3: '🔍', 4: '🧰', 5: '🖼️', 6: '🎮', 7: '🔌', 8: '📷' };

Page({
  data: {
    darkMode: false,
    favCount: 0,
    tabs: [],
    activeTab: 'all',
    displayTools: []
  },

  onShow() {
    this.setData({
      darkMode: getApp().globalData.darkMode
    });
    this.loadFavorites();
  },

  // 加载收藏并生成分类 Tab
  loadFavorites() {
    const favs = favorite.getFavorites();
    const favTools = favs
      .map(t => TOOLS.find(x => x.type === t))
      .filter(Boolean)
      .map(item => Object.assign({}, item, {
        iconType: item.icon && (item.icon.indexOf('http') === 0 || item.icon.indexOf('/') === 0) ? 'image' : 'emoji'
      }));

    // 按分类分组
    const groups = [];
    Object.keys(CATEGORY).forEach(key => {
      const c = CATEGORY[key];
      const tools = favTools.filter(t => t.typeId === c.id);
      if (tools.length) {
        groups.push({ id: c.id, name: c.name, icon: CATEGORY_ICON[c.id] || '📦', tools });
      }
    });

    // 生成 Tab：全部 + 各分类
    const tabs = [{ id: 'all', name: '全部', icon: '⭐', count: favTools.length }];
    groups.forEach(g => tabs.push({ id: String(g.id), name: g.name, icon: g.icon, count: g.tools.length }));

    this._groups = groups;
    this._favTools = favTools;

    this.setData({
      tabs,
      favCount: favTools.length
    });
    this.applyFilter();
  },

  // 根据当前选中 Tab 过滤展示
  applyFilter() {
    const active = this.data.activeTab;
    let tools;
    if (active === 'all') {
      tools = this._favTools || [];
    } else {
      const g = (this._groups || []).find(x => String(x.id) === active);
      tools = g ? g.tools : [];
    }
    tools = tools.map((item, index) => Object.assign({}, item, {
      animDelay: (Math.min(index, 15) * 60) + 'ms'
    }));
    this.setData({ displayTools: tools });
  },

  // 切换分类
  switchTab(e) {
    const id = e.currentTarget.dataset.id;
    if (id === this.data.activeTab) return;
    this.setData({ activeTab: id });
    this.applyFilter();
  },

  // 取消/收藏（星标）
  toggleFav(e) {
    const type = e.currentTarget.dataset.type;
    if (!type) return;
    favorite.toggleFavorite(type);
    const isFav = favorite.isFavorite(type);
    wx.showToast({ title: isFav ? '已收藏' : '已取消收藏', icon: 'none' });
    this.loadFavorites();
  },

  // 跳转工具
  goTool(e) {
    const item = e.currentTarget.dataset.id;
    if (item && item.path) {
      wx.navigateTo({ url: item.path });
    }
  },

  // 返回首页找工具
  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
