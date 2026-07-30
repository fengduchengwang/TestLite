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

  loadData() {
    const results = enrichTestsWithFollowed(
      enrichTestsWithTested(searchTests(this.keyword || this.data.keyword)),
    );
    this.setData({
      keyword: this.keyword || this.data.keyword,
      results,
    });
  },

  onTested(e) {
    const { id } = e.detail;
    const results = this.data.results.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ results });
  },
});
