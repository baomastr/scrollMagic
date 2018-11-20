export default size => {
  window.matchMedia =
    window.matchMedia ||
    function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
      };
    };

  return window.matchMedia(size);
};
