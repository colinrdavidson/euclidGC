import ui.View as View;

exports = Class(View, function (supr) {
  this.init = function (opts, pt1, pt2, color) {
    supr(this, "init", [opts]);

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

    this.style.x = tox;
    this.style.y = toy;
    this.style.r = r;
    this.style.anchorX = length / 2;
    this.style.anchorY = 2;
    this.style.width = length;
    this.style.height = 1;
    this.style.backgroundColor = color;
  }
});
