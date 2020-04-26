function IFS(canvas, w, h, transforms, color, maxIter) {
  this.canvas = canvas;
  this.w = this.canvas.width = w;
  this.h = this.canvas.height = h;
  this.transforms = this.normalize(transforms);
  this.color = color;
  this.maxIter = maxIter;
  this.ctx = this.canvas.getContext('2d');
}

IFS.prototype.normalize = function(transforms) {
  var sum = transforms.sort(function(a, b) {
    return b.area - a.area;
  }).reduce(function(u, v) {
    return u + v.area;
  }, 0);
  var r = 0;
  transforms.forEach(function(t) {
    t.p = r += t.area / sum;
  });
  return transforms;
};

IFS.prototype.getTransform = function(r) {
  for (var i = 0; i < this.transforms.length; i++)
    if (this.transforms[i].p > r)
      return this.transforms[i];
};

IFS.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.w, this.h);
};

IFS.prototype.iterate = function() {
  var p = {
    x: 0,
    y: Math.random() * 2
  };
  var x, y;
  this.ctx.globalAlpha = 0.05;
  this.ctx.globalCompositeOperation = 'lighter';
  this.ctx.fillStyle = this.color;
  for (var i = 0; i < this.maxIter; i++) {
    x = p.x * 60 + this.w / 2;
    y = this.h / 1.05 - p.y * 60;
    this.ctx.fillRect(x | 0, y | 0, 1, 1);
    // choose random transform
    this.getTransform(Math.random()).applyTransform(p);
  }
};

function Transform(a, b, c, d, e, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
  this.p = 0;
}

Object.defineProperty(Transform.prototype, 'area', {
  get: function() {
    return Math.abs(this.a * this.d - this.b * this.c);
  }
});

Transform.prototype.applyTransform = function(point) {
  var x = point.x, y = point.y;
  point.x = x * this.a + y * this.b + this.e;
  point.y = x * this.c + y * this.d + this.f;
  return point;
};

var fractal = new IFS(
  document.querySelector('canvas'),
  window.innerWidth,
  window.innerHeight,
  [
    // Barnsley Fern IFS parameters
    new Transform(0, 0, 0, 0.16, 0, 0),
    new Transform(0.85, 0.04, -0.04, 0.85, 0, 1.6),
    new Transform(0.2, -0.26, 0.23, 0.22, 0, 1.6),
    new Transform(-0.15, 0.25, 0.26, 0.24, 0, 0.44)
  ],
  '#1f3',
  400
);

var i = 0;
function tick() {
  for (var j = 0; j < 40; j++)
    fractal.iterate();
  if (i++ < 60)
    requestAnimationFrame(tick);
}

tick();
