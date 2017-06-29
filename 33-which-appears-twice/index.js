function appearsTwice(array) {
  var num = array.length()
  var triangularSum = (((num^2) + num)/2)
  var sum = array.reduce(add, 0);
  return sum - triangularSum;
}

function add(a, b) {
  return a + b;
}