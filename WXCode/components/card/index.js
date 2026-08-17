import { openTest } from '../../utils/test';

Component({
  properties: {
    testId: Number,
    title: String,
    subtitle: String,
    questionCount: Number,
    duration: Number,
    imageLink: String,
    testLink: String,
    quizKey: {
      type: String,
      value: '',
    },
    tested: {
      type: Boolean,
      value: false,
    },
    followed: {
      type: Boolean,
      value: false,
    },
    actionMode: {
      type: String,
      value: '',
    },
  },

  data: {
    showMenu: false,
    tapLocked: false,
  },

  methods: {
    onTap() {
      if (this.data.tapLocked || this.data.showMenu) {
        if (this.data.showMenu) {
          this.setData({ showMenu: false });
        }
        return;
      }

      const { testId, testLink, quizKey } = this.properties;
      if (!quizKey && !testLink) return;

      openTest(testId, testLink, quizKey);
      this.setData({ tested: true });
      this.triggerEvent('tested', { id: testId });
    },

    lockTap() {
      this.setData({ tapLocked: true });
      setTimeout(() => {
        this.setData({ tapLocked: false });
      }, 300);
    },

    onLongPress() {
      const { actionMode } = this.properties;
      if (!actionMode) return;
      this.lockTap();
      this.setData({ showMenu: true });
    },

    onCloseMenu() {
      this.lockTap();
      this.setData({ showMenu: false });
    },

    onFollowActionTap() {
      const { testId, followed } = this.properties;
      this.lockTap();
      this.setData({ showMenu: false });
      this.triggerEvent(followed ? 'unfollow' : 'follow', { id: testId });
    },

    onUnfollowTap() {
      const { testId } = this.properties;
      this.lockTap();
      this.setData({ showMenu: false });
      this.triggerEvent('unfollow', { id: testId });
    },

    noop() {},
  },
});
