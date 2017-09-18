#Given an array of integers, find the highest 
#product you can get from three of the integers.

input = [1, 2, -3, 4, -5]
#should return 60

def highest_of_three(array)
  raise IndexError("Must have at least 3 elements") if array.length < 3

  highest_three = array[0] * array[1] * array[2]

  highest_two = array[0] * array[1]
  lowest_two = array[0] * array[1]

  highest = [array[0], array[1]].max
  lowest = [array[0], array[1]].min

  array.each_with_index do |n, i|

    highest_three = [
      highest_three,
      n * highest_two,
      n * lowest_two
    ].max

    highest_two = [
      highest_two,
      n * highest,
      n * lowest
    ].max

    lowest_two = [
      lowest_two,
      n * highest,
      n * lowest
    ].min

    highest = [highest, n].max
    lowest = [lowest, n].min
  end
  highest_three
end

puts highest_of_three(input)
