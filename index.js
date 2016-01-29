(function () {
  'use strict';

  Promise.all([
    canvas.init(),
    objects.init(),
    user.init()
  ]).then(function () {
    game.start();
  }, function (err) {
    console.error(err);
  });
})();
