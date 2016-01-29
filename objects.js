const objects = (function () {
  'use strict';

  var objects;
  var currentCircle = {
    rotation: 0,
    act() {},
    draw() {
      canvas.drawLevel1CircleBig(this.rotation);
    },
    setRotation(rotationDelta) {
      this.rotation += rotationDelta;
    }
  };

  function init() {
    setObjects([currentCircle]);
  }

  function setObjects(objects_) {
    objects = objects_;
  }

  function draw() {
    objects.forEach(o => o.draw());
  }

  function act() {
    objects.forEach(o => o.act());
  }

  function setCircleRotation(rotationDelta) {
    currentCircle.setRotation(rotationDelta);
  }

  return {
    init,
    draw,
    act,
    setCircleRotation
  };
})();
