function rand7Table() {
  var results = [
    [1, 2, 3, 4, 5],
    [6, 7, 1, 2, 3],
    [4, 5, 6, 7, 1],
    [2, 3, 4, 5, 6],
    [7, 0, 0, 0, 0],
  ];
  // do our die rolls
  var row = rand5() - 1;
  var column = rand5() - 1;
  // case: we hit an extraneous outcome
  // so we need to re-roll:
  if (row === 4 && column > 0) {
    return rand7Table();
  }
  // our outcome was fine. return it!
  return results[row][column];
}

