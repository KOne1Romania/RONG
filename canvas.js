const canvas = (function () {
  'use strict';

  var canvas;
  var ctx;
  var images = new Map();
  var circleCenterX;
  var circleCenterY;

  function init() {
    createCanvas({width: 500, height: 300});
    return loadImages();
  }

  function loadImages() {
    return Promise.all([
      'Level1CircleBig'
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
    circleCenterY = config.height / 2;
    circleCenterX = config.width / 2;
    ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);
  }

  function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawLevel1CircleBig(rotation) {
    var img = images.get('Level1CircleBig');
    ctx.drawImage(img, circleCenterX - img.width / 2, circleCenterY - img.height / 2,
      img.width, img.height);
  }

  return {
    init,
    reset,
    drawLevel1CircleBig
  };
})();
