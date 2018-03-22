/*
Given an array of integers, find the highest
product you can get from three of the integers

The input of intArray will always have at least
three integers
*/

function findHighestProductOf3(array){
/* 
Notes: highestProdof3 is just the highest/lowest product of 2 * another highest/lowest
  - check array for at least 3 integers
  - initialize a highestProdof3 with the first 3 integers
  - initialize a highestProd of 2 with first 2
  - initialize a lowestProd of 2 with first 2
  - find the highest 
  - find the lowest
*/

  if (array.length < 3) { throw Error("Need at least 3 integers") }

  var highestProdof3 = array[0] * array[1] * array[2]
  var highestProdof2 = array[0] * array[1]
  var lowestProdof2 = array[0] * array[1]
  var highest = Math.max(array[0], array[1])
  var lowest = Math.min(array[0], array[1])

  for (var i = 2; i < array.length; i++) {

    currentNum = array[i];

    highestProdof3 = Math.max(
      highestProdof2 * currentNum,
      lowestProdof2 * currentNum,
      highestProdof3
    );

    lowestProdof2 = Math.min(
      lowestProdof2,
      lowest * currentNum,
      highest * currentNum
    )

    highestProdof2 = Math.max(
      highestProdof2,
      lowest * currentNum,
      highest * currentNum
    )

    highest = Math.max(highest, currentNum)
    lowest = Math.min(lowest, currentNum)

  }
  return highestProdof3;
}



var array = [2, 3, -2, -10]
console.log(findHighestProductOf3(array));
