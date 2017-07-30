function maxDuffelBagValue(cakeTypes, weightCapacity) {

  var maxValuesAtCapacities = [];
  for (var i = 0; i < weightCapacity; i++) {
    maxValuesAtCapacities[i] = 0;
  }

  for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {
    
    var currentMaxValue = 0;

    for (var j = 0; j < cakeTypes.length; j++) {
      var cakeType = cakeTypes[j];

      if (cakeType.weight === 0 && cakeType.value !== 0) {
        return Infinity;
      }

      if (cakeType.weight <= currentCapacity) {
        var maxValueUsingCake = cakeType.value + maxValuesAtCapacities[currentCapacity - cakeType.weight]
        currentMaxValue = Math.max(maxValueUsingCake, currentMaxValue)
      }
    }
    maxValuesAtCapacities[currentCapacity] = currentMaxValue;
  }
  return maxValuesAtCapacities[weightCapacity];
}

//COMPLEXITY: O(n*k) time and O(k) space, where n is the number of
// types of cakes and k is the capacity of the duffel bag
// we loop through eachcake (n cakes) for every capacity (k capacities)
// so our runtime is O(n * k), and maintaining the array of k + 1
// capacities gives us the O(k) space.

// Note: this is a slow algorithm if n and k are close... almost
// as O(n * k) is almost as bad as O(n^2).. if we want a faster
// algorithm, we'd use the value/weight ratios, even though
// it might not give us the optimal answer: O(n log n).. because of sorting

