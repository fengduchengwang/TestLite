(function () {
  const root = window.PsyTest = window.PsyTest || {};
  root.data = root.data || {};
  root.catalog = root.catalog || {};
  root.utils = {
    escape(value) {
      return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[char]);
    },
    clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    },
    band(value) {
      if (value >= 67) return 'high';
      if (value <= 33) return 'low';
      return 'medium';
    }
  };
}());
