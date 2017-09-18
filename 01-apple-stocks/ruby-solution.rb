prices = [10, 7, 5, 8, 11, 9] # => should be 6

#get buy at the lowest and sell at the highest
#buy at 5 and sell at 11 ==> 6

def get_max_profit(prices)
  raise IndexError("Must be at least 2 prices") if prices.length < 2
  #initialize a current_max_profit and current_min
  current_min = prices[0]
  current_max_profit = prices[1] - prices[0]

  prices.each do |price|
    #calculate the potential profit and check if it's larger than current max profit
    potential_profit = price - current_min
    current_max_profit = [potential_profit, current_max_profit].max
    #update current_min
    current_min = [current_min, price].min
  end
  current_max_profit
end

puts get_max_profit(prices)