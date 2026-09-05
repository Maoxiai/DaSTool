// 黄金时刻 / 蓝调时刻：根据城市经纬度与日期，估算日出日落及拍摄最佳时段

const CITIES = [
  { name: '北京', lat: 39.90, lon: 116.41 },
  { name: '上海', lat: 31.23, lon: 121.47 },
  { name: '广州', lat: 23.13, lon: 113.26 },
  { name: '深圳', lat: 22.54, lon: 114.06 },
  { name: '杭州', lat: 30.27, lon: 120.16 },
  { name: '成都', lat: 30.57, lon: 104.07 },
  { name: '重庆', lat: 29.56, lon: 106.55 },
  { name: '武汉', lat: 30.59, lon: 114.31 },
  { name: '西安', lat: 34.34, lon: 108.94 },
  { name: '南京', lat: 32.06, lon: 118.80 },
  { name: '天津', lat: 39.34, lon: 117.36 },
  { name: '长沙', lat: 28.23, lon: 112.94 },
  { name: '昆明', lat: 25.04, lon: 102.71 },
  { name: '厦门', lat: 24.48, lon: 118.09 },
  { name: '青岛', lat: 36.07, lon: 120.38 },
  { name: '沈阳', lat: 41.80, lon: 123.43 },
  { name: '哈尔滨', lat: 45.80, lon: 126.53 },
  { name: '乌鲁木齐', lat: 43.83, lon: 87.62 }
];

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

// 将小时数格式化为 HH:MM
function fmtTime(h) {
  if (h < 0) h += 24;
  if (h >= 24) h -= 24;
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  if (mm === 60) return pad(hh + 1) + ':00';
  return pad(hh) + ':' + pad(mm);
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

// 计算一年中的第几天
function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

// 日出日落计算（太阳几何近似）
function sunTimes(lat, lon, date) {
  const N = dayOfYear(date);
  // 太阳赤纬
  const decl = -23.44 * Math.cos(DEG * (360 / 365) * (N + 10));
  // 时角
  const cosH = -Math.tan(lat * DEG) * Math.tan(decl * DEG);
  const H = Math.acos(Math.max(-1, Math.min(1, cosH))) * RAD; // 度

  // 均时差（分钟）
  const B = (360 / 365) * (N - 81);
  const EoT = 9.87 * Math.sin(2 * B * DEG) - 7.53 * Math.cos(B * DEG) - 1.5 * Math.sin(B * DEG);

  // 东八区基准经度 120°，经度修正（小时）
  const lonCorr = (120 - lon) / 15;
  const solarNoon = 12 - lonCorr - EoT / 60;
  const sunrise = solarNoon - H / 15;
  const sunset = solarNoon + H / 15;

  return { sunrise, sunset, solarNoon, H, decl };
}

// 黄金时刻/蓝调时刻近似（随纬度略有差异，此处按太阳高度角近似）
function magicTimes(sun) {
  // 太阳在地平线下 6°（民用晨昏蒙影）与 0° 之间估算
  // 简化：黄金时刻 ≈ 日出后 40 分钟 / 日落前 40 分钟；蓝调 ≈ 日出前 30 分钟 / 日落后 30 分钟
  return {
    goldenMorning: [sun.sunrise, sun.sunrise + 40 / 60],
    goldenEvening: [sun.sunset - 40 / 60, sun.sunset],
    blueMorning: [sun.sunrise - 30 / 60, sun.sunrise],
    blueEvening: [sun.sunset, sun.sunset + 30 / 60]
  };
}

Page({
  data: {
    cities: CITIES.map(c => c.name),
    cIndex: 0,
    date: '',
    result: null
  },

  onLoad() {
    const now = new Date();
    const date = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    this.setData({ date });
    this.compute();
  },

  onCity(e) {
    this.setData({ cIndex: Number(e.detail.value) });
    this.compute();
  },

  onDate(e) {
    this.setData({ date: e.detail.value });
    this.compute();
  },

  compute() {
    const c = CITIES[this.data.cIndex];
    const parts = this.data.date.split('-');
    if (parts.length < 3) return;
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const sun = sunTimes(c.lat, c.lon, date);
    const m = magicTimes(sun);

    this.setData({
      result: {
        sunrise: fmtTime(sun.sunrise),
        sunset: fmtTime(sun.sunset),
        solarNoon: fmtTime(sun.solarNoon),
        dayLength: (sun.H / 15 * 2),
        goldenMorning: fmtTime(m.goldenMorning[0]) + ' ~ ' + fmtTime(m.goldenMorning[1]),
        goldenEvening: fmtTime(m.goldenEvening[0]) + ' ~ ' + fmtTime(m.goldenEvening[1]),
        blueMorning: fmtTime(m.blueMorning[0]) + ' ~ ' + fmtTime(m.blueMorning[1]),
        blueEvening: fmtTime(m.blueEvening[0]) + ' ~ ' + fmtTime(m.blueEvening[1])
      }
    });
  }
});
