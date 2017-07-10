

function findHighestProductOf3(intArray) {

  if (intArray.length < 3) { throw new Error('Array needs at least 3 integers')}

  // highest product of 3 integers:
  // highest product of 2 integers * next highest num
    // - 2 highest postive ints, or 2 highest negative ints
  //

  /* iterate through intArray,
  keep track of the current highest product of two ints
  and the lowest (most negative) product of two ints

  multiply both the highest and lowest by the current int,
  then see if there's a new highest

  */

  let highest = Math.max(intArray[0], intArray[1])
  let lowest = Math.min(intArray[0], intArray[1])

  let highestProductOf2 = intArray[0] * intArray[1]
  let lowestProductOf2 = intArray[0] * intArray[1]

  let highestProductOf3 = intArray[0] * intArray[1] * intArray[2]

  for (let i = 2; i < intArray.length; i++) {
    let current = intArray[i]

    highestProductOf3 = Math.max(
      highestProductOf3,
      highestProductOf2 * current, 
      lowestProductOf2 * current
    )

    highestProductOf2 = Math.max(
      highestProductOf2,
      highest * current,
      lowest * current
    )

    lowestProductOf2 = Math.min(
      lowestProductOf2,
      highest * current,
      lowest * current
    )

    highest = Math.max(highest, current)
    lowest = Math.min(lowest, current)
  }
  return highestProductOf3;
}

var array = [2, 3, -2, -10]

console.log(findHighestProductOf3(array));

// Time Complexity: O(n)... one pass through the integer array
// Space Complexity: O(1)... constant number of variables used








