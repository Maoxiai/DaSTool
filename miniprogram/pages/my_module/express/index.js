// 快递单号识别：按单号特征匹配常见快递公司
const RULES = [
  { name: '顺丰速运', hotline: '95338', test: /^SF\d{12,15}$/i, or: /^(\d{12,13})$/ },
  { name: '中通快递', hotline: '95311', test: /^((7\d{11})|(80\d{10})|(\d{12,13}))$/ },
  { name: '圆通速递', hotline: '95554', test: /^YT\d{13}$/i, or: /^8\d{11}$/ },
  { name: '申通快递', hotline: '95543', test: /^((2|3)\d{11}|468\d{10})$/ },
  { name: '韵达快递', hotline: '95546', test: /^4\d{12}$/ },
  { name: '京东物流', hotline: '950616', test: /^JD\d{11,15}$/i, or: /^(9\d{11}|EA\d{11})$/ },
  { name: '邮政 EMS', hotline: '11183', test: /^E[A-Z]\d{9}CN$/i, or: /^\d{13}$/ },
  { name: '极兔速递', hotline: '956025', test: /^JT\d{11,13}$/i },
  { name: '德邦快递', hotline: '95353', test: /^DPK\d{12,15}$/i, or: /^\d{8,10}$/ },
  { name: '百世快递', hotline: '95320', test: /^(55\d{10}|B\d{12})$/i }
];

Page({
  data: {
    no: '',
    result: null
  },

  onField(e) {
    this.setData({ no: e.detail.value });
    this.compute();
  },

  compute() {
    this.setData({ result: null });
    const no = (this.data.no || '').trim();
    if (!no) return;

    let found = null;
    for (const r of RULES) {
      if (r.test.test(no) || (r.or && r.or.test(no))) {
        found = r;
        break;
      }
    }

    if (found) {
      this.setData({ result: { company: found.name, hotline: found.hotline } });
    } else {
      this.setData({ result: { company: '未识别', hotline: '—' } });
    }
  }
});