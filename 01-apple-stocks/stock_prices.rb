def get_max_profit(stock_prices)
  raise IndexError if stock_prices.length <= 2

  current_max_profit = stock_prices[1] - stock_prices[0]

  current_min = stock_prices[0]
 
  stock_prices.each_with_index do |price, index|

    next if index == 0

    potential_max_profit = price - current_min

    current_max_profit = potential_max_profit if potential_max_profit > current_max_profit
    current_min = price if price < current_min
  end
  current_max_profit
end


stock_prices = [2, 23, 5, 4, 99, 9]
puts get_max_profit(stock_prices)