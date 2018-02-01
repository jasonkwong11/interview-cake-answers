var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

function getMaxProfit(stockPricesYesterday) {

// check for at least 2 prices

  if (stockPricesYesterday.length < 2) {
    throw new Error("You need at least 2 stock prices")
  }

// high level plan: initialize a currentMin and a maxProfit
// from the first two prices.
// iterate through the stock prices and check if the current
// price creates a new maxProfit, using a potentialMaxProfit variable
// check if you have a new minPrice
// return the maxProfit

  let currentMin = stockPricesYesterday[0];
  let maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  for (let i = 0; i < stockPricesYesterday.length - 1; i++) {
    let currentPrice = stockPricesYesterday[i];
    let potentialMaxProfit = currentPrice - currentMin;

    maxProfit = Math.max(maxProfit, potentialMaxProfit);
    currentMin = Math.min(currentMin, currentPrice);
  }
  return maxProfit;
}

console.log(getMaxProfit(stockPricesYesterday))
