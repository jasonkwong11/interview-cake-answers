
function getMaxProfit(stockPricesYesterday) {

  //check edge case: make sure there's at least 2 prices
  if (stockPricesYesterday.length < 2) {
    throw new Error("You need at least 2 stocks")
  }

  //initialize first possible profit and lowest
  var currentLowest = stockPricesYesterday[0];
  let maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  //for
  for (let i = 0; i < stockPricesYesterday.length; i++) {
    let currentPrice = stockPricesYesterday[i];

    let potentialProfit = currentPrice - currentLowest;
    maxProfit = Math.max(maxProfit, potentialProfit);

    currentLowest = Math.min(currentLowest, currentPrice);
  }

  return maxProfit;
}

module.exports = getMaxProfit;
//COMPLEXITY: 
// O(n) time and O(1) space