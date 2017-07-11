// Write a function that computes the number of 
// ways to make the amount of money with coins
// of the available array of denominations.

/*
  Plan: use bottom-up:
    1. Start with the amount of combinations
    to make 1 cent
    2. keep adding the number of combinations by each
    incremental amount value until you reach the
    specified amount
*/

function computeCombinations(amount, denominations) {
  let combinations = [];
  //initialize each index in the array with 0
  for (let i = 0; i <= amount; i++) {
    combinations[i] = 0;
  }

  combinations[0] = 1;

  denominations.forEach((coin) => {
    for (var higherAmount = coin; higherAmount <= amount; higherAmount++) {
      let higherAmountRemainder = higherAmount - coin
      combinations[higherAmount] += combinations[higherAmountRemainder]
    }
  })
  return combinations;
}
let amount = 4;
let denominations = [1,2,3];

console.log(computeCombinations(amount, denominations));
//Time Complexity: O(m*n) ... m is the amount. n is the number of coin denominations
// Space Complexity: O(n)
/*
amount = 4 
denominations = [1, 2, 3]
*/


