// 亲属关系脑图：绝对定位视图 + 视图连线（横向树），点节点展开/收起其亲属
const TREE = {
  label: '我', emoji: '🙂', type: 'direct', info: { title: '我', desc: '就是你自己', relation: '中心' },
  children: [
    { label: '配偶', emoji: '💑', type: 'affinal', info: { title: '配偶', desc: '丈夫 / 妻子', relation: '姻亲' }, children: [
      { label: '岳父', emoji: '👴', type: 'affinal', info: { title: '岳父', desc: '配偶的父亲', relation: '姻亲' } },
      { label: '岳母', emoji: '👵', type: 'affinal', info: { title: '岳母', desc: '配偶的母亲', relation: '姻亲' } },
      { label: '大伯子', emoji: '👦', type: 'affinal', info: { title: '大伯子', desc: '配偶的哥哥', relation: '姻亲' } },
      { label: '小叔子', emoji: '👦', type: 'affinal', info: { title: '小叔子', desc: '配偶的弟弟', relation: '姻亲' } },
      { label: '大姑子', emoji: '👧', type: 'affinal', info: { title: '大姑子', desc: '配偶的姐姐', relation: '姻亲' } },
      { label: '小姑子', emoji: '👧', type: 'affinal', info: { title: '小姑子', desc: '配偶的妹妹', relation: '姻亲' } }
    ]},
    { label: '父', emoji: '👨', type: 'direct', info: { title: '父亲', desc: '爸爸 · 老爸 · 爹', relation: '直系血亲' }, children: [
      { label: '伯父', emoji: '👨', type: 'collateral', info: { title: '伯父', desc: '爸爸的哥哥', relation: '旁系血亲' } },
      { label: '叔父', emoji: '👨', type: 'collateral', info: { title: '叔父', desc: '爸爸的弟弟', relation: '旁系血亲' } },
      { label: '姑母', emoji: '👩', type: 'collateral', info: { title: '姑母', desc: '爸爸的姐妹', relation: '旁系血亲' } }
    ]},
    { label: '母', emoji: '👩', type: 'direct', info: { title: '母亲', desc: '妈妈 · 老妈 · 娘', relation: '直系血亲' }, children: [
      { label: '舅舅', emoji: '👨', type: 'collateral', info: { title: '舅舅', desc: '妈妈的兄弟', relation: '旁系血亲' } },
      { label: '姨妈', emoji: '👩', type: 'collateral', info: { title: '姨妈', desc: '妈妈的姐妹', relation: '旁系血亲' } }
    ]},
    { label: '祖父', emoji: '👴', type: 'direct', info: { title: '祖父', desc: '爷爷 · 阿公', relation: '直系血亲' } },
    { label: '祖母', emoji: '👵', type: 'direct', info: { title: '祖母', desc: '奶奶 · 阿嫲', relation: '直系血亲' } },
    { label: '外祖父', emoji: '👴', type: 'direct', info: { title: '外祖父', desc: '外公 · 姥爷', relation: '直系血亲' } },
    { label: '外祖母', emoji: '👵', type: 'direct', info: { title: '外祖母', desc: '外婆 · 姥姥', relation: '直系血亲' } },
    { label: '兄', emoji: '👦', type: 'collateral', info: { title: '哥哥', desc: '兄长 · 大哥', relation: '旁系血亲' }, children: [
      { label: '嫂子', emoji: '👩', type: 'affinal', info: { title: '嫂子', desc: '哥哥的妻子', relation: '姻亲' } },
      { label: '侄子', emoji: '👶', type: 'collateral', info: { title: '侄子', desc: '哥哥的儿子', relation: '旁系血亲' } },
      { label: '侄女', emoji: '👶', type: 'collateral', info: { title: '侄女', desc: '哥哥的女儿', relation: '旁系血亲' } }
    ]},
    { label: '弟', emoji: '👦', type: 'collateral', info: { title: '弟弟', desc: '胞弟 · 老弟', relation: '旁系血亲' }, children: [
      { label: '弟媳', emoji: '👩', type: 'affinal', info: { title: '弟媳', desc: '弟弟的妻子', relation: '姻亲' } },
      { label: '侄儿', emoji: '👶', type: 'collateral', info: { title: '侄儿', desc: '弟弟的儿子', relation: '旁系血亲' } },
      { label: '侄女', emoji: '👶', type: 'collateral', info: { title: '侄女', desc: '弟弟的女儿', relation: '旁系血亲' } }
    ]},
    { label: '姐', emoji: '👧', type: 'collateral', info: { title: '姐姐', desc: '胞姐 · 大姐', relation: '旁系血亲' }, children: [
      { label: '姐夫', emoji: '👨', type: 'affinal', info: { title: '姐夫', desc: '姐姐的丈夫', relation: '姻亲' } },
      { label: '外甥', emoji: '👶', type: 'collateral', info: { title: '外甥', desc: '姐姐的儿子', relation: '旁系血亲' } },
      { label: '外甥女', emoji: '👶', type: 'collateral', info: { title: '外甥女', desc: '姐姐的女儿', relation: '旁系血亲' } }
    ]},
    { label: '妹', emoji: '👧', type: 'collateral', info: { title: '妹妹', desc: '胞妹 · 老妹', relation: '旁系血亲' }, children: [
      { label: '妹夫', emoji: '👨', type: 'affinal', info: { title: '妹夫', desc: '妹妹的丈夫', relation: '姻亲' } },
      { label: '外甥儿', emoji: '👶', type: 'collateral', info: { title: '外甥儿', desc: '妹妹的儿子', relation: '旁系血亲' } },
      { label: '外甥女', emoji: '👶', type: 'collateral', info: { title: '外甥女', desc: '妹妹的女儿', relation: '旁系血亲' } }
    ]},
    { label: '子', emoji: '👶', type: 'direct', info: { title: '儿子', desc: '孩子 · 仔', relation: '直系血亲' }, children: [
      { label: '儿媳', emoji: '👩', type: 'affinal', info: { title: '儿媳', desc: '儿子的妻子', relation: '姻亲' } },
      { label: '孙子', emoji: '👶', type: 'direct', info: { title: '孙子', desc: '儿子的儿子', relation: '直系血亲' } },
      { label: '孙女', emoji: '👶', type: 'direct', info: { title: '孙女', desc: '儿子的女儿', relation: '直系血亲' } }
    ]},
    { label: '女', emoji: '👶', type: 'direct', info: { title: '女儿', desc: '闺女 · 千金', relation: '直系血亲' }, children: [
      { label: '女婿', emoji: '👨', type: 'affinal', info: { title: '女婿', desc: '女儿的丈夫', relation: '姻亲' } },
      { label: '外孙', emoji: '👶', type: 'direct', info: { title: '外孙', desc: '女儿的儿子', relation: '直系血亲' } },
      { label: '外孙女', emoji: '👶', type: 'direct', info: { title: '外孙女', desc: '女儿的女儿', relation: '直系血亲' } }
    ]}
  ]
};

