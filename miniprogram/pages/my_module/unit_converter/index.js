// pages/my_module/unit_converter/index.js
const CATEGORIES = [
  {
    key: 'length',
    name: '长度',
    units: [
      { name: '米', key: 'm', factor: 1, offset: 0 },
      { name: '千米', key: 'km', factor: 1000, offset: 0 },
      { name: '分米', key: 'dm', factor: 0.1, offset: 0 },
      { name: '厘米', key: 'cm', factor: 0.01, offset: 0 },
      { name: '毫米', key: 'mm', factor: 0.001, offset: 0 },
      { name: '英尺', key: 'ft', factor: 0.3048, offset: 0 },
      { name: '英寸', key: 'in', factor: 0.0254, offset: 0 },
      { name: '码', key: 'yd', factor: 0.9144, offset: 0 },
      { name: '英里', key: 'mi', factor: 1609.344, offset: 0 },
      { name: '海里', key: 'nmi', factor: 1852, offset: 0 }
    ]
  },
  {
    key: 'weight',
    name: '重量',
    units: [
      { name: '千克', key: 'kg', factor: 1, offset: 0 },
      { name: '克', key: 'g', factor: 0.001, offset: 0 },
      { name: '毫克', key: 'mg', factor: 0.000001, offset: 0 },
      { name: '吨', key: 't', factor: 1000, offset: 0 },
      { name: '斤', key: 'jin', factor: 0.5, offset: 0 },
      { name: '两', key: 'liang', factor: 0.05, offset: 0 },
      { name: '磅', key: 'lb', factor: 0.45359237, offset: 0 },
      { name: '盎司', key: 'oz', factor: 0.028349523125, offset: 0 }
    ]
  },
  {
    key: 'area',
    name: '面积',
    units: [
      { name: '平方米', key: 'm2', factor: 1, offset: 0 },
      { name: '平方千米', key: 'km2', factor: 1000000, offset: 0 },
      { name: '公顷', key: 'ha', factor: 10000, offset: 0 },
      { name: '亩', key: 'mu', factor: 2000 / 3, offset: 0 },
      { name: '平方英尺', key: 'ft2', factor: 0.09290304, offset: 0 },
      { name: '平方英寸', key: 'in2', factor: 0.00064516, offset: 0 }
    ]
  },
  {
    key: 'volume',
    name: '体积',
    units: [
      { name: '立方米', key: 'm3', factor: 1, offset: 0 },
      { name: '升', key: 'L', factor: 0.001, offset: 0 },
      { name: '毫升', key: 'mL', factor: 0.000001, offset: 0 },
      { name: '加仑(美)', key: 'gal', factor: 0.003785411784, offset: 0 },
      { name: '立方英尺', key: 'ft3', factor: 0.028316846592, offset: 0 }
    ]
  },
  {
    key: 'temperature',
    name: '温度',
    units: [
      { name: '摄氏度(°C)', key: 'c', factor: 1, offset: 0 },
      { name: '华氏度(°F)', key: 'f', factor: 5 / 9, offset: 32 },
      { name: '开尔文(K)', key: 'k', factor: 1, offset: 273.15 }
    ]
  },
  {
    key: 'speed',
    name: '速度',
    units: [
      { name: '米/秒', key: 'mps', factor: 1, offset: 0 },
      { name: '千米/时', key: 'kmh', factor: 1 / 3.6, offset: 0 },
      { name: '英里/时', key: 'mph', factor: 0.44704, offset: 0 },
      { name: '节', key: 'knot', factor: 0.514444444, offset: 0 }
    ]
  },
  {
    key: 'time',
    name: '时间',
    units: [
      { name: '秒', key: 's', factor: 1, offset: 0 },
      { name: '分', key: 'min', factor: 60, offset: 0 },
      { name: '时', key: 'h', factor: 3600, offset: 0 },
      { name: '天', key: 'd', factor: 86400, offset: 0 },
      { name: '周', key: 'w', factor: 604800, offset: 0 }
    ]
  },
  {
    key: 'data',
    name: '数据存储',
    units: [
      { name: '比特(bit)', key: 'bit', factor: 0.125, offset: 0 },
      { name: '字节(B)', key: 'B', factor: 1, offset: 0 },
      { name: 'KB', key: 'KB', factor: 1024, offset: 0 },
      { name: 'MB', key: 'MB', factor: 1048576, offset: 0 },
      { name: 'GB', key: 'GB', factor: 1073741824, offset: 0 },
      { name: 'TB', key: 'TB', factor: 1099511627776, offset: 0 },
      { name: 'PB', key: 'PB', factor: 1125899906842624, offset: 0 }
    ]
  },
  {
    key: 'angle',
    name: '角度',
    units: [
      { name: '度(°)', key: 'deg', factor: 1, offset: 0 },
      { name: '弧度(rad)', key: 'rad', factor: 180 / Math.PI, offset: 0 }
    ]
  }
];

Page({
  data: {
    categories: CATEGORIES.map(c => ({ key: c.key, name: c.name })),
    currentCategory: 'length',
    units: CATEGORIES[0].units,
    unitNames: CATEGORIES[0].units.map(u => u.name),
    unitIndex: 0,
    inputValue: '1',
    results: []
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '单位换算' });
    this.calculate();
  },

  // 切换分类
  onCategoryTap(e) {
    const key = e.currentTarget.dataset.key;
    if (key === this.data.currentCategory) return;
    const cat = CATEGORIES.find(c => c.key === key);
    this.setData({
      currentCategory: key,
      units: cat.units,
      unitNames: cat.units.map(u => u.name),
      unitIndex: 0,
      inputValue: '1'
    }, () => this.calculate());
  },

  // 输入数值
  onInput(e) {
    this.setData({ inputValue: e.detail.value }, () => this.calculate());
  },

  // 切换输入单位
  onUnitChange(e) {
    this.setData({ unitIndex: Number(e.detail.value) }, () => this.calculate());
  },

  // 计算所有单位的结果
  calculate() {
    const value = parseFloat(this.data.inputValue);
    const units = this.data.units;
    const inputUnit = units[this.data.unitIndex];

    let results;
    if (isNaN(value) || !inputUnit) {
      results = units.map(u => ({ key: u.key, name: u.name, value: '--' }));
    } else {
      // 先转成基准单位，再换算到各目标单位
      const base = (value - inputUnit.offset) * inputUnit.factor;
      results = units.map(u => {
        const v = base / u.factor + u.offset;
        return { key: u.key, name: u.name, value: this.format(v) };
      });
    }
    this.setData({ results });
  },

  // 格式化数值：消除浮点误差，极大/极小值用科学计数法
  format(v) {
    if (!isFinite(v)) return '--';
    const abs = Math.abs(v);
    if (abs >= 1e12 || (abs > 0 && abs < 1e-9)) {
      return v.toExponential(4);
    }
    const r = Math.round(v * 1e10) / 1e10;
    return String(r);
  }
});
