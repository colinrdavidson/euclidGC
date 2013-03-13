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
import src.circlegenerator as circles;
import src.CircleView as CircleView;
import src.LineView as LineView;

exports = Class(GC.Application, function () {

  var currentPoint1;
  var currentPoint2;

	this.initUI = function () {
    this.style.backgroundColor = "#FFFFFF";

    this.on("InputSelect", function (event, point) {
      console.log("Point: " + point.x + "," + point.y);
      
      var children = this.getSubviews();  

     add = true;
     for (var i = 0; i < children.length; i++) {
      if (children[i].style.x <= point.x + 5 && children[i].style.x >= point.x - 5
        && children[i].style.y <= point.y + 5 && children[i].style.y >= point.y - 5) {

        if (!currentPoint1) {
          currentPoint1 = children[i];
        }
        else {
          currentPoint2 = currentPoint1;
          currentPoint1 = children[i];

          console.log("CurrentPoints! Point1: " + currentPoint1.style.x + "," + currentPoint1.style.y + " Point2: " + currentPoint2.style.x + "," + currentPoint2.style.y);
            
          var x1 = currentPoint1.style.x;
          var y1 = currentPoint1.style.y;
          var x2 = currentPoint2.style.x;
          var y2 = currentPoint2.style.y;

          var dx = x2 - x1;
          var dy = y2 - y1;

          var length = Math.sqrt(dx * dx + dy * dy);

          var tox = x1 + (dx - length) / 2;
          var toy = y1 + dy / 2 - 2;
          var r = dx ? Math.atan( dy / dx) : -Math.PI / 2;

          new LineView({
            superview: this.view
            }, currentPoint1, currentPoint2);

          var dx = currentPoint1.style.x - currentPoint2.style.x;
          var dy = currentPoint1.style.y - currentPoint2.style.y;

          var radius = Math.sqrt(dx * dx + dy * dy);

          new CircleView({
            superview: this.view,
            x: currentPoint1.style.x - radius,
            y: currentPoint1.style.y - radius,
            width: 2 * radius,
            height: 2 * radius
          }, currentPoint1, currentPoint2);
        add = false;
        break;
        }
      }
     }

     if (add) {
      new ClickBox({
        superview: this.view,
        x: point.x,
        y: point.y,
        offsetX: -5,
        offsetY: -5,
        width: 10,
        height: 10,
        backgroundColor: "#0000FF"
      });
     }


    });
	};
	
	this.launchUI = function () {};
});

var ClickBox = Class(View, function (supr) {
  this.init = function (opts) {
    supr(this, "init", [opts]);
    
    this.on("InputSelect", function (event, point) {
      var backgroundColor = (this.style.backgroundColor === "#FF0000") ? "#0000FF" : "#FF0000";
      this.updateOpts({backgroundColor: backgroundColor});
      console.log("Change color at Point: " + point.x + "," + point.y);
    });
  };
});