const NODE_R = 28;    // 节点半径 px
const LEVEL_W = 150;  // 每层横向间距
const SLOT_H = 68;    // 叶子纵向间距
const MARGIN = 40;    // 画布留白

Page({
  data: {
    mapW: 0,
    mapH: 0,
    nodes: [],
    lines: [],
    selectedInfo: null
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '亲属关系脑图' });
    this._expanded = {};
    this._treeNodes = {};
    this.assignUid(TREE, 1);
    this._expanded[TREE.uid] = true;
    this.rebuild();
  },

  // 为每个节点分配唯一 uid（label 有重复，不能用 label 作 key）
  assignUid(node, id) {
    node.uid = id;
    let next = id + 1;
    if (node.children) {
      node.children.forEach(c => { next = this.assignUid(c, next); });
    }
    return next;
  },

  visibleChildren(node) {
    if (!node.children || !this._expanded[node.uid]) return [];
    return node.children;
  },

  // 子树高度 = 展开的叶子数 × SLOT_H
  measure(node) {
    const children = this.visibleChildren(node);
    if (!children.length) {
      node._h = SLOT_H;
      return;
    }
    let total = 0;
    children.forEach(c => { this.measure(c); total += c._h; });
    node._h = total;
  },

  // 分配坐标：x 按深度、y 居中于子节点之间
  place(node, depth, top, out) {
    const children = this.visibleChildren(node);
    const x = MARGIN + NODE_R + depth * LEVEL_W;
    let y;
    if (!children.length) {
      y = MARGIN + top + SLOT_H / 2;
    } else {
      let cursor = top;
      const centers = [];
      children.forEach(c => {
        this.place(c, depth + 1, cursor, out);
        centers.push(cursor + c._h / 2);
        cursor += c._h;
      });
      y = MARGIN + (centers[0] + centers[centers.length - 1]) / 2;
    }
    out.push({ node, x, y });
  },

  rebuild() {
    this.measure(TREE);
    const placed = [];
    this.place(TREE, 0, 0, placed);

    const posMap = new Map();
    placed.forEach(p => posMap.set(p.node, p));

    // 连线：父右边 → 竖中线 → 子左边（三段直角连线）
    const lines = [];
    placed.forEach(p => {
      this.visibleChildren(p.node).forEach(c => {
        const cp = posMap.get(c);
        const midX = (p.x + cp.x) / 2;
        lines.push({ k: lines.length, x: p.x + NODE_R, y: p.y - 1, w: midX - p.x - NODE_R, h: 2 });
        if (Math.abs(cp.y - p.y) > 1) {
          lines.push({ k: lines.length, x: midX - 1, y: Math.min(p.y, cp.y), w: 2, h: Math.abs(cp.y - p.y) });
        }
        lines.push({ k: lines.length, x: midX, y: cp.y - 1, w: cp.x - NODE_R - midX, h: 2 });
      });
    });

    const nodes = placed.map(p => ({
      uid: p.node.uid,
      label: p.node.label,
      emoji: p.node.emoji,
      type: p.node.type,
      x: p.x,
      y: p.y,
      hasChildren: !!(p.node.children && p.node.children.length),
      expanded: !!this._expanded[p.node.uid],
      info: p.node.info,
      isRoot: p.node.label === '我'
    }));
    placed.forEach(p => { this._treeNodes[p.node.uid] = p.node; });

    let maxDepth = 0;
    const calcDepth = (node, d) => {
      if (d > maxDepth) maxDepth = d;
      this.visibleChildren(node).forEach(c => calcDepth(c, d + 1));
    };
    calcDepth(TREE, 0);

    this.setData({
      nodes,
      lines,
      mapW: MARGIN * 2 + NODE_R * 2 + maxDepth * LEVEL_W,
      mapH: MARGIN * 2 + TREE._h
    });
  },

  // 点击节点（原生 bindtap，无坐标换算，绝不偏移）
  onNodeTap(e) {
    const uid = e.currentTarget.dataset.uid;
    const node = this._treeNodes[uid];
    if (!node) return;
    this.setData({ selectedInfo: node.info });
    if (node.children && node.children.length) {
      this._expanded[uid] = !this._expanded[uid];
      this.rebuild();
    }
  }
});