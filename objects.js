const objects = (function () {
  'use strict';

  let objects;
  const fullCircleRotation = 360;
  const ballSpeed = constants.ballSpeed;

  const currentCircle = {
    rotation: 0,

    act() {},

    draw() {
      canvas.drawLevel1CircleBig(this.rotation);
    },

    setRotation(rotationDelta) {
      this.rotation = (this.rotation + rotationDelta) % fullCircleRotation;
    }
  };

  const currentBall = {
    x: 0,
    y: 0,
    destX: getDistantCoord(),
    destY: getDistantCoord(),

    act() {
      this.move();
    },

    move() {
      const nextCoord = math.getNextCoord(this.x, this.y, this.destX, this.destY, ballSpeed);

      this.x = nextCoord.x;
      this.y = nextCoord.y;

      const ballPosition = math.getBallNextPosition(constants.circleCenterX,
        constants.circleCenterY, constants.circleSize, this.x, this.y,
        constants.ballSize, nextCoord.angle);

      if (!ballPosition.isIn) {
        //game.stop();
        this.updateMovement(ballPosition);
      }
    },

    updateMovement(ballPosition) {
      this.x = ballPosition.nextX;
      this.y = ballPosition.nextY;
      this.destX = getDistantCoord(this.x);
      this.destY = getDistantCoord(this.y);
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

  function getDistantCoord(x) {
    if (x) {
      return -x * 1000;
    }

    x = Math.random() * 2000;

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
