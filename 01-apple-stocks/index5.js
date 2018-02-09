var stockPrices = [10, 7, 5, 8, 11, 9];
var notEnough = [3]
function getMaxProfit(stockPrices) {
  /* high level plan: iterate through the stockPrices and greedily check
      if we have a new maxProfit and minPrice. that minPrice will be used to find the
      new potentialMaxProfit
  */

  //check for at least 2 prices
  if (stockPrices.length < 2) {
    throw new Error("Must include at least two stockPrices")
  }
  //initialize a minPrice and maxProfit
  let minPrice = stockPrices[0]
  let maxProfit = stockPrices[1] - stockPrices[0]

  for (i = 0; i < stockPrices.length - 1; i++) {
    let currentPrice = stockPrices[i]

    let potentialMaxProfit = currentPrice - minPrice;

    maxProfit = Math.max(potentialMaxProfit, maxProfit);
    minPrice = Math.min(minPrice, currentPrice);
  }
  return maxProfit;
}

console.log(getMaxProfit(notEnough))

// time and space complexity:
// O(n) time complexity: one pass through the stock prices
// O(1) space complexity: fixed number of variables


