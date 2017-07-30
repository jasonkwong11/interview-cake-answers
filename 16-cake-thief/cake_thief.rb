def max_duffel_bag_value(cake_arrays, weight_capacity)
  #we make an array to hold the max possible value
  #at every duffel bag weight capacity from 0 to weight capacity
  max_values_at_capacities = [0] * (weight_capacity + 1)

  (0..weight_capacity).each do |current_capacity|
    #set a variable to hold the max monetary value so far
    current_max_value = 0

    cake_arrays.each do |cake_weight, cake_value|
      #if a cake weighs 0 and has a positive value the
      # our duffel bag is infinite

      if (cake_weight == 0 && cake_value != 0)
        return Float::INFINITY
      end

      #if the current cake weighs as much or less than
      #the current weight capacity, it's possible 
      #taking the cake would give us a better value

      if (cake_weight <= current_capacity)
        max_value_using_cake = cake_value + max_values_at_capacities[current_capacity - cake_weight]
        #now we see if its worth taking the cake. how does the value
        #compare with the current_max_value
        current_max_value = [max_value_using_cake, current_max_value].max
      end
    end
    #add each capacity's max value to the current capacity so we can use it
    #when calculating all the remaining capacities
    max_values_at_capacities[current_capacity] = current_max_value
  end
  return max_values_at_capacities[weight_capacity]
end
