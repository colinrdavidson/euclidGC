import ui.View as View;
//user
import src.circlegenerator as circlegenerator;

exports = Class(View, function (supr) {
  this.init = function (opts, focus, radius, color) {
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
