import ui.View as View;

//opts { fill, colour, radius, superview, thickness }
exports.generateCircle = function (opts) {
  opts.fill ? fillCircle(opts) : strokeCircle(opts);  
};

var fillCircle = function (opts) {
  var x;
  var y;
  
  var superview = opts.superview;
  var radius = opts.radius;
  var color = opts.color;


  for (y = -radius; y <= radius; y++) {
    for (x = -radius; x <= radius; x++) {
      if ((x *x) + (y * y) <= (radius * radius)) {
        new View({
          superview: superview,
          x: x,
          y: y,
          offsetX: radius,
          offsetY: radius,
          width: 1,
          height: 1,
          backgroundColor: color
        });
      }
    }
  }
};

var strokeCircle = function (opts) {

  var x;
  var y;

  var superview = opts.superview;
  var radius = opts.radius;
  var color = opts.color;

  var l = radius * Math.cos(Math.PI / 4);

  for(x = 0; x <= l; x++) {
    y = Math.sqrt(radius * radius - x * x);


    new View({
      superview: superview,
      x: x,
      y: y,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: x,
      y: -y,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: -x,
      y: y,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: -x,
      y: -y,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: y,
      y: x,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: y,
      y: -x,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: -y,
      y: x,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
    new View({
      superview: superview,
      x: -y,
      y: -x,
      offsetX: radius,
      offsetY: radius,
      width: 2,
      height: 2,
      backgroundColor: color
    });
  }
};
