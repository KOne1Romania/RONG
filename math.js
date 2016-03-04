const math = (function () {
  'use strict';

  function getNextCoord(x1, y1, x2, y2, dist) {
    const angle = Math.atan2(y2 - y1, x2 - x1);

    return {
      x: x1 + Math.cos(angle) * dist,
      y: y1 + Math.sin(angle) * dist,
      angle
    };
  }

  function getBallNextPosition(circleCenterX, circleCenterY, cirlceSize, ballX,
    ballY, ballSize, currentAngle) {
    const ballDistance = pitagora(ballX, ballY, circleCenterX, circleCenterY);
    const halfBallSize = ballSize / 2;
    const halfCircleSize = cirlceSize / 2;
    const outDistanceDiff = ballDistance + halfBallSize - halfCircleSize;
    const result = {
      ballDistance,
      isIn: outDistanceDiff < 0
    };

    if (result.isIn) { return result; }

    const reverseAngle = getReverseAngle(currentAngle);
    const radiusAngle = Math.atan2(circleCenterY - ballY, circleCenterX - ballX);
    const nextAngle = getReflectionAngle(reverseAngle, radiusAngle);
    result.nextX = ballX - outDistanceDiff * Math.cos(nextAngle);
    result.nextY = ballY - outDistanceDiff * Math.sin(nextAngle);

    return result;
  }

  function getReverseAngle(angle) {
    return angle > 0
      ? angle - Math.PI
      : angle + Math.PI;
  }

  function getReflectionAngle(currentAngle, referenceAngle) {
    return 2 * referenceAngle - currentAngle;
  }

  function pitagora(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  }

  function line(x1, y1, x2, y2) {
    const yDif = y1 - y2;

    if (!yDif) { throw new Error('Horizontal line'); }

    const a = (x1 - x2) / yDif;
    const b = y1 - a * x1;

    return {a, b};
  }

  function getLineX(a, b, y) {
    return (y - b) / a;
  }

  function getLineY(a, b, x) {
    return a * x + b;
  }

  function getCircleIntersection() {
    // if line is horizontal check where x is on the circle
    // if line is vertical check where y is on the circle
    // otherwise see where the line intersects the circle

    // y = ax + b
    // (centerX - x)^2 + (centerY - y)^2 = r^2
    // centerX^2 + x^2 - 2xcenterX + centerY^2 + (ax + b)^2 - 2centerY(ax + b) = r^2
    // centerX^2 + x^2 - 2xcenterX + centerY^2 + ax^2 + b^2 + 2axb - 2axcenterY - 2centerYb = r^2
    // x^2 - 2xcenterX + ax^2 + 2axb - 2axcenterY = r^2 - centerX^2 - centerY^2 - b^2 + 2centerYb
    // (a + 1)x^2 + x(2ab - 2centerX - 2acenterY) = r^2 - centerX^2 - centerY^2 - b^2 + 2centerYb

    // z1x^2 + z2x + z3 = 0
    // d = z2^2 - 4z1z3
    // x1 = (-z2 + sqrt(d)) / 2z1
    // x2 = (-z2 - sqrt(d)) / 2z1
  }

  function eq2(a, b, c) {
    const twoA = 2 * a;
    const delta = b * b - 4 * a * c;
    const hasOneSolution = delta === 0;
    const sqrtDelta = Math.sqrt(delta);
    let x1, x2;

    if (delta < 0) { throw new Error('No solution'); }

    x1 = (-b + sqrtDelta) / twoA;
    x2 = hasOneSolution
      ? x1
      : (-b - sqrtDelta) / twoA;

    return {x1, x2, hasOneSolution};
  }

  return {
    getNextCoord,
    getBallNextPosition
  };
})();
