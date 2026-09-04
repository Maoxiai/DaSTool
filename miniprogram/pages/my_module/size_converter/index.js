// pages/my_module/size_converter/index.js
// 服装尺码对照表（通用参考）
const CLOTHES_SIZES = [
  { size: 'S', height: '155-160', chest: '80-84', waist: '60-64' },
  { size: 'M', height: '160-165', chest: '84-88', waist: '64-68' },
  { size: 'L', height: '165-170', chest: '88-92', waist: '68-72' },
  { size: 'XL', height: '170-175', chest: '92-96', waist: '72-76' },
  { size: 'XXL', height: '175-180', chest: '96-100', waist: '76-80' },
  { size: 'XXXL', height: '180-185', chest: '100-104', waist: '80-84' }
];

Page({
  data: {
    tabs: [
      { key: 'shoe', name: '鞋码换算' },
      { key: 'clothes', name: '服装尺码' }
    ],
    currentTab: 'shoe',
    footLength: '25',
    shoeResults: [],
    clothesSizes: CLOTHES_SIZES
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '尺码换算' });
    this.calcShoe();
  },

  onTabTap(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key });
  },

  onFootLengthInput(e) {
    this.setData({ footLength: e.detail.value }, () => this.calcShoe());
  },

  calcShoe() {
    const cm = parseFloat(this.data.footLength);
    if (isNaN(cm) || cm <= 0 || cm > 50) {
      this.setData({ shoeResults: [] });
      return;
    }
    // 以脚长（厘米）为基准换算各码制
    const cn = cm * 10;                 // 中国码（毫米）
    const eu = cm * 2 - 10;             // 欧码
    const usM = cm / 2.54 * 3 - 22;     // 美码（男）
    const usW = cm / 2.54 * 3 - 21;     // 美码（女）
    const uk = cm / 2.54 * 3 - 23;      // 英码
    this.setData({
      shoeResults: [
        { name: '中国码（毫米）', value: this.fmt(cn) },
        { name: '欧码 EU', value: this.fmt(eu) },
        { name: '美码 US（男）', value: this.fmt(usM) },
        { name: '美码 US（女）', value: this.fmt(usW) },
        { name: '英码 UK', value: this.fmt(uk) }
      ]
    });
  },

  fmt(v) {
    const r = Math.round(v * 10) / 10;
    return String(r);
  }
});
