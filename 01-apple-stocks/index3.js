var prices = [10, 7, 5, 8, 11, 9];
// returns 6 (buying for 5 and selling for 11)
/*
  Plan: 1. check if stockPrices has at least 2 elements, if not throw error

  -initialize a current max profit (prices[1] - prices[0])
  - iterate through each price
*/
function getMaxProfit(prices) {
  if (prices.length < 2) { throw new Error('Need at least 2 elements')}

  let currentMaxProfit = prices[1] - prices[0]
  let currentMin = prices[0]
  
  for (let i = 0; i < prices.length; i++) {
    let currentPrice = prices[i];
    let potentialProfit = currentPrice - currentMin

    currentMaxProfit = Math.max(potentialProfit, currentMaxProfit)

    currentMin = Math.min(currentPrice, currentMin)
  }

  return currentMaxProfit  
}

console.log(getMaxProfit(prices))
