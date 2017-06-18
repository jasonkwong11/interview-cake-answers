// Strategies: 
// 1. Keep track of the highest2 and lowest2 numbers.
// If the current number times some combination of those
// is higher than the current highestProductOf3, we
// have a new highestProductOf3!
//
// 2. Keep track of the highestProductOf2 and the
// lowestProductOf2. Could be a low negative number.
// If the current number times one of those is higher
// than the current highestProductOf3, we have a new
// highestProductOf3. We'll go with this one

function highestProductOf3(array) {

  //check that array has at least 3 elements
  if (array.length < 3) {throw new Error('Less than 3 items!')}

  // start at the 3rd item (index 2)
  //so pre-populate highest and lowest based on
  // the first 2 items

  let highest = Math.max(array[0], array[1]);
  let lowest = Math.min(array[0], array[1]);

  let highestProductOf2 = array[0] * array[1];
  let lowestProductOf2 = array[0] * array[1];

  let highestProductOf3 = array[0] * array[1] * array[2];

  //walk thorugh the items, starting at index 2
  for (let i = 2; i < array.length ; i++) {
    let current = array[i]

    //do we have a highest product of 3?
    // it's either the current highest,
    // or the current times the highest prod of 2
    // or the current times the lowest prod of 2
    highestProductOf3 = Math.max(
      highestProductOf3,
      current * highestProductOf2,
      current * lowestProductOf2
    );

    // do we have a new highest product of two?
    highestProductOf2 = Math.max(
      highestProductOf2,
      current * highest,
      current * lowest
    );

    lowestProductOf2 = Math.min(
      lowestProductOf2,
      current * highest,
      current * lowest
    )

    // do we have a new highest?
    highest = Math.max(highest, current);

    //do we have a new lowest?
    lowest = Math.min(lowest, current);
  }
  return highestProductOf3;
}

module.exports = highestProductOf3;
