
function isSingleRiffle(half1, half2, shuffledDeck, shuffledDeckIndex, half1Index, half2Index) {
  shuffledDeckIndex = (typeof shuffledDeckIndex !== 'undefined' ? shuffledDeckIndex : 0);
  half1Index = (typeof half1Index !== 'undefined') ? half1Index : 0;
  half2Index = (typeof half2Index !== 'undefined') ? half2Index : 0;

  // base case we've hit the end of shuffledDeck
  if(shuffledDeckIndex === shuffledDeck.length) {
    return true;
  }

  // if we still have cards in half1
  // and the top card of half1 is the same
  // as the top card of shuffledDeck
  if ((half1Index < half1.length) &&
      (half1[half1Index] === shuffledDeck[shuffledDeckIndex])) {
    half1Index++;
  } else if ((half2Index < half2.length) && 
    (half2[half2Index] === shuffledDeck[shuffledDeckIndex])){
    half2Index++;
  } else {
    return false;
  }
  shuffledDeckIndex++;
  return isSingleRiffle(half1, half2, shuffledDeck, shuffledDeckIndex, half1Index, half2Index);
}