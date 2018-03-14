var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

function getMaxProfit(stockPricesYesterday) {

  //check edge case: make sure there's at least 2 prices
  if (stockPricesYesterday.length < 2) {
    throw new Error("You need at least 2 prices")
  }
  // initialize a currentMin
  // initialize a current maxProfit

word.split(/[\s,']/)

  // iterate through the stockPrices
    // for each price, check to see if the 
    // current price would yield a new Max
  var currentMin = stockPricesYesterday[0];
  var maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  for (var i = 0; i <= stockPricesYesterday.length - 1; i++) {
    let currentPrice = stockPricesYesterday[i]
    let potentialProfit = currentPrice - currentMin;

    maxProfit = Math.max(maxProfit, potentialProfit);
    currentMin = Math.min(currentMin, currentPrice)
  }
  return maxProfit;
}
// Time Complexity:  O(n)... n is the number of stock prices
// Space Complexity: O(1)... constant space, constant number of variables

// returns 6 (buying for 5 and selling for 11)
console.log(getMaxProfit(stockPricesYesterday));