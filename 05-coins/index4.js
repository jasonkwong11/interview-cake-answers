let amount = 4
let denominations = [1, 2 ,3]

function findCombinations(amount, denominations) {
  // instantiate an array of zeros:
  // index is the amount, value is the combination
  let combinations = []
  for (let i=0; i<=amount; i++){
    combinations[i] = 0
  }

  combinations[0] = 1

  denominations.forEach((coin) => {
    for(let higherAmount = coin; higherAmount <= amount; higherAmount++) {
      let higherAmountRemainder = higherAmount - coin;
      combinations[higherAmount] += combinations[higherAmountRemainder]
    }
  })
  return combinations;
}

console.log(findCombinations(amount, denominations));
