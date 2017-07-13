var myRectangle = {
  // coordinates of bottom-left corner
  leftX: 1,
  bottomY: 5,

  // width and height
  width: 10,
  height: 4,
};

function findOverlap(point1, length1, point2, length2) {
  let highestStartPoint = Math.max(point1, point2)
  let lowestEndPoint = Math.min(point1 + length1, point2 + length2)

  if (highestStartPoint >= lowestEndPoint) {
    return {startPoint: null, overlapLength: null}
  }

  let overlapLength = lowestEndPoint - highestStartPoint

  return { startPoint: highestStartPoint, overlapLength: overlapLength }
}

function findRectangularOverlap(rect1, rect2) {
  let xOverlap = findOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width)
  let yOverlap = findOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height)

  //return null rectangle if there is no overlap
  if(!xOverlap.overlapLength || !yOverlap.overlapLength) {
    return {
      leftX: null,
      bottomY: null,
      width: null,
      height: null
    }
  }

  return {
    leftX: xOverlap.startPoint, 
    bottomY: yOverlap.startPoint, 
    width: xOverlap.overlapLength, 
    height: yOverlap.overlapLength
  }
}
