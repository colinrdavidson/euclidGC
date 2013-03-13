import ui.View as View;
import ui.ImageView as ImageView;

exports = Class(View, function (supr) {
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
      x: 58,
      y: 313,
      width: 200,
      height: 100
    });
  
    startButton.on('InputSelect', bind(this, function () {
      this.emit('titlescreen:start');
    }));
  };
});
