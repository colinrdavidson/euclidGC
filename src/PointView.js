import ui.View as View;
//user
import src.circlegenerator as circlegenerator;

exports = Class(View, function (supr) {
  this.init = function (opts) {

    var focus = opts.focus;
    var radius = opts.radius;
    var color = opts.color;

    if (!color) {
      color = "#000";
    }

    if (!radius) {
      radius = 5;
    }

    //focus isn't a view here, this needs to be standardized
    var newOpts = {
      x: focus.x - radius,
      y: focus.y - radius,
      width: 2 * radius,
      height: 2 * radius 
    };

    opts = merge(opts, newOpts);

    supr(this, "init", [opts]);

    var genOpts = {
      superview: this,
      color: color,
      radius: radius,
      fill: true
    };

    circlegenerator.generateCircle(genOpts);
  }
});
