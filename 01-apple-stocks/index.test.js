const getMaxProfit = require('./index');

var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

test('getMaxProfit', () => {
  expect(getMaxProfit(stockPricesYesterday)).toBe(6);
})