function rand5() {
  var roll = rand7();
  return roll <= 5 ? roll : rand5();
}
// Complexity: Worst-case O(infinite) time 
//because we might keep re-rolling forever
// and O(1) space