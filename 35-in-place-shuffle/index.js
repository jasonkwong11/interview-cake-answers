function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(theArray) {
  // if it's 1 or 0 items, just return
  if (theArray.length <= 1) return;

  //walk through from beginning to end
  for (var indexWeAreChoosingFor = 0;
    indexWeAreChoosingFor < theArray.length - 1; indexWeAreChoosingFor++) {
    // choose a random not-yet-placed item to place there
    // (could also be the item currently in that spot)
    // must be an item AFTER the current item, because the stuff
    // before has all already been placed
    var randomChoiceIndex = getRandom(indexWeAreChoosingFor, theArray.length - 1);

    // place our random choice in the spot by swapping
    if (randomChoiceIndex !== indexWeAreChoosingFor) {
      var valueAtIndexWeChoseFor = theArray[indexWeAreChoosingFor];
      theArray[indexWeAreChoosingFor] = theArray[randomChoiceIndex];
      theArray[randomChoiceIndex] = valueAtIndexWeChoseFor;
    }
  }
}


// COMPLEXITY:
// O(n) time and O(1) space