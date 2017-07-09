function mergeArrays(myArray, alicesArray) {
  var mergedArray = [];

  var currentIndexAlice = 0;
  var currentIndexMine = 0;
  var currentIndexMerged = 0;

  while (currentIndexMerged < (myArray.length + alicesArray.length)) {
    
    var isMyArrayExhausted = currentIndexMine >= myArray.length;
    var isAliceArrayExhausted = currentIndexAlice >= alicesArray.length;
    
    // case: next item comes from my array
    // my array must not be exhausted, and EITHER:
    // 1.) Alice's array IS exhausted, or
    // 2.) the current element in my array is less
    // than the current element in Alice's array
    
    if (!isMyArrayExhausted && (isAliceArrayExhausted || (myArray[currentIndexMine] < alicesArray[currentIndexAlice]))) {
      mergedArray[currentIndexMerged] = myArray[currentIndexMine];
      currentIndexMine++
      // case: next item comes from alice's array
    } else {
      mergedArray[currentIndexMerged] = alicesArray[currentIndexAlice];
      currentIndexAlice++;
    }
    currentIndexMerged++
  }
  return mergedArray;
}

var myArray     = [3, 4, 6, 10, 11, 15, 22, 22, 24];
var alicesArray = [1, 5, 8, 12, 14, 19, 33];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]


// Complexity: O(n) time and O(n) additional space,
// where n is the number of items in the merged array

// the added space comes from allocating the mergedArray
// there's no way to do this 'in pace' because neither of our 
//input arrays are necessarily big enoguh to hold the merged array
