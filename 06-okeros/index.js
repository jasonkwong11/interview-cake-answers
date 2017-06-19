
function findRangeOverlap(point1, length1, point2, length2) {
  // find the highest startpoint and lowest endpoint
  // the highest("rightmost" or "upmost") startpoint is
  // the startpoint of the overlap.
  // the lowest end point is the endpoint of the overlap

  var highestStartPoint = Math.max(point1, point2);
  var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

  // return null overlap if there is no overlap
  if (highestStartPoint >= lowestEndPoint) {
    return {startPoint: null, overlapLength: null};
  }

  //compute the overlap width
  var overlapLength = lowestEndPoint - highestStartPoint;

  return {startPoint: highestStartPoint, overlapLength: overlapLength};
}

function findRectangularOverlap(rect1, rect2) {

  //get the x and y overlap points and lengths
  var xOverlap = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
  var yOVerlap = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

  //return null rectangle if there is no overlap
  if(!xOverlap.overlapLength || !yOVerlap.overlapLength) {
    return {
      leftX: null,
      bottomY: null,
      width: null,
      height: null,
    };
  }

  return {
    leftX: xOverlap.startpoint,
    bottomY: yOVerlap.startPoint
    width: xOverlap.overlapLength,
    height: yOVerlap.overlapLength,
  };
}


