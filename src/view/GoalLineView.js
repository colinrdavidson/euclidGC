import src.view.LineView as LineView;

exports = Class(LineView, function (supr) {
  this.init = function (opts) {
    var newOpts = { color: "#0FF" };

    opts = merge(newOpts, opts);

    supr(this, 'init', [opts]);


    this.on("InputSelect", function (event) {
      event.cancel();
    });
  };
});
