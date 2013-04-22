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

      game.loadLevel('intro2');
    });
  };
 
 this.launchUI = function () {};
});
