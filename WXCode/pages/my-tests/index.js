import testList from '~/data/tests';
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

  loadData() {
    this.setData({
      cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(getTestedTests(testList))),
    });
  },

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },
});
