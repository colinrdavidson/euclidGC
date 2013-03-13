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
import src.Point as Point;
import src.Line as Line;
import src.Circle as Circle;
import src.CircleView as CircleView;
import src.LineView as LineView;
import src.PointView as PointView;

exports = Class(GC.Application, function () {
	this.initUI = function () {
    this.style.backgroundColor = "#FFFFFF";

    this.on("InputSelect", function (event, point) {
      new PointView({
        focus: point,
        superview: this.view
      });
    });
	};
	
	this.launchUI = function () {};
});
