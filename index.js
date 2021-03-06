const MAX_ITER = 100;
var width = window.innerWidth;
var height = window.innerHeight;

var zoomx = 1;
var zoomy = 1;
var zoom = 1;

var ratio = width / height;

var div = document.getElementById('div');
var x1 = 0;
var y1 = 0;
var x2 = width;
var y2 = height;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;


function draw(){
  
  var stepx = 1 / (width / x2);
  var stepy = 1 / (height / y2);

  //recorro todo el canvas
  for(var x = 0 ; x < width ; x++){
    for(var y = 0 ; y < height ; y++){

      //relacion los puntos del canvas con el punto a calcular
      var xi = ((x - x1) / width) * stepx;
      var yi = ((y - y1) / height) * stepy;

      var xf = ((x2 - xi) / width) * stepx;
      var yf = ((y2 - xf) / height) * stepy;

      var mandelbrot_point = calculateSet(xi, yi, xf, yf, ratio, zoom);

      // asigno colores en base al resultado
      var bright = mandelbrot_point % 255;
      if (mandelbrot_point === MAX_ITER){
          bright = 0;
      }

      if(mandelbrot_point == MAX_ITER) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y, 1,1); // Draw a black pixel
      } else {
          ctx.fillStyle = 'hsl(0, 100%, ' + mandelbrot_point + '%)';
          ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
      }
    }
  }
}


// Mandelbrot set we need to get de imaginary part of C and the real part.
// As we know, if |Zn| > 2 then the set converge, so we need to iterate between -2 and 2
function calculateSet(x0,y0,x,y, ratio, zoom){

  var a = (-2 + (x0 / x) * (1 + 2)) * zoom * ratio;
  var b = (-1 + (y0 / y) * (1 + 1)) * zoom * ratio;

  var ca = a;
  var cb = b;

  var i = 0;

  for (i ; i < MAX_ITER ; i++){
      var an = a * a - b * b;
      var bn = 2 * a * b;

      a = an + ca;
      b = bn + cb;

      if ( Math.pow(a,2) + Math.pow(b,2) > 4 ){
          break;
      }
  }

  return i;
}

function reCalc() {
    var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';

}
onmousedown = function(e) {
    div.hidden = 0;
    x1 = e.clientX;
    y1 = e.clientY;
    reCalc();
};
onmousemove = function(e) {
    x2 = e.clientX;
    y2 = e.clientY;
    reCalc();
};
onmouseup = function(e) {
    div.hidden = 1;

    //recalculo el ratio
    ratio = Math.min(width / x2, height / y2);

    //recalculo zoom
    zoomx = ((x2 - x1) / width) * zoom;
    zoomy = ((y2 - y1) / height) * zoom;

    zoom = Math.max(zoomx, zoomy);

    draw();
};
