//user
import src.util as util;
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.model.State as State;

exports = Class(function () {

  this.init = function (drawer) {
    this.drawer = drawer;
    this.state = new State();
    this.goalState = new State();
    this.levelName;
    this.history = [];
  }
  
  this.loadLevel = function (levelName) {
    this.levelName = levelName;
    this.clearLayer();
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
  
    this.state.add(level.state);
    this.goalState.add(level.goalState);
  }

  this.complete = function () {
    if (this.goalState.isContainedIn(this.state)){
      return true;
    }
    else{
      return false;
    }
  }
  
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
  this.addPoint = function (point) {
    this.state.addPoint(point);
  }
  
  this.addLine = function (line) { 
    this.state.addLine(line);
  }
  
  this.addCircle = function (circle) {
    this.state.addCircle(circle);
  }

  this.addPotentialPoint = function (point) {
    this.state.addPotentialPoint(point);
  }

  this.promotePotentialPoint = function (point) {
    this.removePotentialPoint(point);
    point.potential = false;
    this.add(point);
  }

  this.addLevelState = function (levelState) {
    var points = levelState.points;
    var lines = levelState.lines;
    var circles = levelState.circles;
    var potentialPoints = levelState.potentialPoints;
  
    if (points){
      for (var p in points){
        var point = new Point(0, points[p].x, points[p].y);
        this.addPoint(point); 
      }
    }
  
    if (lines){
      for (var l in lines){
        var line = new Line(0, points[lines[l].pt1], points[lines[l].pt2]);
        this.addLine(line);
      }
    }
  
    if (circles){
      for (var c in circles){
        var circle = new Circle(0, points[circles[c].foc], points[circles[c].loc]);
        this.addCircle(circle);
      } 
    }

    if (potentialPoints){
      for (var p in potentialPoints){
        var point = new Point(0, potentialPoints[p].x, potentialPoints[p].y);
        this.addPotentialPoint(point); 
      }
    }
  }
  
  this.add = function (object) {
    this._add(object);
    this.history.push(this.state.recentlyAdded);
    this.draw(this.state.recentlyAdded);
    this.state.recentlyAdded = [];
  }

  this._add = function (object) {
    if (object.type === "Point"){
      this.addPoint(object);
    }
    else if (object.type === "Line"){
      this.addLine(object);
    }
    else if (object.type === "Circle"){
      this.addCircle(object);
    }
    else if (Object.prototype.toString.call(object) === '[object Array]'){
      for (var i = 0; i < object.length; i++){
        this._add(object[i]);
      }
    }
    else if (object.type === "State"){
      this._add(object.all());
    }
    else if (object.points || object.lines || object.circles){
      this.addLevelState(object);
    }
  
    //if (game.complete()){
    //  alert("You win, you always do!");
    //}
  }


//Remove Methods
  this.removePoint = function (point) {
    this.state.removePoint(point);
  }

  this.removeLine = function (line) {
    this.state.removeLine(line);
  }

  this.removeCircle = function (circle) {
    this.state.removeCircle(circle);
  }

  this.removePotentialPoint = function (point) {
    this.state.removePotentialPoint(point);
  }

  this.removeLevelState = function (levelState) {
    this.state.removeLevelState(levelState);
  }

  this.remove = function (object) {
    if (object.type === "Point"){
      this.removePoint(object);
    }
    else if (object.type === "Line"){
      this.removeLine(object);
    }
    else if (object.type === "Circle"){
      this.removeCircle(object);
    }
    else if (Object.prototype.toString.call(object) === '[object Array]'){
      for (var i = 0; i < object.length; i++){
        this.remove(object[i]);
      }
    }
    else if (object.type === "State"){
      this.remove(object.all());
    }
    else if (object.points || object.lines || object.circles){
      this.removeLevelState(object);
    }
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
  
  this.drawGoals = function (colour) {
    if (!colour){
      colour = "#000000";
    }
    else{
      this.drawer.draw(game.goalState, colour);
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
