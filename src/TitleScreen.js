import ui.View as View;
import ui.ImageView as ImageView;

exports = Class(ImageView, function (supr) {
  this.init = function (opts) {
    newOpts = {
      x: 0,
      y: 0,
      image: "resources/images/euclidimage.png"
    };

    opts = merge(opts, newOpts);

    supr(this, 'init', [opts]);

    var startButton = new View({
      superview: this,
      x: 0,
      y: 0,
      width: 260,
      height: 308
    });
  
    startButton.on('InputSelect', bind(this, function () {
      this.emit('titlescreen:start');
    }));
  };
});
