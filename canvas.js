const canvas = (function () {
  'use strict';

  var canvas;
  var ctx;
  var images = new Map();
  var canvasMidX;
  var canvasMidY;
  var ballSizeDrawingRatio = 0.3;

  function init() {
    createCanvas({width: 500, height: 300});
    return loadImages();
  }

  function loadImages() {
    return Promise.all([
      'Level1CircleBig',
      'BallGreen'
    ].map(loadImage));
  }

  function loadImage(imgName) {
    return new Promise(resolve => {
      var el = document.createElement('img');
      el.src = 'img/' + imgName + '.png';
      el.onload = function () {
        images.set(imgName, el);
        resolve();
      };
    });
  }

  function createCanvas(config) {
    canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    canvasMidX = canvas.width / 2;
    canvasMidY = canvas.height / 2;
    ctx = canvas.getContext('2d');
    ctx.translate(canvasMidX, canvasMidY);

    document.body.appendChild(canvas);
  }

  function reset() {
    ctx.clearRect(-canvasMidX, -canvasMidY, canvas.width, canvas.height);
  }

  function drawLevel1CircleBig(rotation) {
    var img = images.get('Level1CircleBig');
    ctx.save();
    ctx.rotate(rotation);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  function drawGreenBall(x, y) {
    var img = images.get('BallGreen');
    ctx.save();
    ctx.translate(x + 5 * ballSizeDrawingRatio, y + 13 * ballSizeDrawingRatio);
    ctx.drawImage(img, -img.width / 2 * ballSizeDrawingRatio, -
      img.height / 2 * ballSizeDrawingRatio,
      img.width * ballSizeDrawingRatio,
      img.height * ballSizeDrawingRatio);
    ctx.restore();
  }

  return {
    init,
    reset,
    drawLevel1CircleBig,
    drawGreenBall
  };
})();
