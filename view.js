const view = (function () {
  function pause() {
    document.body.classList.add('paused');
  }

  function unpause() {
    document.body.classList.remove('paused');
  }

  return {
    pause,
    unpause
  };
})();
