const objects = (function () {
  'use strict';

  var objects;
  var fullCircleRotation = 360;
  var ballSpeed = constants.ballSpeed;

  var currentCircle = {
    rotation: 0,
    act() {},
    draw() {
      canvas.drawLevel1CircleBig(this.rotation);
    },
    setRotation(rotationDelta) {
      this.rotation = (this.rotation + rotationDelta) % fullCircleRotation;
    }
  };
  var currentBall = {
    x: 0,
    y: 0,
    destX: getRandomCoord(),
    destY: getRandomCoord(),
    act() {
      var nextCoord = math.getNextCoord(this.x, this.y, this.destX, this.destY, ballSpeed);
      this.x = nextCoord.x;
      this.y = nextCoord.y;

      if (!math.circleContainsBall(0, 0, constants.circleSize, this.x, this.y, constants.ballSize)) {
        game.stop();
      }
    },
    draw() {
      canvas.drawGreenBall(this.x, this.y);
    }
  };

  function init() {
    setObjects([currentCircle, currentBall]);
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

  function getRandomCoord() {
    var x = Math.random() * 1000;
    return x < 500
      ? x - 500
      : x + 500;
  }

  return {
    init,
    draw,
    act,
    setCircleRotation
  };
})();
