const HISTORY_KEY = 'search_history';

Page({
  data: {
    historyWords: [],
    searchValue: '',
  },

  deleteType: 0,
  deleteIndex: '',

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const historyWords = wx.getStorageSync(HISTORY_KEY) || [];
    this.setData({ historyWords });
  },

  saveHistory(keyword) {
    const historyWords = [...this.data.historyWords];
    const index = historyWords.indexOf(keyword);
    if (index !== -1) historyWords.splice(index, 1);
    historyWords.unshift(keyword);
    wx.setStorageSync(HISTORY_KEY, historyWords.slice(0, 20));
    this.setData({ historyWords: historyWords.slice(0, 20) });
  },

  goResult(keyword) {
    if (!keyword) return;
    this.saveHistory(keyword);
    wx.navigateTo({
      url: `/pages/search/result/index?keyword=${encodeURIComponent(keyword)}`,
    });
  },

  confirmDelete() {
    const { historyWords } = this.data;
    const { deleteType, deleteIndex } = this;

    if (deleteType === 0) {
      historyWords.splice(deleteIndex, 1);
      wx.setStorageSync(HISTORY_KEY, historyWords);
      this.setData({ historyWords });
    } else {
      wx.setStorageSync(HISTORY_KEY, []);
      this.setData({ historyWords: [] });
    }
  },

  showDeleteConfirm(content) {
    wx.showModal({
      title: '提示',
      content,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.confirmDelete();
        }
      },
    });
  },

  handleClearHistory() {
    this.deleteType = 1;
    this.showDeleteConfirm('确认删除所有历史记录');
  },

  deleteCurr(e) {
    const { index } = e.currentTarget.dataset;
    this.deleteIndex = index;
    this.deleteType = 0;
    this.showDeleteConfirm('确认删除当前历史记录');
  },

  handleHistoryTap(e) {
    const { historyWords } = this.data;
    const { index } = e.currentTarget.dataset;
    const searchValue = historyWords[index || 0] || '';
    this.goResult(searchValue);
  },

  handleSubmit(e) {
    const { value } = e.detail;
    if (!value || !value.trim()) return;
    this.goResult(value.trim());
  },

  actionHandle() {
    this.setData({ searchValue: '' });
    wx.switchTab({ url: '/pages/home/index' });
  },
});
