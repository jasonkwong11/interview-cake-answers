/*Given a amount and an array of coin denominations
  find the number of combinations for an amount
*/

let amount = 4
let denominations = [1, 2, 3]

/* Plan: 
  1. initiailze an array of 0s, array index is the amount value, 
  value is the number of combinations
  2. iterate the denominations forEach coin.
    - iterate through the values, then 

*/
function findCombinations(amount, denominations) {

  let combinations = []

  for (let i = 0; i <= amount; i++) {
    combinations[i] = 0
  }

  combinations[0] = 1

  denominations.forEach((coin) => {

    for (let higherAmount = coin; higherAmount <= amount; higherAmount++) {
      let higherAmountRemainder = higherAmount - coin
      combinations[higherAmount] += combinations[higherAmountRemainder]
    }
  })
  return combinations
}


console.log(findCombinations(amount, denominations));
//result: [ 1, 1, 2, 3, 4 ]