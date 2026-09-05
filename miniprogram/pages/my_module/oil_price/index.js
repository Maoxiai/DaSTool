// pages/my_module/oil_price/index.js
const PROVINCES = [
  '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
  '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
  '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
];

const API_URL = 'https://tmini.net/api/oil-prices';

// 油品图标（按名称关键字匹配）
function oilIcon(name) {
  const n = name || '';
  if (n.indexOf('柴油') !== -1) return '🛢️';
  if (n.indexOf('98') !== -1) return '🏎️';
  if (n.indexOf('95') !== -1) return '⛽';
  if (n.indexOf('92') !== -1) return '🚗';
  if (n.indexOf('89') !== -1) return '🛵';
  return '⛽';
}

Page({
  data: {
    provinces: PROVINCES,
    provinceIndex: 0,
    currentProvince: PROVINCES[0],
    updateTime: '',
    priceList: [],
    loading: false,
    listVersion: 0,
    maxPrice: 0,
    heroAnim: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '今日油价' });
    this.fetchOilPrice(this.data.currentProvince);
  },

  // 切换省份
  onProvinceChange(e) {
    const idx = Number(e.detail.value);
    const province = PROVINCES[idx];
    this.setData({ provinceIndex: idx, currentProvince: province });
    this.fetchOilPrice(province);
  },

  // 拉取油价
  fetchOilPrice(province) {
    this.setData({ loading: true });
    wx.request({
      url: API_URL,
      data: { province: province },
      success: (res) => {
        const d = res.data;
        if (d && d.code === 0 && d.data) {
          this.setData({
            updateTime: d.data.update_time || '',
            priceList: this.parsePrices(d.data.prices)
          });
          this.playHeroAnim();
        } else {
          this.setData({ updateTime: '', priceList: [] });
          wx.showToast({ title: '获取油价失败', icon: 'none' });
        }
      },
      fail: () => {
        this.setData({ updateTime: '', priceList: [] });
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  // Hero 弹跳动画（数据更新时）
  playHeroAnim() {
    const anim = wx.createAnimation({ duration: 500, timingFunction: 'ease' });
    anim.scale(1.06).step({ duration: 160 });
    anim.scale(1).step({ duration: 340 });
    this.setData({ heroAnim: anim.export() });
  },

  // 解析油品价格，并按常用油品顺序排列
  parsePrices(prices) {
    if (!prices) return [];
    const list = Object.keys(prices).map((key) => {
      const raw = prices[key];
      const change = Number(raw.change || 0);
      let changeText = '--';
      let changeType = 'flat';
      let arrow = '—';
      if (raw.change !== undefined && raw.change !== null) {
        changeText = (change > 0 ? '+' : '') + change.toFixed(2);
        changeType = change > 0 ? 'up' : (change < 0 ? 'down' : 'flat');
        arrow = change > 0 ? '↑' : (change < 0 ? '↓' : '—');
      }
      return {
        name: key,
        icon: oilIcon(key),
        price: raw.price,
        changeText: changeText,
        changeType: changeType,
        arrow: arrow,
        animDelay: 0
      };
    });
    list.sort((a, b) => this.oilOrder(a.name) - this.oilOrder(b.name));

    // 计算最高价（用于视觉对比条）
    let maxPrice = 0;
    list.forEach(it => { maxPrice = Math.max(maxPrice, Number(it.price) || 0); });

    // 错峰延迟 + 唯一 key（切换省份时 listVersion 变化，卡片重新入场）
    const version = this.data.listVersion + 1;
    list.forEach((it, i) => {
      it.animDelay = (i * 80) + 'ms';
      it.key = version + '_' + i;
    });

    this.setData({ maxPrice: maxPrice, listVersion: version });
    return list;
  },

  // 油品排序权重（汽油在前，柴油在后）
  oilOrder(name) {
    if (name.indexOf('92') !== -1) return 1;
    if (name.indexOf('95') !== -1) return 2;
    if (name.indexOf('98') !== -1 || name.indexOf('爱跑') !== -1) return 3;
    if (name.indexOf('89') !== -1) return 0;
    if (name.indexOf('0号') !== -1) return 4;
    return 5;
  }
});
