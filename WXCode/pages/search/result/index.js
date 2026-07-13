import { searchTests } from '../searchTests';

Page({
  data: {
    keyword: '',
    results: [],
  },

  onLoad(options) {
    const keyword = decodeURIComponent(options.keyword || '');
    const results = searchTests(keyword);
    this.setData({ keyword, results });
  },
});
