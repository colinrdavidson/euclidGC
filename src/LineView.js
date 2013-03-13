import ui.View as View;

exports = Class(View, function (supr) {
  this.init = function (opts) {

    var pt1 = opts.pt1;
    var pt2 = opts.pt2;
    var color = opts.color;

    if (!color) {
      var color = "#000";
    }

    var x1 = pt1.style.x;
    var y1 = pt1.style.y;
    var x2 = pt2.style.x;
    var y2 = pt2.style.y;

    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);

    var tox = x1 + (dx - length) / 2;
    var toy = y1 + dy / 2 ;
    var r = dx ? Math.atan(dy / dx): -Math.PI / 2;

    var genOpts = {
      x: tox,
      y: toy,
      r: r,
      anchorX: length / 2,
      anchorY: 2,
      width: length,
      height: 1,
      backgroundColor: color
    };

    opts = merge (opts, genOpts);

    supr(this, "init", [opts]);
  }
});
