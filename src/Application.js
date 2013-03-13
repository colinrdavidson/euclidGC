/* @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

import ui.View as View;
import ui.ImageView as ImageView;
//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.view.CircleView as CircleView;
import src.view.LineView as LineView;
import src.view.PointView as PointView;

exports = Class(GC.Application, function () {
	this.initUI = function () {
    this.style.backgroundColor = "#FFFFFF";

    var point1 = new Point(1, 100, 100);
    var point2 = new Point(1, 200, 100);

    var line = new Line(1,point1, point2);
    var circle = new Circle(1, point1, point2);

    var stateObjects = {
      points: [point1, point2],
      lines: [line],
      circles: [circle]
    };

    var state = new State(stateObjects);

    var shapes = state.allObjects();

    for (var i = 0; i < shapes.length; i++) {
      if (shapes[i] instanceof Point) {
        new PointView({
          point: shapes[i],
          superview: this.view
        });
      }
      else if (shapes[i] instanceof Line) {
        new LineView({
         line: shapes[i],
         superview: this.view
        });

      }
      else if (shapes[i] instanceof Circle) {
        new CircleView({
          circle: shapes[i],
          superview: this.view
        });

      }
    }

    this.on("InputSelect", function (event, point) {
      var newPoint = new Point(1, point.x, point.y);

      state.add(newPoint);

      new PointView({
        point: newPoint,
        superview: this.view
      });
      
    });
 };
 
 this.launchUI = function () {};
});
