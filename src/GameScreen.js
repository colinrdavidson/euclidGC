import ui.View as View;
//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.view.PointView as PointView;
import src.view.LineView as LineView;
import src.view.CircleView as CircleView;

exports = Class(View, function(supr) {
  this.init = function(opts) {
    supr(this, "init", [opts]);

    this._selectedShapes = [];

    var point1 = new Point(1, 100, 100);
    var point2 = new Point(1, 100, 200);
    var circle = new Circle(1, point1, point2);

    var stateObjects = {
      points: [point2, point1],
      circles: [circle]
    };

    this._state = new State(stateObjects);
    
    var things = this._state.allObjects();
   
    for (var i = 0; i < things.length; i++) {
      if (things[i] instanceof Point) {
        var point = things[i];
        var pointView = new PointView({
          point: point,
          superview: this
        });

        pointView.on('PointView:select', bind(this, this.pointSelect));
      }
      else if (things[i] instanceof Line) {
        new LineView({
          line: things[i],
          superview: this
        });
      }
      else if (things[i] instanceof Circle) {
        new CircleView({
          circle: things[i],
          superview: this
        });
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
