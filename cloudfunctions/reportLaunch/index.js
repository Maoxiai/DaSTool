// 云函数：上报工具启动次数
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {
  const { type } = event;
  if (!type) {
    return { ok: false, msg: '缺少 type 参数' };
  }

  const coll = db.collection('tool_stats');
  try {
    const exist = await coll.where({ type }).limit(1).get();
    if (exist.data.length > 0) {
      await coll.doc(exist.data[0]._id).update({
        data: { count: _.inc(1) }
      });
    } else {
      await coll.add({ data: { type, count: 1 } });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, msg: e.message };
  }
};