import ui.View as View;
//user
import src.circlegenerator as circlegenerator;

exports = Class(View, function (supr) {
  this.init = function (opts, focus, locus, color) {
    supr(this, "init", [opts]);
   
    var dx = focus.style.x - locus.style.x;
    var dy = focus.style.y - locus.style.y;

    var radius = Math.sqrt(dx * dx + dy * dy);

    if (!color) {
      color = "#000";
    }

    var opts = {
      superview: this,
      color: color,
      radius: radius
    };

    circlegenerator.generateCircle(opts);
  }
});
