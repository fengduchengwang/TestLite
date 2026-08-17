(function () {
  const catalog = window.PsyTest.catalog;
  Object.assign(catalog, {
    fun_001: { template: 'light', pack: '../data/packs/fun-01.js', title: '如果你的周末是一家店，会卖什么？' },
    featured_001: { template: 'light', pack: '../data/packs/featured-01.js', title: '你的快乐需要观众吗？' },
    featured_002: { template: 'standard', pack: '../data/packs/featured-01.js', title: '你的拖延，究竟在躲哪一种不舒服？' },
    featured_003: { template: 'standard', pack: '../data/packs/featured-01.js', title: '你会不会把别人的情绪，当成自己的任务？' },
    love_001: { template: 'deep', pack: '../data/packs/love-01.js', title: '你为什么总在关系里累？' },
    work_001: { template: 'deep', pack: '../data/packs/work-01.js', title: '你该换工作，还是先换一种工作方式？' }
  });
}());
