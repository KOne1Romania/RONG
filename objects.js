const objects = (function () {
  'use strict';

  let objects;
  const fullCircleRotation = 360;
  const ballSpeed = constants.ballSpeed;

  const spikeIntervals = [
    {from: 244, to: 297}
  ];

  const currentCircle = {
    rotation: 0,

    act() {},

    draw() {
      canvas.drawLevel1CircleBig(this.rotation);
    },

    setRotation(rotationDelta) {
      this.rotation = normalizeRad(this.rotation + rotationDelta);
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
        if (isInSpikesRange(spikeIntervals,
          math.getAngle(constants.circleCenterX, constants.circleCenterY, this.x, this.y))) {
          game.stop();
        }

        this.updateMovement(ballPosition);
      }
    },

    updateMovement(ballPosition) {
      this.x = ballPosition.nextX;
      this.y = ballPosition.nextY;
      // this.destX = getDistantCoord(this.x);
      // this.destY = getDistantCoord(this.y);
      this.destX = getDistantCoord();
      this.destY = getDistantCoord();
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

  function isInSpikesRange(spikeIntervals, angle) {
    return spikeIntervals.some(interval => isInSpikeRange(interval, angle));
  }

  function isInSpikeRange(spikeInterval, radAngle) {
    const circleRotation = radToPositiveAngle(currentCircle.rotation);
    const from = normalizeAngle(circleRotation + spikeInterval.from);
    const to = normalizeAngle(circleRotation + spikeInterval.to);
    const angle = radToPositiveAngle(radAngle);

    if (from < to) {
      return angle > from && angle < to;
    }

    return angle > from && angle <= 0
      || angle < to && angle >= 0;
  }

  function radToPositiveAngle(radAngle) {
    return radToAngle(normalizeRad(radAngle));
  }

  function radToAngle(rad) {
    return rad * 180 / Math.PI;
  }

  function normalizeAngle(angle) {
    angle = angle % 360;

    if (angle < 0) { angle += 360; }

    return angle;
  }

  function normalizeRad(rad) {
    const maxRad = Math.PI * 2;
    rad = rad % maxRad;

    if (rad < 0) { rad += maxRad; }

    return rad;
  }

  return {
    init,
    draw,
    act,
    setCircleRotation
  };
})();
