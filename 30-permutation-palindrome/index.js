function hasPalindromePermutation(theString) {

  // track characters we've seen an odd number of times
  var unpairedCharacters = new Set();

  for (var i = 0; i < theString.length; i++) {
    var char = theString[i];

    if (unpairedCharacters.has(char)) {
      unpairedCharacters.delete(char);
    } else {
      unpairedCharacters.add(char);
    }
  }
  // the string has a palindrome permutation if it
  // has one or zero characters without a pair
  return unpairedCharacters.size <= 1;
}
//Complexity: O(n) time since we're making one iteration
// through n characters in the string
// Our unpairedCharacters set is the only thing tkaking up
// non-constant space. 
//We could say our space cost is O(n)
// since the set of unique characters is less than or equal
// to n. 
//... but we could say there are only so many differnt chars
// the ASCII character set has just 128 different chars
// Might want to say our space complexity is O(k)
