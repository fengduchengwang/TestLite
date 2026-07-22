import { searchTests } from '../searchTests';
import { enrichTestsWithTested } from '~/utils/test';

Page({
  data: {
    keyword: '',
    results: [],
  },

  onLoad(options) {
    const keyword = decodeURIComponent(options.keyword || '');
    const results = enrichTestsWithTested(searchTests(keyword));
    this.setData({ keyword, results });
  },
});
