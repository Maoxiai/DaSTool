// 云函数：查询全部工具的启动次数统计（按次数降序）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  try {
    const res = await db.collection('tool_stats')
      .orderBy('count', 'desc')
      .limit(100)
      .get();
    return { ok: true, list: res.data };
  } catch (e) {
    return { ok: false, msg: e.message };
  }
};