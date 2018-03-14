let stockPrices = [10, 7, 5, 8, 11, 9];
// should return 6 (buying at 5 and selling for 11)

function getMaxProfit(stockPrices) {
    // check edge cases, ensure at least two prices
    if (stockPrices.length < 2) {
        throw new Error("You need at least 2 stock prices!");
    }
    
    let maxProfit = stockPrices[1] - stockPrices[0];
    let currentMin = Math.min(stockPrices[1], stockPrices[0]);
    
    for (let i = 0; i < stockPrices.length; i++) {
        currentPrice = stockPrices[i];
        potentialMaxProfit = currentPrice - currentMin;
        
        maxProfit = Math.max(maxProfit, potentialMaxProfit);
        //check for a new currentMax
        currentMin = Math.min(currentMin, currentPrice)
        
    }
    console.log(maxProfit);
    return maxProfit;
}

getMaxProfit(stockPrices);
