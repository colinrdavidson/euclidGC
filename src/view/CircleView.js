import ui.View as View;
//user
import src.view.circlegenerator as circlegenerator;

exports = Class(View, function (supr) {
  this.init = function (opts) {

    var focus = opts.circle.foc;
    var locus = opts.circle.loc;
    var color = opts.color;

    var dx = focus.x - locus.x;
    var dy = focus.y - locus.y;
    var radius = Math.sqrt(dx * dx + dy * dy);
    
    var newOpts = {
      x: focus.x - radius,
      y: focus.y - radius,
      width: 2 * radius,
      height: 2 * radius
    };

    opts = merge(opts, newOpts);

    supr(this, "init", [opts]);

    if (!color) {
      color = "#000";
    }

    var genOpts = {
      superview: this,
      color: color,
      radius: radius
    };

    circlegenerator.generateCircle(genOpts);
  }
});
