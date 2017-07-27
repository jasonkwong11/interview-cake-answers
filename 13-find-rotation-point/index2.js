function findRotationPoint(words) {
  const firstWord = words[0]

  var floorIndex = 0;
  var ceilingIndex = words.length - 1;

  while (floorIndex < ceilingIndex) {

    //guess a point halfway between
    //floor and ceiling
    var guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

    // if guess comes after first word or is the first word
    if (words[guessIndex] >= firstWord) {
      // go right
      floorIndex = guessIndex;
    } else {
      //go left
      ceilingIndex = guessIndex;
    }

    // if floor and ceiling have converged
    if (floorIndex + 1 === ceilingIndex) {
      // between floor and ceiling is where we flipped to the beginning
      // so ceiling is alphabetically first
      break;
    }
  }

  return ceilingIndex;
}

//COMPLEXITY:
// Each time we go through the while loop, 
//we cut our range of indices
// in half, just like binary search. 
//So we have O(log n) loop iterations.

// Binary search teaches us that when
// an array is sorted or mostly sorted:

// 1. The value at a given index tells us 
// a lot about what's to the left and what's
// to the right

// 2. We don't have to look at every item
// in the array. By inspecting the middle
// item, we can "rule out" half the array

// 3. We can use this approach over and over
// cutting the problem in half until we
// have the answer.
