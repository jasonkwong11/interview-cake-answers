
//Given an array of integers, find the highest
//possible product of any 3 integers

/* 
Notes: highestProdof3 is just the highest/lowest product of 2 * another highest/lowest
  - check array for at least 3 integers
  - initialize a highestProdof3 with the first 3 integers
  - initialize a highestProd of 2 with first 2
  - initialize a lowestProd of 2 with first 2
  - find the highest 
  - find the lowest

*/
function findHighestProductOf3(array) {
  if(array.length < 3) {throw new Error('need at least 3 integers')}

  let highestProdof3 = array[0] * array[1] * array[2]
  let highestProdOf2 = array[0] * array[1]
  let lowestProdOf2 = array[0] * array[1]

  let highest = Math.max(array[0], array[1])
  let lowest = Math.min(array[0], array[1])

  for (let i = 2; i < array.length; i++) {
    let current = array[i]

    highestProdof3 = Math.max(
      highestProdof3,
      highestProdOf2 * current,
      lowestProdOf2 * current
    )

    highestProdOf2 = Math.max(
      highestProdOf2,
      highest * current,
      lowest * current
    )

    lowestProdOf2 = Math.min(
      lowestProdOf2,
      highest * current,
      lowest * current
    )

    highest = Math.max(highest, current)
    lowest = Math.min(lowest, current)
  }
  return highestProdof3;
}
var array = [2, 3, 33, 10] // should return 60

console.log(findHighestProductOf3(array));
