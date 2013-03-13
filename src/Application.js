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

import device;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.StackView as StackView;
//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.view.CircleView as CircleView;
import src.view.LineView as LineView;
import src.view.PointView as PointView;
import src.GameScreen as GameScreen;
import src.TitleScreen as TitleScreen;

exports = Class(GC.Application, function () {
	this.initUI = function () {
    var titlescreen = new TitleScreen();
    var gamescreen = new GameScreen();

    this.view.style.backgroundColor = "#FFF";

    var rootView = new StackView({
      superview: this,
      x: device.width / 2 - 160,
      y: device.height / 2 - 240,
      width: 320,
      height: 480,
      clip: true,
    });

    rootView.push(new View({superview: this.view, backgroundColor: "#F00", width: 100, height: 100}));
    rootView.push(titlescreen);
  };
 
 this.launchUI = function () {};
});
