var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 20;
var color = "#e6ccff";
var g = 0.1; // acceleration due to gravity
var x = 50;  // initial horizontal position
var y = 50;  // initial vertical position
var vx = 2;  // initial horizontal speed
var vy = 0;  // initial vertical speed

window.onload = init;

function init() {
  setInterval(onEachStep, 1000/60); // 60 fps
};

function onEachStep() {
  vy += g; // gravity increases the vertical speed
  x += vx; // horizontal speed increases horizontal position
  y += vy; // vertical speed increases vertical position

  if (y > canvas.height - radius){ // if ball hits the ground
    y = canvas.height - radius; // reposition it at the ground
    vy *= -1; // then reverse and reduce its vertical speed
  }
  if (y < radius){ // if ball hits the ground
    y =  radius; // reposition it at the ground
    vy *= -1; // then reverse and reduce its vertical speed
  }
  if (x > canvas.width - radius){ // if ball hits the ground
    x = canvas.width - radius; // reposition it at the ground
    vx *= -1; // then reverse and reduce its vertical speed
  }
  if (x <  radius){ // if ball hits the ground
    x =  radius; // reposition it at the ground
    vx *= -1; // then reverse and reduce its vertical speed
  }

  if (x > canvas.width + radius){ // if ball goes beyond canvas
    x = -radius; // wrap it around
  }
  drawBall(); // draw the ball
};

function drawBall() {
    with (context){
        clearRect(0, 0, canvas.width, canvas.height);
        fillStyle = color;
        beginPath();
        arc(x, y, radius, 0, 2*Math.PI, true);
        closePath();
        fill();
    };
};
