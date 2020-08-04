
const MAX_ITER = 100;
var width = window.innerWidth;
var height = window.innerHeight;

var ratio = 1;

let REAL_SET = { start: -2, end: 1 };
let IMAGINARY_SET = { start: -1, end: 1 };
let ZOOM_FACTOR = 0.1;

var div = document.getElementById('div');
var x1 = 0;
var y1 = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;


// Main function.
// We call draw every time we doble click event
function draw(){

  //recorro todo el canvas
  for(var x = 0 ; x < width ; x++){
    for(var y = 0 ; y < height ; y++){

      var xi = x1 - (x1 - x) * ratio;
      var yi = y1 - (y1 - y) * ratio;

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

  var a =  REAL_SET.start + (x0 / width) * (REAL_SET.end - REAL_SET.start);
  var b = IMAGINARY_SET.start + (y0 / height) * (IMAGINARY_SET.end - IMAGINARY_SET.start);

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

const getRelativePoint = (pixel, length, set) =>
   set.start + (pixel / length) * (set.end - set.start)

// Doble click event
canvas.addEventListener('click', e => {
    var time = new Timer();
    time.run();

    const zfw = (width * ZOOM_FACTOR)
    const zfh = (height * ZOOM_FACTOR)

    REAL_SET = {
        start: getRelativePoint(e.pageX - canvas.offsetLeft - zfw, width, REAL_SET),
        end: getRelativePoint(e.pageX - canvas.offsetLeft + zfw, width, REAL_SET)
    }
    IMAGINARY_SET = {
        start: getRelativePoint(e.pageY - canvas.offsetTop - zfh, height, IMAGINARY_SET),
        end: getRelativePoint(e.pageY - canvas.offsetTop + zfh, height, IMAGINARY_SET)
    }

    draw()

    time.stop()
})
