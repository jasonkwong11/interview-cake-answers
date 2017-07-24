

def highest_prod_of_three(ints)
  raise StandardError("Need at least 3 ints") if ints.length < 3

  #initialize current values
  current_lowest_of_two = ints[0] * ints[1]
  current_highest_of_two = ints[0] * ints[1]

  current_highest_prod_three = ints[0] * ints[1] * ints[2]

  highest = [ints[0], ints[1]].max
  lowest = [ints[0], ints[1]].min

  ints.each_with_index do |i, index|
    next if index < 2

    current_highest_prod_three = [current_lowest_of_two * i, current_highest_of_two * i, current_highest_prod_three].max
    
    current_highest_of_two = [highest * i, lowest * i, current_highest_of_two].max
    current_lowest_of_two = [lowest * i, highest * i, current_lowest_of_two].min
  
    highest = [highest, i].max
    lowest = [lowest, i].min
  end
  puts current_highest_prod_three
end
array = [2, 3, -2, -10]

highest_prod_of_three(array)


