import device;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.widget.ButtonView as ButtonView;

exports = Class(ImageView, function (supr) {
  this.init = function (opts) {
    newOpts = {
      x: 0,
      y: 0,
      image: "resources/images/euclidimage.png"
    };

    opts = merge(opts, newOpts);

    supr(this, 'init', [opts]);

    var startButton = new ButtonView({
      superview: this,
      width: 300,
      height: 60,
      x: device.width / 2 - 100,
      y: 300,
      images: {
        up: "resources/images/blue1.png",
        down: "resources/images/blue2.png",
      },
      scaleMethod: "9slice",
      sourceSlices: {
        horizontal: {left: 80, center: 116, right: 80},
        vertical: {top: 10, middle: 80, bottom: 10}
      },
      destSlices: {
        horizontal: {left: 40, right: 40},
        vertical: {top: 4, bottom: 4}
      },
      title: "Rusty Bucket?",
      text: {
        color: "#000044",
        size: 16,
        autoFontSize: false,
        autoSize: false
      }
    });
  
    startButton.on('InputSelect', bind(this, function () {
      this.emit('titlescreen:start');
    }));
  };
});
