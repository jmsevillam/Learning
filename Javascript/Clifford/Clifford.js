/*For more on the Clifford Atrractor and the chaos theory:
http://en.wikipedia.org/wiki/Clifford_A._Pickover &&
http://en.wikipedia.org/wiki/Chaos_theory
*/

//starting x,y && function a,b,c,d values
var x = 0.0;
var y = 0.0;
var a = 1.4;
var b = -1.7;
var c = 1.5;
var d = 0.9;
var reset = false;

function animate(){
  var canv = document.getElementById("canv");
  var $ = canv.getContext("2d");
//assign inputs to variables on reset (new drawing)
  if(reset){
    a = document.getElementById('inputa').value;
    b = document.getElementById('inputb').value;
    c = document.getElementById('inputc').value;
    d = document.getElementById('inputd').value;
    x = y = 0.0;
    //canvas fill style
    $.fillStyle = "rgb(255,255,255)";
    $.fillRect (0, 0, 600, 600);

    reset = false;
  }
  //fill drawing with random / rainbow colors
  $.fillStyle = "rgb(0,0,0)";//rndColor();
  //draw 100 times over these x,y positions
  for(var i = 0; i < 100; i++){
    $.fillRect (300+x*100, 300+y*100, 1, 1);
//Attractor Algorithm (a,b,c,d)
    var tmpX = Math.sin(a*y) + c*Math.cos(a*x);
    var tmpY = Math.sin(b*x) + d*Math.cos(b*y);
    //assign x,y to a,b,c,d function values
    x = tmpX;
    y = tmpY;
  }
  //draw
  setTimeout("animate();",10);
}
//reset canvas if set button is clicked
function set(){
  reset = true;
}
//random color function
/*
function rndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
*/
