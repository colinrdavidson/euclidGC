import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;

exports = Class(ImageView, function (supr) {
  this.init = function (opts) {

    var point = opts.point;
    var radius = opts.radius;
    var image = opts.image;

    this._point = point;

    this._defaultImage = "resources/images/circle-black.png";

    if (!image) {
      image = this._defaultImage;
    }

    if (!radius) {
      radius = 5;
    }

    var newOpts = {
      x: point.x - radius,
      y: point.y - radius,
      width: 2 * radius,
      height: 2 * radius,
      image: image
    };

    opts = merge(opts, newOpts);

    supr(this, "init", [opts]);

    this.on("InputSelect", bind(this, function (event) {
      this.emit('PointView:click', this);
      event.cancel();
    }));
  };

  this.select = function () {
    var image = new Image({url: "resources/images/circle-blue.png"});
    this.setImage(image);
  };

  this.unselect = function () {
    var image = new Image({url: this._defaultImage});
    this.setImage(image);
  };
});
