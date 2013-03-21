import device
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
import src.controller.GameController as GameController;
import src.Hash as Hash;
exports = Class(View, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    this._selectedShapes = [];

    var lineButton = new ButtonView({
      superview: this,
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
    lineButton.on('InputSelect', bind(this, function () {
      if (this._selectedShapes.length === 2) {
        console.log("Current1: " + this._selectedShapes[0]);
        console.log("Current2: " + this._selectedShapes[1]);

        var newLine = new Line(1, this._selectedShapes[0], this._selectedShapes[1]);
        
        game.add(newLine);
      }
    }));
    circleButton.on('InputSelect', bind(this, function () {
      if (this._selectedShapes.length === 2) {
        console.log("Current1: " + this._selectedShapes[0]);
        console.log("Current2: " + this._selectedShapes[1]);

        var newCircle  = new Circle(1, this._selectedShapes[0], this._selectedShapes[1]);
        
        game.add(newCircle);
      }
    }));
  };


  //Draw may not be the best name. This will be called from the Game
  //controller.
  this.draw = function (object) {
    if (Object.prototype.toString.call(object) === '[object Array]'){
      for (var i = 0; i < object.length; i++){
        this.draw(object[i]);
      }
    }
    else {
      switch (object.type) {
        case "State":
          this.draw(object.pointsLinesCircles());
          break;
           
        case "Point":
          if (object.potential) {
            var potentialPointView = new PotentialPointView({
              point: object,
              superview: this
            });
            potentialPointView.on('PotentialPointView:select', bind(this, this.potentialPointSelect));
          }
          else {
            var pointView = new PointView({
              point: object,
              superview: this
            });
            pointView.on('PointView:select', bind(this, this.pointSelect));
          }
          break;

        case "Line":
          var lineView = new LineView({
            line: object,
            superview: this
          });
          lineView.on('LineView:select', bind(this, this.lineSelect));
          break;

        case "Circle":
          var circleView = new CircleView({
            circle: object,
            superview: this
          });
          circleView.on('CircleView:select', bind(this, this.circleSelect));
          break;
      }
    }
  };

  this.pointSelect = function (pointView) {
    var point = pointView._point;

    this.selectShape(point);
  };

  this.potentialPointSelect = function (potentialPointView) {
    var point = potentialPointView._point;

    game.promotePotentialPoint(point);
    potentialPointView.removeFromSuperview();

    this.selectShape(point);
  };

  this.selectShape = function (shape) {
    if (this._selectedShapes.length >= 2) {
     this._selectedShapes.shift();
    }

    this._selectedShapes.push(shape);
  };
});
