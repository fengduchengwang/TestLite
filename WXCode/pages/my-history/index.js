import testList from '~/data/tests';
import { enrichTestsWithTested, getBrowseHistoryTests } from '~/utils/test';

Page({
  data: {
    cardInfo: [],
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    this.setData({
      cardInfo: enrichTestsWithTested(getBrowseHistoryTests(testList)),
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
