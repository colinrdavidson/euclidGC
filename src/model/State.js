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
    this.recentlyAdded = {points : [],
													potentialPoints : [],
													lines : [],
													circles : []
												 };
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

//Handy Getters
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
    if (!point.isInArray(this.points)){
      this.points.push(point);
      this.recentlyAdded.points.push(point);
      console.log("Add: ", point.toString());
    }
    else {
      console.log("Failed to add: ", point.toString());
		}	
  }
  
  this.addLine = function (line) {
    if (!line.isInArray(this.lines)){

			//Since the line is new, check for intersections
      for (var i = 0; i < this.linesCircles().length; i++){
        var potentialPoints = line.intersectsWith(this.linesCircles()[i]);

				//Check if intersections are new
        for (var j = 0; j < potentialPoints.length; j++) {
					this.addPotentialPoint(potentialPoints[j]);
        }
      }
 			
			//Add the line to the line array and recently added object
      this.lines.push(line);
      this.recentlyAdded.lines.push(line);
      console.log("Add: ", line.toString());
    }
    else {
      console.log("Failed to add: ", line.toString());
    }
  }
  
  this.addCircle = function (circle) {
    if (!circle.isInArray(this.circles)){

			//Since the cirlce is new, check for intersections
      for (var i = 0; i < this.linesCircles().length; i++){
        var potentialPoints = circle.intersectsWith(this.linesCircles()[i]);
 
				//Check if intersections are new points 
        for (var j = 0; j < potentialPoints.length; j++){
					this.addPotentialPoint(potentialPoint[j]);
        }
      }
  
			//Add the circle to the circle array and recently added object
      this.circles.push(circle);
      this.recentlyAdded.circles.push(circle);
      console.log("Add :", circle.toString());
    } 
    else{
      console.log("Failed to add: ", circle.toString());
    }
  }
  
  this.addPotentialPoint = function (point) {
    if (!point.isInArray(this.allPoints)){
      this.potentialPoints.push(point);
      this.recentlyAdded.potentialPoints.push(point);
      console.log("Add: Potential: ", point.toString());
    }
  	else  {
    	console.log("Already exists no need to add:: ", point.toString());
   	}
  }
  
  this.addLevelState = function (levelState) {
    var points = levelState.points;
    var lines = levelState.lines;
    var circles = levelState.circles;
  
    if (points){
      for (var p in points){
        var point = new Point(points[p].x, points[p].y);
        points[p] = point;
        this.addPoint(point); 
      }
    }
  
  
    if (lines){
      for (var l in lines){
        var line = new Line(points[lines[l].pt1], points[lines[l].pt2]);
        this.addLine(line);
      }
    }
  
  
    if (circles){
      for (var c in circles){
        var circle = new Circle(points[circles[c].foc], points[circles[c].loc]);
        this.addCircle(circle);
      } 
    }
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
        this.add(object[i]);
      }
    }
    else if (object.type === "State"){
      this.add(object.all());
    }
    else if (object.points || object.lines || object.circles){
      this.addLevelState(object);
    }
  }

	this.add = function (object) {
		this._add(object);
		return this.recentlyAdded;
	}	
  
//Remove Methods
  this.removePoint = function (point) {
    if (point.isInArray(this.points)){
      for (var i = 0; i < this.points.length; i++){
        if (point.isSame(this.points[i])){
          this.points.splice(i, 1);
          console.log("Remove: ", point.toString());
        }
      }
    }
    else{
      console.log("Failed to add: ", point.toString());
    }
  }

  this.removeLine = function (line) {
    if (line.isInArray(this.lines)){
      for (var i = 0; i < this.lines.length; i++){
        if (line.isSame(this.lines[i])){
          this.lines.splice(i, 1);
          console.log("Remove: ", line.toString());
        }
      }
    }
    else{
      console.log("Failed to add: ", line.toString());
    }
  }

  this.removeCircle = function (circle) {
    if (circle.isInArray(this.circles)){
      for (var i = 0; i < this.circles.length; i++){
        if (circle.isSame(this.circles[i])){
          this.circles.splice(i, 1);
          console.log("Remove: ", circle.toString());
        }
      }
    }
    else{
      console.log("Failed to add: ", circle.toString());
    }
  }

  this.removePotentialPoint = function (point) {
    if (point.isInArray(this.potentialPoints)){
      for (var i = 0; i < this.potentialPoints.length; i++){
        if (point.isSame(this.potentialPoints[i])){
          this.potentialPoints.splice(i, 1);
          console.log("Remove: Potential:", point.toString());
        }
      }
    }
    else{
      console.log("Failed to remove: Potential: ", point.toString());
    }
  }

  this.removeLevelState = function (levelState) {
    var points = levelState.points;
    var lines = levelState.lines;
    var circles = levelState.circles;
  
    if (points){
      for (var p in points){
        var point = new Point(points[p].x, points[p].y);
        this.removePoint(point); 
      }
    }
  
    if (lines){
      for (var l in lines){
        var line = new Line(points[lines[l].pt1], points[lines[l].pt2]);
        this.removeLine(line);
      }
    }
  
    if (circles){
      for (var c in circles){
        var circle = new Circle(points[circles[c].foc], points[circles[c].loc]);
        this.removeCircle(circle);
      } 
    }
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
});
