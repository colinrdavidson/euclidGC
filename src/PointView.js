import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;

exports = Class(ImageView, function (supr) {
  this.init = function (opts) {

    var point = opts.point;
    var radius = opts.radius;
    var color = opts.color;
    var image = opts.image;

    if (!image) {
      image = "resources/images/circle-black.png";
    }

    if (!color) {
      color = "#000";
    }

    if (!radius) {
      radius = 5;
    }



    //focus isn't a view here, this needs to be standardized
    var newOpts = {
      x: point.x - radius,
      y: point.y - radius,
      width: 2 * radius,
      height: 2 * radius,
      image: image
    };

    opts = merge(opts, newOpts);

    supr(this, "init", [opts]);

    var genOpts = {
      superview: this,
      color: color,
      radius: radius,
      fill: true
    };


    this.on("InputSelect", function (event, point) {
      var image = new Image({url: "resources/images/circle-blue.png"});
      this.setImage(image);
      event.cancel();
    });
  }
});
