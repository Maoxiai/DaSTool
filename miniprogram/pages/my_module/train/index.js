// 车次规则：按车次号字母前缀识别列车类型、速度等级与运行说明
const TYPES = [
  { code: 'G', name: '高速动车组', speed: '300 - 350 km/h', desc: '俗称「高铁」，运行于高速铁路，如 G1234' },
  { code: 'D', name: '动车组', speed: '200 - 250 km/h', desc: '俗称「动车」，运行于动车路线，如 D3601' },
  { code: 'C', name: '城际动车组', speed: '160 - 350 km/h', desc: '城际铁路，如京津城际 C2001' },
  { code: 'Z', name: '直达特快', speed: '约 160 km/h', desc: 'Z 字头，中途停站少，如 Z1' },
  { code: 'T', name: '特快列车', speed: '约 140 km/h', desc: 'T 字头，如 T110' },
  { code: 'K', name: '快速列车', speed: '约 120 km/h', desc: 'K 字头，普速线路常见，如 K9090' },
  { code: 'L', name: '临时旅客列车', speed: '视线路', desc: 'L 字头，春运等高峰期加开' },
  { code: 'Y', name: '旅游列车', speed: '视线路', desc: 'Y 字头，旅游专列' },
  { code: '数字', name: '普快 / 普客', speed: '100 - 120 km/h', desc: '纯数字车次，如 1234 次' }
];

Page({
  data: {
    types: TYPES,
    input: '',
    result: null,
    error: ''
  },

  onField(e) {
    this.setData({ input: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null, error: '' });
    const input = (this.data.input || '').trim().toUpperCase();
    if (!input) return;

    const letter = input.match(/^[A-Z]/);
    const type = letter ? input[0] : '数字';
    const found = TYPES.find(t => t.code === type);

    if (found) {
      this.setData({ result: found });
    } else {
      this.setData({ error: '未能识别该车次类型，常见前缀为 G / D / C / Z / T / K / L / Y' });
    }
  }
});