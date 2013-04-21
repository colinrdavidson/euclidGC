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
import src.controller.GameController as GameController;
import src.GameScreen as GameScreen;
import src.TitleScreen as TitleScreen;
import src.levels.Levels as Levels;

exports = Class(GC.Application, function () {
  this.initUI = function () {
    var titlescreen = new TitleScreen();
    var gamescreen = new GameScreen();

    GLOBAL.game = new GameController(gamescreen); 

    this.view.style.backgroundColor = "#FFF";

    var rootView = new StackView({
      superview: this,
      x: 0, 
      y: 0,
      width: device.width,
      height: device.height,
      clip: true,
    });

    rootView.push(titlescreen);

    titlescreen.on("titlescreen:start", function () {
      rootView.push(gamescreen);

      /*
      var point1 = new Point(1, 150, 150);
      var point2 = new Point(1, 100, 250);
      var point3 = new Point(1, 400, 250);
      var point4 = new Point(1, 10, 150);
      var line1 = new Line(1, point1, point2);
      var line2 = new Line(1, point3, point4);
      var circle1 = new Circle(1, point1, point2);

      game.add([point1, point2, point3, point4]);
      game.add([line1, line2]);
      game.add([circle1]);
      */

      game.loadLevel('intro0');
    });
  };
 
 this.launchUI = function () {};
});
