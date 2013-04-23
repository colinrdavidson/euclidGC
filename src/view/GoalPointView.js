import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import src.view.PointView as PointView;

exports = Class(PointView, function (supr) {
  this.init = function (opts) {

    var newOpts = { image: "resources/images/circle-cyan.png" };
    
    opts = merge(newOpts, opts);
    
    supr(this, 'init', [opts]);

    this.on("InputSelect", function (event) {
      event.cancel();
    });

  };
});
