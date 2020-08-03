var myCanvas = document.createElement("canvas");
myCanvas.width=600;
myCanvas.height=600;
document.body.appendChild(myCanvas);
var ctx = myCanvas.getContext("2d");


function checkIfBelongsToMandelbrotSet(x, y) {
  var realComponentOfResult = x;
  var imaginaryComponentOfResult = y;
  var maxIterations = 100;
  for(var i = 0; i < maxIterations; i++) {
       var tempRealComponent = realComponentOfResult * realComponentOfResult
                               - imaginaryComponentOfResult * imaginaryComponentOfResult
                               + x;
       var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                               + y;
       realComponentOfResult = tempRealComponent;
       imaginaryComponentOfResult = tempImaginaryComponent;

       // Return a number as a percentage
       if(realComponentOfResult * imaginaryComponentOfResult > 5)
          return (i/maxIterations * 100);
  }
  return 0;   // Return zero if in set
}

var magnificationFactor = 200;
var panX = 2;
var panY = 1.5;
for(var x=0; x < myCanvas.width; x++) {
   for(var y=0; y < myCanvas.height; y++) {
       var belongsToSet =
            checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX,
                                          y/magnificationFactor - panY);
        if(belongsToSet == 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x,y, 1,1); // Draw a black pixel
        } else {
            ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
            ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
        }
   }
}