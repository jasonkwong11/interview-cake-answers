#Given an array of integers, find the highest 
#product you can get from three of the integers.

input = [1, 2, -3, 4, -5]
#should return 60

def highest_prod_of_three(arr)
  raise IndexError("must have at least 3 nums") if arr.length < 3

  highest_three = arr[0] * arr[1] * arr[2]

  highest_two = arr[0] * arr[1]
  lowest_two = arr[0] * arr[1]

  highest = [arr[0], arr[1]].max
  lowest = [arr[0], arr[1]].min

  arr.each_with_index do |n, i|

    highest_three = [
      highest_three,
      lowest_two * n,
      highest_two * n
    ].max

    highest_two = [
      highest_two,
      lowest * n,
      highest * n
    ].max

    lowest_two = [
      lowest_two,
      lowest * n,
      highest * n
    ].min

    lowest = [lowest, n].min 
    highest = [highest, n].max
  end
  highest_three
end

puts highest_prod_of_three(input)