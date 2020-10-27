// Little Canvas things
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d'); // Set Canvas to be window size

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // Configuration, Play with these

var config = {
  particleNumber: 200,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
}; // Colors

var colorPalette = {
  bg: {
    r: 12,
    g: 9,
    b: 29
  },
  matter: [{
    r: 227,
    g: 27,
    b: 35
  }, 
  {
    r: 152,
    g: 0,
    b: 46
  }, 
  {
    r: 111,
    g: 18,
    b: 96
  }, 
  {
    r: 253,
    g: 238,
    b: 152
  } // totesASun
  ]
}; // Some Variables hanging out

var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    _drawBg,
    // Draws the background for the canvas, because space
_drawBg = function drawBg(ctx, color) {
  ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}; // Particle Constructor


var Particle = function Particle(x, y) {
  // X Coordinate
  this.x = x || Math.round(Math.random() * canvas.width); // Y Coordinate

  this.y = y || Math.round(Math.random() * canvas.height); // Radius of the space dust

  this.r = Math.ceil(Math.random() * config.maxParticleSize); // Color of the rock, given some randomness

  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true); // Speed of which the rock travels

  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7); // Direction the Rock flies

  this.d = Math.round(Math.random() * 360);
}; // Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2


var colorVariation = function colorVariation(color, returnString) {
  var r, g, b, a, variation;
  r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
  g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
  b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
  a = Math.random() + .5;

  if (returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return {
      r,
      g,
      b,
      a
    };
  }
}; // Used to find the rocks next point in space, accounting for speed and direction


var updateParticleModel = function updateParticleModel(p) {
  var a = 180 - (p.d + 90); // find the 3rd angle

  p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
  p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
  return p;
}; // Just the function that physically draws the particles
// Physically? sure why not, physically.


var drawParticle = function drawParticle(x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.moveTo(x+75, y+40);
  ctx.bezierCurveTo(x+75, y+37, x+70, y+25, x+50, y+25);
  ctx.bezierCurveTo(x+20, y+25, x+20, y+62.5, x+20, y+62.5);
  ctx.bezierCurveTo(x+20, y+80, x+40, y+102, x+75, y+120);
  ctx.bezierCurveTo(x+110, y+102, x+130, y+80, x+130, y+62.5);
  ctx.bezierCurveTo(x+130, y+62.5, x+130, y+25, x+100, y+25);
  ctx.bezierCurveTo(x+85, y+25, x+75, y+37, x+75, y+40);

  // ctx.bezierCurveTo(x, y, x-5, y-12, x-25, y-12);

  ctx.fill();
  ctx.closePath();
}; // Remove particles that aren't on the canvas


var cleanUpArray = function cleanUpArray() {
  particles = particles.filter(p => {
    return p.x > -100 && p.y > -100;
  });
};

var initParticles = function initParticles(numParticles, x, y) {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }

  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
}; // That thing


window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}(); // Our Frame function


var frame = function frame() {
  // Draw background first
  _drawBg(ctx, colorPalette.bg); // Update Particle models to new position


  particles.map(p => {
    return updateParticleModel(p);
  }); // Draw em'

  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  }); // Play the same song? Ok!

  window.requestAnimFrame(frame);
}; // Click listener


document.body.addEventListener("click", function (event) {
  var x = event.clientX,
      y = event.clientY;
  cleanUpArray();
  initParticles(config.particleNumber, x, y);
}); // First Frame

frame(); // First particle explosion

initParticles(config.particleNumber);