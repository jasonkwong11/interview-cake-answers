function WordCloudData(inputString) {
  this.wordToCounts = new Map();
  this.populateWordsToCounts(inputString);
}

WordCloudData.prototype.populateWordsToCounts = function(inputString) {
  // iterates over each character in the input
  // string, splitting words and passing them 
  // to this.addWordToMap()
  var currentWord = '';

  for (var i = 0; i < inputString.length; i++) {
    var character = inputString.charAt(i);

    // if we reached the end of the string we check
    // if the last character is a letter and add the
    // last word to our map:
    if (i === inputString.length - 1) {
      if (this.isLetter(character)) currentWord += character;
      if (currentWord.length) this.addWordToMap(currentWord);
    // if we reach a space or emdash we know we're at
    // the end of a word so we add it to our map and
    // reset our current word
    } else if (character === ' ' || character === '\u2014') {
      if (currentWord.length) this.addWordToMap(currentWord);
      currentWord = '';

    // we want to make sure we split on ellipses so if we
    // get two periods in a row we add the current word to
    // our map and reset our current word
    } else if (character === '.') {
      if (i < inputString.length - 1 && inputString.charAt(i + 1) === '.') {
        if (currentWord.length) this.addWordToMap(currentWord);
        currentWord = '';
      }
    // if the character is a letter or an apostrophe,
    // we add it to our current word
    } else if (this.isLetter(character) || character === '\'') {
      currentWord += character;

    // if the character is a hyphen, we want to check if
    // it's surrounded by letters. if it is, we
    // add it to our current word
    } else if (character === '-') {
      if (i > 0 && this.isLetter(inputString.charAt(i - 1)) &&
        this.isLetter(inputString.charAt(i + 1))) {
        currentWord += character
      }
    }
  }
};

WordCloudData.prototype.addWordToMap = function(word) {
  var newCount;

  // if the word is already in the map we increment its count
  if (this.wordToCounts.has(word)) {
    newCount = this.wordToCounts.get(word) + 1;
    this.wordToCounts.set(word, newCount);
  }

  // if a lowercase version is in the map, we know our input
}

