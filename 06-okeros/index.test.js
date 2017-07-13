var myRectangle = {

    // coordinates of bottom-left corner
    leftX: 1,
    bottomY: 5,

    // width and height
    width: 10,
    height: 4,

};

function findXOverlap(x1, width1, x2, width2) {
  // find the highest ('rightmost') startpoint
  // and lowest ('leftmost') endpoint
  var highestStartPoint = Math.max(x1, x2)
  var lowestEndPoint = Math.min(x1 + width1, x2 + width2)

  //return null overlap if there is no overlap
  if (highestStartPoint >= lowestEndPoint) {
    return {startPoint: null, width: null};
  }

  // compute the overlap width
  var overlapWidth = lowestEndPoint - highestStartPoint;
  return {startPoint: highestStartPoint, width: overlapWidth};
}

/*
One of our ranges starts "further to the right" 
than the other. We don't know ahead of time 
which one it is, but we can check the 
starting points of each range to see which
 one has the highestStartPoint. That 
 highestStartPoint is always the left-hand 
 side of the overlap, if there is one.
*/




