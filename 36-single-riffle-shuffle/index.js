function isSingleRiffle(half1, half2, shuffledDeck) {
  //base case
  if (shuffledDeck.length === 0) {
    return true;
  }

  // if the top of shuffledDeck is the same as the top of
  // half1 (making sure first that we have a top card in half1)

  if (half1.length && half1[0] === shuffledDeck[0]) {

    // take the top cards off half1 and shuffledDeck
    // and recurse
    return isSingleRiffle(half1.slice(1), half2, shuffledDeck.slice(1));

  // if the top of shuffledDeck is the same as the top
  // of half2
  } else if (half2.length && half2[0] === shuffledDeck[0]) {
    // take the top cards off half2 and shuffledDeck and recurse
    return isSingleRiffle(half1, half2.slice(1), shuffledDeck.slice(1));

  // top of shuffledDeck doesn't match top of half1 or half2
  // so we know it's not a single riffle
  } else {
    return false;
  }
}


