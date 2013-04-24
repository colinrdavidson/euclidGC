//user
import src.util as util;
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.ModelViewHash as Hash;
import src.levels.Levels as Levels;
import src.view.PointView as PointView;
import src.view.PotentialPointView as PotentialPointView;
import src.view.LineView as LineView;
import src.view.CircleView as CircleView;
import src.view.GoalPointView as GoalPointView;
import src.view.GoalLineView as GoalLineView;

exports = Class(function () {

  this.init = function (gameScreen) {
    this.gameScreen = gameScreen;
    this.state = new State();
    this.goalState = new State();
    this.levelName;
    this.history = [];
    this.hash = new Hash();
    this.selectedShapes = [];
    this.defaultCurrentFunction = function () { console.log('default!'); };
    this.currentFunction = this.defaultCurrentFunction;
  }

//Level Handling  
  this.loadLevel = function (levelName) {
    this.levelName = levelName;
    //find levelName in levelArray
    var level = Levels[levelName]; 
  
    this.currentLevel = level;
    
    if (level){
     this.levelInitialize(level);
    }
    else{
      console.log("not a level!");
    }
  }
  
  this.levelInitialize = function (level) {
    // turns this object into a state
    this.state = new State();
    this.goalState = new State();
  
    this.addGoalState(level.goalState);
    this.add(level.state);
  }

  this.complete = function () {
    if (this.goalState.isContainedIn(this.state)){
      return true;
    }
    else{
      return false;
    }
  }

//Handy Getters  
  this.potentialPoints = function () {
    return this.state.potentialPoints();
  }

  this.pointsPotentialPoints = function () {
    return this.points.concat(this.potentialPoints);
  }
  
  this.linesCircles = function () {
    return this.lines.concat(this.circles);
  }

  this.pointsLinesCircles = function () {
    return this.points.concat(this.linesCircles());
  }
  
  this.all = function () {
    return this.pointsPotentialPoints().concat(this.linesCircles());
  }
   
//Add Methods
  this.addGoalState = function (levelState) {
    this.goalState.add(levelState);
    this.drawGoals(this.goalState);
  };

  this.add = function (object) {
    var toDraw = this.state.add(object);
    this.draw(toDraw);
  }

//Add/Remove Methods
this.promotePotentialPoint = function (point) {
	this.removePotentialPoint(point);
	point.potential = false;
	this.add(point);
}

//Remove Methods
this.removePotentialPoint = function (point) {
	this.state.removePotentialPoint(point);
}

//Drawing methods 
  this.draw = function (object) {
    if (Object.prototype.toString.call(object) === '[object Array]'){
      for (var i = 0; i < object.length; i++){
        this.draw(object[i]);
      }
    }

		else if (object.points || object.lines || object.circles || object.potentialPoints){
			for (var i = 0; i < object.points.length; i++){
				this.drawPoint(object.points[i]);
			}
			for (var i = 0; i < object.potentialPoints.length; i++){
				this.drawPotentialPoint(object.potentialPoints[i]);
			}
			for (var i = 0; i < object.lines.length; i++){
				this.drawLine(object.lines[i]);
			}
			for (var i = 0; i < object.circles.length; i++){
				this.drawCircle(object.circles[i]);
			}
    }

		else {
			console.log("Nothing to draw here, or argument isn't an array or obj{pts, ppts, lns, circs}");
		}
  }

	this.drawPoint = function (object) {
            var pointView = new PointView({
              point: object,
              superview: this.gameScreen
            });
            pointView.on('PointView:click', bind(this, this.pointSelect));
            game.hash.add({model: object, view: pointView});
	}
	
	this.drawPotentialPoint = function (object) {
            var potentialPointView = new PotentialPointView({
              point: object,
              superview: this.gameScreen
            });
            potentialPointView.on('PotentialPointView:click', bind(this, this.potentialPointSelect));
            game.hash.add({model: object, view: potentialPointView});
	}

	this.drawLine = function (object) {
          var lineView = new LineView({
            line: object,
            superview: this.gameScreen
          });
          lineView.on('LineView:click', bind(this, this.lineSelect));
          game.hash.add({model: object, view: lineView});
	}

	this.drawCircle = function (object) {
          var circleView = new CircleView({
            circle: object,
            superview: this.gameScreen
          });
          circleView.on('CircleView:click', bind(this, this.circleSelect));
          game.hash.add({model: object, view: circleView});
	}

  this.drawGoals = function (object) {
    if (Object.prototype.toString.call(object) === '[object Array]'){
      for (var i = 0; i < object.length; i++){
        this.drawGoals(object[i]);
      }
    }
    else {
      switch (object.type) {
        case "State":
          this.drawGoals(object.pointsLinesCircles());
          break;
           
        case "Point":
          var pointView = new GoalPointView({
            point: object,
            superview: this.gameScreen
          });
          break;

        case "Line":
          var lineView = new GoalLineView({
            line: object,
            superview: this.gameScreen
          });
          break;

        case "Circle":
          var circleView = new GoalCircleView({
            circle: object,
            superview: this.gamescreen
          });
          break;
      }
    }
  }

  //Create methods
  this.createLine = function () {
    if (this.selectedShapes.length == 2) {
      console.log("Current1: " + this.selectedShapes[0]);
      console.log("Current2: " + this.selectedShapes[1]);

      var newLine = new Line(1, this.selectedShapes[0], this.selectedShapes[1]);

      this.add(newLine);

      return true;
    }

    return false;
  }

  this.createCircle = function () {
    if (this.selectedShapes.length == 2) {
      console.log("Current1: " + this.selectedShapes[0]);
      console.log("Current2: " + this.selectedShapes[1]);

      var newCircle = new Circle(1, this.selectedShapes[0], this.selectedShapes[1]);

      this.add(newCircle);

      return true;
    }

    return false;
  }

  this.setCurrentFunction = function (func) {
    //clear selected points
    for (var i = 0; i < this.selectedShapes.length; i++) {
      this.hash.byModel[this.selectedShapes[i]].unselect();
    }

    this.selectedShapes = [];
    this.currentFunction = func; 
  };
  
  this.tryCurrentFunction = function () {
    var success = this.currentFunction();
    if (success) {
      this.selectedShapes = [];
      this.currentFunction = this.defaultCurrentFunction;
    }
  };
  //Select
  this.pointSelect = function (pointView) {
    var point = pointView._point;
    if (this.currentFunction != this.defaultCurrentFunction) {
      this.selectShape(point);
    }
  };

  this.potentialPointSelect = function (potentialPointView) {
    var point = potentialPointView._point;

    game.promotePotentialPoint(point);
    potentialPointView.removeFromSuperview();

    var newPointView = game.hash.byModel[point];
    newPointView.select();
    this.selectShape(point);
  };

  this.selectShape = function (shape) {
    if (this.selectedShapes.length == 0) {
      this.selectedShapes.push(shape);
      game.hash.byModel[shape].select();
    }
    else if (this.selectedShapes.length == 1) {
      if (this.selectedShapes[0] != shape) {
        this.selectedShapes.push(shape);
        game.hash.byModel[shape].select();
      }
    }
    else {
      if (this.selectedShapes[1] != shape) {
        var unselected = this.selectedShapes.shift();
        var unselectedView = game.hash.byModel[unselected];
        unselectedView.unselect();

        this.selectedShapes.push(shape);
        game.hash.byModel[shape].select();
      }
    }

    console.log("Point 1: " + this.selectedShapes[0] + " Point 2: " + this.selectedShapes[1]);
    this.tryCurrentFunction();
  };
});
