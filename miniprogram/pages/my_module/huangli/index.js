// 黄历节气：农历月日 + 干支纪年 + 生肖 + 24 节气
// 农历数据表（1900-2100 年，标准十六进制编码）
const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6a6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x04b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252,
  0x0d520
];

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const LUNAR_MONTH = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const LUNAR_DAY = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

// 24 节气平均公历日期（月/日，实际每年有 ±1 天）
const SOLAR_TERMS = [
  { name: '小寒', m: 1, d: 5 }, { name: '大寒', m: 1, d: 20 },
  { name: '立春', m: 2, d: 4 }, { name: '雨水', m: 2, d: 19 },
  { name: '惊蛰', m: 3, d: 5 }, { name: '春分', m: 3, d: 20 },
  { name: '清明', m: 4, d: 5 }, { name: '谷雨', m: 4, d: 20 },
  { name: '立夏', m: 5, d: 5 }, { name: '小满', m: 5, d: 21 },
  { name: '芒种', m: 6, d: 6 }, { name: '夏至', m: 6, d: 21 },
  { name: '小暑', m: 7, d: 7 }, { name: '大暑', m: 7, d: 22 },
  { name: '立秋', m: 8, d: 7 }, { name: '处暑', m: 8, d: 23 },
  { name: '白露', m: 9, d: 7 }, { name: '秋分', m: 9, d: 23 },
  { name: '寒露', m: 10, d: 8 }, { name: '霜降', m: 10, d: 23 },
  { name: '立冬', m: 11, d: 7 }, { name: '小雪', m: 11, d: 22 },
  { name: '大雪', m: 12, d: 7 }, { name: '冬至', m: 12, d: 22 }
];

// 农历工具函数
function leapMonth(y) { return lunarInfo[y - 1900] & 0xf; }
function leapDays(y) { return leapMonth(y) ? ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29) : 0; }
function monthDays(y, m) { return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29; }
function lYearDays(y) {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
  return sum + leapDays(y);
}

function solarToLunar(y, m, d) {
  const base = new Date(1900, 0, 31);
  let offset = Math.floor((new Date(y, m - 1, d) - base) / 86400000);
  let i, temp = 0;
  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = lYearDays(i);
    offset -= temp;
  }
  if (offset < 0) { offset += temp; i--; }

  const year = i;
  const leap = leapMonth(i);
  let isLeap = false;
  for (i = 1; i < 13 && offset > 0; i++) {
    if (leap > 0 && i === (leap + 1) && isLeap === false) {
      --i;
      isLeap = true;
      temp = leapDays(year);
    } else {
      temp = monthDays(year, i);
    }
    if (isLeap === true && i === (leap + 1)) isLeap = false;
    offset -= temp;
  }

  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (isLeap) { isLeap = false; }
    else { isLeap = true; --i; }
  }
  if (offset < 0) { offset += temp; --i; }

  const month = i;
  const day = offset + 1;
  return { year, month, monthStr: (isLeap ? '闰' : '') + LUNAR_MONTH[month - 1] + '月', day, dayStr: LUNAR_DAY[day - 1] };
}

function pad(n) { return (n < 10 ? '0' : '') + n; }

Page({
  data: {
    date: '',
    result: null,
    terms: []
  },

  onLoad() {
    const now = new Date();
    this.setData({
      date: now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()),
      terms: SOLAR_TERMS.map(t => ({ name: t.name, date: t.m + '月' + t.d + '日' }))
    });
    this.compute();
  },

  onDate(e) {
    this.setData({ date: e.detail.value });
    this.compute();
  },

  compute() {
    const parts = this.data.date.split('-');
    if (parts.length < 3) return;
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);

    let lunar = null;
    try {
      lunar = solarToLunar(y, m, d);
    } catch (e) {}

    const gan = GAN[(y - 4) % 10];
    const zhi = ZHI[(y - 4) % 12];
    const shengxiao = SHENGXIAO[(y - 4) % 12];

    // 最近的节气
    let nearest = SOLAR_TERMS[0];
    let minDiff = Infinity;
    const dm = m * 100 + d;
    for (const t of SOLAR_TERMS) {
      const td = t.m * 100 + t.d;
      let diff = Math.abs(td - dm);
      if (diff < minDiff) { minDiff = diff; nearest = t; }
    }

    this.setData({
      result: {
        lunar: lunar ? (lunar.monthStr + lunar.dayStr) : '超出范围',
        ganYear: gan + zhi + '年',
        shengxiao,
        nearestTerm: nearest.name + '（' + nearest.m + '月' + nearest.d + '日前后）'
      }
    });
  }
});