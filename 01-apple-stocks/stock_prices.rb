
def get_max_profit(stock_prices)
  raise StandardError("Need at least 2 prices") if stock_prices.length < 2
  #initialize current highest price
  current_min = stock_prices[0]
  #initialize current_max_profit
  current_max_profit = stock_prices[0] - stock_prices[1]

  stock_prices.each do |price|
    potential_profit = price - current_min

    current_max_profit = potential_profit if potential_profit > current_max_profit

    current_min = price if price < current_min
  end
 puts current_max_profit
end

stock_prices = [10, 7, 5, 8, 11, 9]
get_max_profit(stock_prices)