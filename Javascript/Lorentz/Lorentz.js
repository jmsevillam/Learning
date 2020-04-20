// by @liabru - http://brm.io

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    c = 28,
    h = 0.015,
    t = -6,
    x0 = 0,
    y0 = 1,
    z0 = 10,
    x1,
    y1,
    z1,
    cx = 250,
    cy = 330,
    scale = 15,
    n = 20000,
    i = 0;

var interval = setInterval(function() {
  if (i < n) {
    for (var k = 0; k < 20; k += 1) {
      x1 = x0 + h * t * (x0 - y0);
      y1 = y0 + h * (-x0 * z0 + c * x0 - y0);
      z1 = z0 + h * (x0 * y0 - z0);

      context.strokeStyle = "hsl(" + Math.abs(x1)*10 + "," + Math.abs(y1)*10 + "%," + Math.abs(z1)*2 + "%)";

      context.beginPath();
      context.moveTo(cx + x0 * scale, cy + y0 * scale);
      context.lineTo(cx + x1 * scale, cy + y1 * scale);
      context.stroke();

      x0 = x1;
      y0 = y1;
      z0 = z1;

      i += 1;
    }
  } else {
    clearInterval(interval);
  }
}, 1);
