// 构图指南：常见摄影构图法则
// 每个构图附一张用 CSS 绘制的简易示意（shapes 为画布内元素）
const RULES = [
  {
    name: '三分法',
    icon: '🔲',
    desc: '将画面横竖各分三等份，主体放在交叉点或分割线上，是应用最广的构图法。',
    shapes: [
      { t: 'line', s: 'left:33.33%;top:0;width:3rpx;height:100%;' },
      { t: 'line', s: 'left:66.66%;top:0;width:3rpx;height:100%;' },
      { t: 'line', s: 'left:0;top:33.33%;width:100%;height:3rpx;' },
      { t: 'line', s: 'left:0;top:66.66%;width:100%;height:3rpx;' },
      { t: 'dot', s: 'left:33.33%;top:33.33%;width:22rpx;height:22rpx;' },
      { t: 'dot', s: 'left:66.66%;top:66.66%;width:22rpx;height:22rpx;' }
    ]
  },
  {
    name: '黄金分割',
    icon: '🐚',
    desc: '主体放在画面 0.618 比例位置，视觉上更和谐自然，接近三分法但更精确。',
    shapes: [
      { t: 'line', s: 'left:61.8%;top:0;width:3rpx;height:100%;' },
      { t: 'line', s: 'left:0;top:61.8%;width:100%;height:3rpx;' },
      { t: 'dot', s: 'left:38.2%;top:38.2%;width:24rpx;height:24rpx;' }
    ]
  },
  {
    name: '引导线',
    icon: '🛤️',
    desc: '利用道路、河流、栏杆等线条，把视线引向主体，增强纵深与方向感。',
    shapes: [
      { t: 'line', s: 'left:0;top:95%;width:82%;height:4rpx;transform:rotate(-52deg);transform-origin:0 50%;' },
      { t: 'line', s: 'right:0;top:95%;width:82%;height:4rpx;transform:rotate(52deg);transform-origin:100% 50%;' },
      { t: 'dot', s: 'left:50%;top:30%;width:26rpx;height:26rpx;' }
    ]
  },
  {
    name: '对称构图',
    icon: '🪞',
    desc: '左右或上下对称，营造平衡、庄重、秩序感，常用于建筑与倒影。',
    shapes: [
      { t: 'line', s: 'left:50%;top:0;width:3rpx;height:100%;' },
      { t: 'block', s: 'left:26%;top:48%;width:20%;height:34%;background:#c8d6e5;border-radius:6rpx;' },
      { t: 'block', s: 'left:54%;top:48%;width:20%;height:34%;background:#c8d6e5;border-radius:6rpx;' },
      { t: 'dot', s: 'left:50%;top:40%;width:20rpx;height:20rpx;' }
    ]
  },
  {
    name: '框架构图',
    icon: '🖼️',
    desc: '利用门、窗、树枝等作为前景框架，突出主体并增加层次与空间感。',
    shapes: [
      { t: 'frame', s: 'left:18%;top:12%;width:64%;height:76%;border-radius:8rpx;' },
      { t: 'dot', s: 'left:50%;top:50%;width:30rpx;height:30rpx;' }
    ]
  },
  {
    name: '对角线构图',
    icon: '📐',
    desc: '让主体沿对角线延伸，增强动感、张力与延伸感。',
    shapes: [
      { t: 'line', s: 'left:0;top:0;width:141%;height:4rpx;transform:rotate(45deg);transform-origin:0 0;' },
      { t: 'dot', s: 'left:35%;top:35%;width:24rpx;height:24rpx;' }
    ]
  },
  {
    name: '中心构图',
    icon: '🎯',
    desc: '主体置于画面正中央，直接有力，适合人像、静物与极简风格。',
    shapes: [
      { t: 'frame', s: 'left:50%;top:50%;width:110rpx;height:110rpx;border-radius:50%;transform:translate(-50%,-50%);' },
      { t: 'dot', s: 'left:50%;top:50%;width:32rpx;height:32rpx;' }
    ]
  },
  {
    name: '留白',
    icon: '⬜',
    desc: '大面积留出空白，突出主体并营造意境、呼吸感，常用于极简与意境摄影。',
    shapes: [
      { t: 'line', s: 'left:0;top:84%;width:100%;height:3rpx;' },
      { t: 'dot', s: 'left:82%;top:70%;width:18rpx;height:18rpx;' }
    ]
  },
  {
    name: '前景层次',
    icon: '🌿',
    desc: '加入前景元素，形成前中后景层次，增强立体感与故事性。',
    shapes: [
      { t: 'block', s: 'left:0;top:70%;width:100%;height:30%;background:#ffb98a;' },
      { t: 'block', s: 'left:32%;top:42%;width:36%;height:24%;background:#9fc6e8;border-radius:6rpx;' },
      { t: 'block', s: 'left:43%;top:14%;width:14%;height:18%;background:#d6e4f0;border-radius:6rpx;' }
    ]
  },
  {
    name: '视角变化',
    icon: '📷',
    desc: '尝试仰拍、俯拍、低角度等非常规视角，打破平淡，让画面更新鲜。',
    shapes: [
      { t: 'block', s: 'left:22%;top:8%;width:56%;height:88%;background:#c8d6e5;clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);' },
      { t: 'line', s: 'left:0;top:96%;width:100%;height:4rpx;' }
    ]
  }
];

Page({
  data: {
    rules: RULES
  }
});
