input = [1, 7, 3, 4]

def gets_other_products(array)
  
  raise IndexError('Requires at least 2 nums') if array.length < 2

  products = []
  #for each integer, we find the product of all the integers
  #before it, storing the total product so far each time
  product_so_far = 1
  i = 0
  while i < array.length
    products[i] = product_so_far
    product_so_far *= array[i]
    i += 1
  end
  #for each integer, we find the product of all the integers
  #after it. since each index in products already has the
  #product of all the integers before it, now we're storing
  #the total product of all other integers
  product_so_far = 1
  i = array.length - 1
  while i >= 0
    products[i] *= product_so_far
    product_so_far *= array[i]
    i -= 1
  end
  products
end

puts gets_other_products(input)
#should return [84, 12, 28, 21]
