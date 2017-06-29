function getPermutations(string) {
  //base case:
  if (string.length <= 1) {
    return new Set(string);
  }

  var allCharsExceptLast = string.slice(0, -1);
  var lastChar = string[string.length - 1];

  //recursive call: get all possible permutations
  //for all chars except last:
  var permutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast);

  // put the last char in all possible positions 
  // for each of the above permutations

  var permutations = new Set();

  permutationsOfAllCharsExceptLast.forEach(function(permutationsOfAllCharsExceptLast) {
    for (var position = 0; position <= allCharsExceptLast.length; position++) {
      var permutation = permutationsOfAllCharsExceptLast.slice(0, position) + lastChar + permutationsOfAllCharsExceptLast.slice(position);
      permutations.add(permutation);
    }
  });

  return permutations;
}

