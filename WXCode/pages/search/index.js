import { HOT_SEARCH_TAGS } from '~/data/tests';

const HISTORY_KEY = 'search_history';
const MAX_HISTORY = 10;

Page({
  data: {
    hotTags: HOT_SEARCH_TAGS,
    historyWords: [],
    searchValue: '',
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const historyWords = wx.getStorageSync(HISTORY_KEY) || [];
    this.setData({ historyWords });
  },

  saveHistory(keyword) {
    let historyWords = [...this.data.historyWords];
    historyWords = historyWords.filter((item) => item !== keyword);
    historyWords.unshift(keyword);
    historyWords = historyWords.slice(0, MAX_HISTORY);
    wx.setStorageSync(HISTORY_KEY, historyWords);
    this.setData({ historyWords });
  },

  goResult(keyword) {
    if (!keyword) return;
    this.saveHistory(keyword);
    wx.navigateTo({
      url: `/pages/search/result/index?keyword=${encodeURIComponent(keyword)}`,
    });
  },

  handleHotTap(e) {
    const { keyword } = e.currentTarget.dataset;
    this.setData({ searchValue: keyword });
    this.goResult(keyword);
  },

  handleDeleteHistory(e) {
    const { index } = e.currentTarget.dataset;
    const historyWords = [...this.data.historyWords];
    historyWords.splice(index, 1);
    wx.setStorageSync(HISTORY_KEY, historyWords);
    this.setData({ historyWords });
  },

  handleHistoryTap(e) {
    const { keyword } = e.currentTarget.dataset;
    this.setData({ searchValue: keyword });
    this.goResult(keyword);
  },

  handleSubmit(e) {
    const { value } = e.detail;
    if (!value || !value.trim()) return;
    this.goResult(value.trim());
  },

  handleChange(e) {
    this.setData({ searchValue: e.detail.value });
  },

  handleBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({ url: '/pages/home/index' });
      },
    });
  },
});
