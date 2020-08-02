const MAX_ITER = 1000;
var width = window.innerWidth;
var height = window.innerHeight;

var zoomx = 1;
var zoomy = 1;

var zoom = 1;

var ratio = width / height;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;

var div = document.getElementById('div'), x1 = 0, y1 = 0, x2 = width, y2 = height;

function draw(){

  var imagedata = ctx.createImageData(width, height);

  //recorro todo el canvas
  for(var x = 0 ; x < width ; x++){
    for(var y = 0 ; y < height ; y++){

      var xi = (x - x1) / width;
      var yi = (y - y1) / height;

      var xf = (x2 - xi) / width;
      var yf = (y2 - xf) / height;

      var mandelbrot_point = calculateSet(xi, yi, xf, yf, ratio, zoom);

      var bright = mandelbrot_point % 255;
      if (mandelbrot_point === MAX_ITER){
          bright = 0;
      }

      var pix = (x + y * width) * 4;

      imagedata.data[pix] = bright;
      imagedata.data[pix+1] = bright;
      imagedata.data[pix+2] = bright;
      imagedata.data[pix+3] = 255;
    }
  }

  ctx.putImageData(imagedata, 0, 0);
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

    zoomx = ((x2 - x1) / width) * zoom;
    zoomy = ((y2 - y1) / height) * zoom;

    zoom = Math.min(zoomx, zoomy);

    draw();
};
