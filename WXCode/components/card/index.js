import { openTest } from '../../utils/test';

Component({
  properties: {
    testId: Number,
    title: String,
    subtitle: String,
    questionCount: Number,
    duration: String,
    url: String,
    link: String,
    tested: {
      type: Boolean,
      value: false,
    },
    tags: Array,
  },

  methods: {
    onTap() {
      const { testId, link } = this.properties;
      if (!link) return;

      openTest(testId, link);
      this.setData({ tested: true });
      this.triggerEvent('tested', { id: testId });
    },
  },
});
