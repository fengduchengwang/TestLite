import { addFollow, removeFollow } from '~/utils/test';

export default Behavior({
  methods: {
    onFollow(e) {
      const { id } = e.detail;
      addFollow(id);
      this.updateFollowedState(id, true);
      wx.showToast({ title: '已关注', icon: 'none' });
    },

    onUnfollow(e) {
      const { id } = e.detail;
      removeFollow(id);
      this.updateFollowedState(id, false);
      wx.showToast({ title: '已取消关注', icon: 'none' });
    },

    updateFollowedState(id, followed) {
      const key = ['cardInfo', 'results'].find((name) => Array.isArray(this.data[name]));
      if (!key) return;

      this.setData({
        [key]: this.data[key].map((item) =>
          item.id === id ? { ...item, followed } : item,
        ),
      });
    },
  },
});
