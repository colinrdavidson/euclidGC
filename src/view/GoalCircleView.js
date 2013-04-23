import src.view.CircleView as CircleView;

exports = Class(CircleView, function (supr) {
  this.init = function (opts) {
    var newOpts = {
      color: "#0FF"
    };

    opts = merge(opts, newOpts);

    supr(this, "init", [opts]);

    
    this.on("InputSelect", function (event) {
      event.cancel();
    });
  };
});
