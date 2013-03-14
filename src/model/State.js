//user
import src.model.Point as Point;
import src.model.Line as Line;
import src.model.Circle as Circle;
import src.util as util;

exports = Class(function () {
  
  this.init = function (obj) {
    obj = obj || {};
    this.points = obj.points ? obj.points : [];
    this.lines = obj.lines ? obj.lines : [];
    this.circles = obj.circles ? obj.circles : [];
    this.potentialPoints = obj.potentialPoints ? obj.potentialPoints : [];
    this.type = "State";
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
  
  this.addPoint = function (point) {
    if (point.type === "Point"){
      if (!point.isInArray(this.points)){
        this.points.push(point);
        console.log(point.toString());
      }
    }
    else {
      console.log("Point already in array.");
    }
  }
  
  this.addLine = function (line) {
    if (line.type === "Line"){
      if (!line.isInArray(this.lines)){
        for (var i = 0; i < this.linesCircles().length; i++){
          var potentialPoints = line.intersectsWith(this.linesCircles()[i]);
  
          if (potentialPoints){
            for (var j = 0; j < potentialPoints.length; j++){
              this.addPotentialPoint(potentialPoints[j]);  
            }
          }
        }
  
        this.lines.push(line);
        console.log(line.toString());
      }
      else {
        console.log("Line already in array");
      }
    }
  }
  
  this.addCircle = function (circle) {
    if(circle.type === "Circle"){
      if (!circle.isInArray(this.circles)){
        for (var i = 0; i < this.linesCircles().length; i++){
          var potentialPoints = circle.intersectsWith(this.linesCircles()[i]);
  
          if (potentialPoints){
            for (var j = 0; j < potentialPoints.length; j++){
              this.addPotentialPoint(potentialPoints[j]);  
            }
          }
        }
  
        this.circles.push(circle);
        console.log(circle.toString());
      } 
      else{
        console.log("Circle already in array.");
      }
    }
  }
  
  this.addPotentialPoint = function (point) {
    if (point.type === "Point"){
      if (!point.isInArray(this.potentialPoints)){
        this.potentialPoints.push(point);
      }
    }
    else {
      console.log("not a point.");
    }
  }
  
  this.addLevelState = function (levelState) {
    var points = levelState.points;
  
    if (points){
  
      for (var p in points){
        var point = new Point(0, points[p].x, points[p].y);
        //So we can refer to this point later
        points[p] = point;
        this.addPoint(point); 
      }
    }
  
    var lines = levelState.lines;
  
    if (lines){
      for (var l in lines){
        var line = new Line(0, points[lines[l].pt1], points[lines[l].pt2]);
        
        this.addLine(line);
      }
    }
  
    var circles = levelState.circles;
  
    if (circles){
      for (var c in circles){
        var circle = new Circle(0, points[circles[c].foc], points[circles[c].loc]);
  
        this.addCircle(circle);
  
      } 
    }
  }
  
  this.add = function (object) {
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
        this.add(object[i]);
      }
    }
    else if (object.type === "State"){
      this.add(object.pointsLinesCircles());
    }
    else if (object.points || object.lines || object.circles){
      this.addLevelState(object);
    }
  }
  
  this.isContainedIn = function (state) {
    if (state.type === "State"){
      for (var i = 0; i < this.points.length; i++){
        if (!this.points[i].isInArray(state.points)){
          return false;
        }
      }
      for (var i = 0; i < this.lines.length; i++){
        if (!this.lines[i].isInArray(state.lines)){
          return false;
        }
      }
      for (var i = 0; i < this.circles.length; i++){
        if (!this.circles[i].isInArray(state.circles)){
          return false;
        }
      }
      return true;
    }
    return false;
  }
});
