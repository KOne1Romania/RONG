const math = (function () {
  'use strict';

  // function line(x1, y1, x2, y2) {
  //   const yDif = y1 - y2;

  //   if (!yDif) { throw new Error('Horizontal line'); }

  //   const a = (x1 - x2) / yDif;
  //   const b = y1 - a * x1;

  //   return {a, b};
  // }

  // function getLineX(a, b, y) {
  //   return (y - b) / a;
  // }

  // function getLineY(a, b, x) {
  //   return a * x + b;
  // }

  // function getCircleIntersection() {
  //   // if line is horizontal check where x is on the circle
  //   // if line is vertical check where y is on the circle
  //   // otherwise see where the line intersects the circle

  //   // y = ax + b
  //   // (cx - x)^2 + (cy - y)^2 = r^2
  //   // cx^2 + x^2 - 2xcx + cy^2 + (ax + b)^2 - 2cy(ax + b) = r^2
  //   // cx^2 + x^2 - 2xcx + cy^2 + ax^2 + b^2 + 2axb - 2axcy - 2cyb = r^2
  //   // x^2 - 2xcx + ax^2 + 2axb - 2axcy = r^2 - cx^2 - cy^2 - b^2 + 2cyb
  //   // (a + 1)x^2 + x(2ab - 2cx - 2acy) = r^2 - cx^2 - cy^2 - b^2 + 2cyb

  //   // z1x^2 + z2x + z3 = 0
  //   // d = z2^2 - 4z1z3
  //   // x1 = (-z2 + sqrt(d)) / 2z1
  //   // x2 = (-z2 - sqrt(d)) / 2z1
  // }

  // function eq2(a, b, c) {
  //   const twoA = 2 * a;
  //   const delta = b * b - 4 * a * c;
  //   const hasOneSolution = delta === 0;
  //   const sqrtDelta = Math.sqrt(delta);
  //   let x1, x2;

  //   if (delta < 0) { throw new Error('No solution'); }

  //   x1 = (-b + sqrtDelta) / twoA;
  //   x2 = hasOneSolution
  //     ? x1
  //     : (-b - sqrtDelta) / twoA;

  //   return {x1, x2, hasOneSolution};
  // }

  return {

  };
})();
