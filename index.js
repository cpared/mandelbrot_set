const MAX_ITER = 350;
var width = window.innerWidth;
var height = window.innerHeight;

var zoom = 1;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ctx.canvas.width = width;
//ctx.canvas.height = height;

var div = document.getElementById('div'), x1 = 0, y1 = 0, x2 = width, y2 = height;

// Mandelbrot set we need to get de imaginary part of C and the real part.
// As we know, if |Zn| > 2 then the set converge, so we need to iterate between -2 and 2
function draw(){

    ctx.canvas.width = x2;
    ctx.canvas.height = y2;

    var imagedata = ctx.createImageData(width, height);

    for (var x = x1; x < x2; x++){
        for (var y = y1; y < y2; y++){

            // Esto es magia
            var a = (-2 + (x / width) * (1 + 2)) * zoom;
            var b = (-1 + (y / height) * (1 + 1)) * zoom;

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

            var bright = i % 255;
            if (i === MAX_ITER){
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

    zoom = 

    console.log(div.style.width);
    console.log(div.style.height);

    draw();
};