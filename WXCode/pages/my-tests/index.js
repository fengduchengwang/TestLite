import { fetchTestList } from '~/utils/api';
import useFollowCard from '~/behaviors/useFollowCard';
import {
  enrichTestsWithFollowed,
  enrichTestsWithTested,
  getTestedTests,
} from '~/utils/test';

Page({
  behaviors: [useFollowCard],

  data: {
    cardInfo: [],
  },

  onShow() {
    this.loadData();
  },

  async loadData() {
    try {
      const list = await fetchTestList();
      this.setData({
        cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(getTestedTests(list))),
      });
    } catch (error) {
      console.error(error);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },
});
