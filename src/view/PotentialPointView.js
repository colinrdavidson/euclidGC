import ui.ImageView as ImageView;
import src.view.PointView as PointView;

exports = Class(PointView, function (supr) {
  this.init = function (opts) {
    supr(this, 'init', [opts]);

//    this doesn't work so we should use just a transparent image or something?
//    for now I'm going to use just a blue one 
//    this.style.visible = false;

      

    this.on("InputOver", function (event) {
      this.style.visible = true;
    });
  };
});
