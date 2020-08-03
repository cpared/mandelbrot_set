const MAX_ITER = 50;
var width = window.innerWidth;
var height = window.innerHeight;

var ratio = 1;

var zoom = 2;

var div = document.getElementById('div');
var x1 = 0;
var y1 = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;

var scale = Math.min(canvas.width / 600, canvas.height / 600);


function draw(){

  //recorro todo el canvas
  for(var x = 0 ; x < width ; x++){
    for(var y = 0 ; y < height ; y++){

      //relacion los puntos del canvas con el punto a calcular

      // var xi = (x - x1) * zoom;
      // var yi = (y - y1) * zoom;

      //var xi = (x - x1) * ratio + x1; //funciona
      //var yi = (y - y1) * ratio + y1; //funciona

      var xi = x1 - (x1 - x) * ratio;
      var yi = y1 - (y1 - y) * ratio;

      //var xi = x * scale - x1;
      //var yi = y * scale - y1;

      var mandelbrot_point = calculateSet(xi, yi, width, height);

      if(mandelbrot_point == MAX_ITER) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y, 1, 1); // Draw a black pixel
      } else {
          ctx.fillStyle = 'hsl(0, 100%, ' + mandelbrot_point + '%)';
          ctx.fillRect(x,y, 1, 1); // Draw a colorful pixel
      }

    }
  }

}

// Mandelbrot set we need to get de imaginary part of C and the real part.
// As we know, if |Zn| > 2 then the set converge, so we need to iterate between -2 and 2
function calculateSet(x0,y0,x,y){

  var a = (-2 + (x0 / x) * (1 + 2));
  var b = (-1 + (y0 / y) * (1 + 1));

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


    //x2 = x2 / 2;
    //y2 = y2 / 2;

    ratio /= 2;

    draw();
};