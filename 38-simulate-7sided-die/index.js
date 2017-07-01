function rand7Table() {
  var results = [
    [1, 2, 3, 4, 5],
    [6, 7, 1, 2, 3],
    [4, 5, 6, 7, 1],
    [2, 3, 4, 5, 6],
    [7, 0, 0, 0, 0],
  ];
  while (true){
    // do our die rolls
    var row = rand5() - 1;
    var column = rand5() - 1;
    // case: we hit an extraneous outcome
    // so we need to re-roll:
    if (row === 4 && column > 0) {
      continue;
    }
    // our outcome was fine. return it!
    return results[row][column];
  }
}
//COmplexity: worst case: time O(infinite). space: O(n^2)

// SOLUTION USING MATH:

function rand7() {
  while (true) {
    // do our die rolls
    var roll1 = rand5();
    var roll2 = rand5();

    var outcomeNumber = (roll1 - 1) * 5 + (roll2 - 1) + 1;

    // if we hit an extraneous
    // outcome we just re-roll
    if (outcomeNumber > 21) continue;

    // our outcome was fine. return it!
    return outcomeNumber % 7 + 1;
  }
}

//COmplexity: worst case: O(infinite) and O(1) space
