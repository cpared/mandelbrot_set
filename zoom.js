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

  var step = 1 / (width / x2);

  //recorro todo el canvas
  for(var x = 0 ; x < width ; x++){
    for(var y = 0 ; y < height ; y++){

      //relacion los puntos del canvas con el punto a calcular
      //var xi = (x - x1) / width;
      //var yi = (y - y1) / height;

      var xi = x * step;
      var yi = y * step;

      var mandelbrot_point = calculateSet(xi, yi, x2, y2, ratio, zoom);

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

setInterval(draw,100);

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

onmouseup = function(e) {
    div.hidden = 1;

    //Tomo la posicion del puntero cuando clickea
    x1 = e.clientX;
    y1 = e.clientY;

    zoom *= 0.5;

    draw();
};
