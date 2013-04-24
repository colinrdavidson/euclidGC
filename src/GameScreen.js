import device;
import ui.View as View;
import ui.widget.ButtonView as ButtonView;
//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.view.PointView as PointView;
import src.view.PotentialPointView as PotentialPointView;
import src.view.LineView as LineView;
import src.view.CircleView as CircleView;
import src.view.GoalPointView as GoalPointView;
import src.view.GoalLineView as GoalLineView;
import src.view.GoalCircleView as GoalCircleView;
import src.controller.GameController as GameController;
import src.ModelViewHash as Hash;

exports = Class(View, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    var lineButton = new ButtonView({
      superview: this,
      id: "LineButton",
      width: device.width / 3,
      height: 60,
      x: 0,
      y: device.height - 60,
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
      title: "Line",
      text: {
        color: "#004",
        size: 16,
        autoFontSize: false,
        autoSize: false
      }
    });

    var circleButton = new ButtonView({
      superview: this,
      id: "CircleButton",
      width: device.width / 3,
      height: 60,
      x: device.width / 3,
      y: device.height - 60,
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
      title: "Circle",
      text: {
        color: "#004",
        size: 16,
        autoFontSize: false,
        autoSize: false
      }
    });

    //this function should be defined elsewhere but this'll do for now
    lineButton.on('InputSelect', function (event) {
      this.emit("LineButton:click");
      event.cancel();
    });
    //attach all of the handlers, i'd perfer to do this elsewhere (like in the
    //game controller) but at this point View ID's aren't working
    
    lineButton.on("LineButton:click", function () { 
      game.setCurrentFunction(game.createLine);
    });

    circleButton.on('InputSelect', function (event) {
      this.emit("CircleButton:click");
      event.cancel();
    });

    circleButton.on("CircleButton:click", function () {
      game.setCurrentFunction(game.createCircle);
    });
  }
});
