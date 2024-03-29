const canvas = (function () {
  'use strict';

  let canvas;
  let ctx;
  let images = new Map();
  let canvasMidX;
  let canvasMidY;

  function init() {
    return loadImages()
      .then(function () {
        const bigCircle = images.get('Level1CircleBig');
        createCanvas({width: bigCircle.width, height: bigCircle.height});
      });
  }

  function loadImages() {
    return Promise.all([
      'Level1CircleBig',
      'BallGreen'
    ].map(loadImage));
  }

  function loadImage(imgName) {
    return new Promise(resolve => {
      const el = document.createElement('img');
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
    const img = images.get('Level1CircleBig');
    ctx.save();
    ctx.rotate(rotation);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  function drawGreenBall(x, y) {
    const img = images.get('BallGreen');

    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();
  }

  return {
    init,
    reset,
    drawLevel1CircleBig,
    drawGreenBall
  };
})();
