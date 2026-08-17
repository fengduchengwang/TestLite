import { searchTests } from '../searchTests';
import useFollowCard from '~/behaviors/useFollowCard';
import { enrichTestsWithFollowed, enrichTestsWithTested } from '~/utils/test';

Page({
  behaviors: [useFollowCard],

  data: {
    keyword: '',
    results: [],
  },

  onLoad(options) {
    this.keyword = decodeURIComponent(options.keyword || '');
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  async loadData() {
    try {
      const list = await searchTests(this.keyword || this.data.keyword);
      const results = enrichTestsWithFollowed(enrichTestsWithTested(list));
      this.setData({
        keyword: this.keyword || this.data.keyword,
        results,
      });
    } catch (error) {
      console.error(error);
      wx.showToast({ title: '搜索失败', icon: 'none' });
    }
  },

  onTested(e) {
    const { id } = e.detail;
    const results = this.data.results.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ results });
  },
});
