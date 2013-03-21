exports = Class(function () {
  
  this.init = function() {
    this.byModel = {};
    this.byView = {};
  }

  this.add = function(objectPair) {
    if (objectPair.model && objectPair.view) {
      this.byModel[objectPair.model] = objectPair.view;
      this.byView[objectPair.view] = objectPair.model;
    }
  }

  this.remove = function(object) {
    if (this.byModel[object]) {
      delete this.byView[this.byModel[object]];
      delete this.byModel[object];
    }
    else if (this.byView[object]) {
      delete this.byModel[this.byView[object]];
      delete this.byView[object];
    }
  }

  this.lookup = function(object) {
    if (this.byModel[object]) {
      return this.byModel[object];
    }
    else if (this.byView[object]) {
      return this.byView[object];
    }
  }
});
