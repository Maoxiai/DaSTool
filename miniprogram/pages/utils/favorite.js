// 收藏工具数据层（本地缓存）
const KEY = 'favoriteTools';

// 获取收藏的工具 type 列表（保持收藏顺序）
function getFavorites() {
  return wx.getStorageSync(KEY) || [];
}

// 是否已收藏
function isFavorite(type) {
  return getFavorites().indexOf(type) > -1;
}

// 切换收藏：已收藏则取消，未收藏则添加；返回最新列表
function toggleFavorite(type) {
  let list = getFavorites();
  const idx = list.indexOf(type);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(type);
  }
  wx.setStorageSync(KEY, list);
  return list;
}

// 取消收藏
function removeFavorite(type) {
  let list = getFavorites();
  const idx = list.indexOf(type);
  if (idx > -1) {
    list.splice(idx, 1);
    wx.setStorageSync(KEY, list);
  }
  return list;
}

module.exports = {
  getFavorites,
  isFavorite,
  toggleFavorite,
  removeFavorite
};
