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

    this._currentSelected1;
    this._currentSelected2;

    var point1 = new Point(1, 100, 100);
    var point2 = new Point(1, 100, 200);
    var line = new Line(1, point1, point2);
    var circle = new Circle(1, point1, point2);

    var stateObjects = {
      points: [point1, point2],
      lines: [line],
      circles: [circle]
    };

    var state = new State(stateObjects);
    
    var things = state.allObjects();
   
    for (var i = 0; i < things.length; i++) {
      if (things[i] instanceof Point) {
        var point = things[i];
        var pointView = new PointView({
          point: point,
          superview: this
        });

        pointView.on('PointView:select', function () { pointSelect(point); });
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

  var pointSelect = function (point) {
    console.log(point.toString());
  };
});
