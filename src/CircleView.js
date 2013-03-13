import ui.View as View;
//user
import src.circlegenerator as circlegenerator;

exports = Class(View, function (supr) {
  this.init = function (opts) {

    var focus = opts.focus;
    var locus = opts.locus;
    var color = opts.color;

    var dx = focus.style.x - locus.style.x;
    var dy = focus.style.y - locus.style.y;
    var radius = Math.sqrt(dx * dx + dy * dy);
    
    var newOpts = {
      x: focus.style.x - radius,
      y: focus.style.y - radius,
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
