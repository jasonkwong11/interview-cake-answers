function isSingleRiffle(half1, half2, shuffledDeck) {
  var half1Index = 0;
  var half2Index = 0;
  var half1MaxIndex = half1.length - 1;
  var half2MaxIndex = half2.length - 1;

  for (var i = 0; i < shuffledDeck.length; i++) {
    var card = shuffledDeck[i]

    if (half1Index <= half1MaxIndex &&
        half1[half1Index] === card) {
      half1Index++;
    } else if (half2Index <= half2MaxIndex &&
        half2[half2Index] === card) {
      half2Index++;
    } else {
      return false
    }
  }
  return true
}

//Complexity: O(n) time and O(1) space
