function sortScores(unorderedScores, highestPossibleScore) {

  //array of 0s at indices 0..highestPossibleScore
  var scoreCounts = [];
  for (var i = 0; i < highestPossibleScore + 1; i++) {
    scoreCounts.push(0)
  }

  //populate scoreCounts
  unorderedScores.forEach((score) => {
    scoreCounts[score]++;
  });

  //populate the final sorted array
  var sortScores = [];

  //for each item in scoreCounts
  for (var score = highestPossibleScore; score >= 0; score--) {
    var count = scoreCounts[score];

    // for the number of times the item occurs
    for (var time = 0; time < count; time++) {
      sortScores.push(score);
    }
  }

  return sortedScores;
}

//Complexity: O(n) time and O(n) space, where n is number of scores

