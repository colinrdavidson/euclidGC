import ui.View as View;
//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.view.PointView as PointView;
import src.view.LineView as LineView;
import src.view.CircleView as CircleView;
import src.controller.GameController as GameController;

exports = Class(View, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    this._selectedShapes = [];
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
          var pointView = new PointView({
            point: object,
            superview: this
          });
          pointView.on('PointView:select', bind(this, this.pointSelect));
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

    if (this._selectedShapes.length >= 2) {
     this._selectedShapes.shift();
    }

    this._selectedShapes.push(point);

    if (this._selectedShapes.length === 2) {
      console.log("Current1: " + this._selectedShapes[0]);
      console.log("Current2: " + this._selectedShapes[1]);

      var newLine = new Line(1, this._selectedShapes[0], this._selectedShapes[1]);

      new LineView({
        line: newLine,
        superview: this
      });
    }
  };
});
