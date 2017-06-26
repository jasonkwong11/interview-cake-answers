function reverse(string){
  
  var stringArray = string.split("");

  var startIndex = 0;
  var endIndex = stringArray.length - 1;

  while (startIndex < endIndex) {
    //swap characters
    var temp = stringArray[startIndex];
    stringArray[startIndex] = stringArray[endIndex];
    stringArray[endIndex] = temp;

    //move toward middle:
    startIndex++
    endIndex++
  }

  return stringArray.join('')
}

//Complexity: O(n) time ... O(1) space
