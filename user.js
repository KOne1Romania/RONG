const user = (function () {
  'use strict';

  var moving = false;
  var movementRotationRatio = 0.0100;

  function init() {
    initHandlers();
  }

  function initHandlers() {
    window.addEventListener('mousedown', function () {
      if (game.isOn()) {
        moving = true;
      }
    });

    window.addEventListener('mouseup', function () {
      if (game.isOn()) {
        moving = false;
      }
    });

    window.addEventListener('mousemove', function (e) {
      if (game.isOn() && moving) {
        objects.setCircleRotation(e.movementY * movementRotationRatio);
      }
    });

    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();

      if (game.isOn()) {
        game.stop();
        view.pause();
      } else {
        game.start();
        view.unpause();
      }
    });
  }

  return {
    init
  };
})();
