const game = (function () {
  'use strict';

  let currentAnimationFrame;
  let isOn_ = false;

  function start() {
    isOn_ = true;
    iterate();
  }

  function stop() {
    isOn_ = false;
    cancelAnimationFrame(currentAnimationFrame);
  }

  function iterate() {
    canvas.reset();
    objects.act();
    objects.draw();

    if (isOn_) {
      currentAnimationFrame = requestAnimationFrame(iterate);
    }
  }

  function isOn() {
    return isOn_;
  }

  return {
    start,
    stop,
    isOn
  };
})();
