exports.arrayContains = function (array, object)
{
  if (array && object)
  {
    for(var i = 0; i < array.length; i++){
      if (array[i] == object){
        return true;
      } 
    }
    return false;
  }
}


exports.objectCount = function (object){
  var count = 0;
  for (var el in object){
    if (object.hasOwnProperty(el)){
      count++;
    }
  }
  return count;
}

exports.pointPointDistance  = function (pt1X, pt1Y, pt2X, pt2Y){
    return Math.sqrt(Math.pow(pt1X - pt2X, 2) + Math.pow(pt1Y - pt2Y, 2));
}
