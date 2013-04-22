import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import src.view.PointView as PointView;

exports = Class(PointView, function (supr) {
  this.init = function (opts) {

    var newOpts = { image: "resources/images/circle-blank.png" };

    opts = merge(newOpts, opts);

    supr(this, 'init', [opts]);

    this.on("InputOver", bind(this, function (over, overCount, atTarget) {
      var image = new Image({url: "resources/images/circle-red.png"});
      this.setImage(image);
    }));

    this.on("InputOut", bind(this, function (over, overCount, atTarget) {
      var image = new Image({url: "resources/images/circle-blank.png"});
      this.setImage(image);
    }));

    this.on("InputSelect", bind(this, function (event) {
      this.emit('PotentialPointView:click', this);
      event.cancel();
    }));
  };
});
