const game = (function () {
  var currentAnimationFrame;

  function start() {
    iterate();
  }

  function stop() {
    cancelAnimationFrame(currentAnimationFrame);
  }

  function iterate() {
    canvas.reset();
    objects.act();
    objects.draw();
    currentAnimationFrame = requestAnimationFrame(iterate);
  }

  return {
    start,
    stop
  };
})();
