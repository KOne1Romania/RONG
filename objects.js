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

      var ballPosition = math.getBallPosition(0, 0, constants.circleSize, this.x, this.y,
        constants.ballSize, nextCoord.angle);

      if (!ballPosition.isIn) {
        //game.stop();
        this.x = ballPosition.nextX;
        this.y = ballPosition.nextY;
        this.destX = ballPosition.nextDestX;
        this.destY = ballPosition.nextDestY;
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
    var x = Math.random() * 2000;
    return x < 1000
      ? x / 2 - 1000
      : x / 2 + 1000;
  }

  return {
    init,
    draw,
    act,
    setCircleRotation
  };
})();
