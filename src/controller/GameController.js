//user
import src.util as util;
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;
import src.ModelViewHash as Hash;
import src.levels.Levels as Levels;

exports = Class(function () {

  this.init = function (drawer) {
    this.drawer = drawer;
    this.state = new State();
    this.goalState = new State();
    this.levelName;
    this.history = [];
    this.hash = new Hash();
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
    this.drawer.drawGoals(this.goalState);
  };

  this.add = function (object) {
    var toDraw = this.state.add(object);
    this.draw(toDraw);
  }

//Drawing methods 
  this.draw = function (object, colour) {
    if (!object){
      this.drawer.draw(game.state, colour);
    }
    else{
      this.drawer.draw(object, colour);
    }
  }
  
  this.clearLayer = function (layer) {
    if (!layer){
      this.drawer.clearLayer();
    }
    else if (Object.prototype.toString.call(layer) === '[object Array]'){
      for (var i = 0; i < layer.length; i++){
        this.clearLayer(layer[i]);
      }
    }
    else{
      this.drawer.clearLayer(layer);
    }
  }
});
