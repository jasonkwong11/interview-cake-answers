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
  // if a lowercase version is in the map, we know our input
  // but we only include uppercase words if they're always
  // uppercase so we just increment the lowecase version's count
  } else if (this.wordToCounts.has(word.toLowerCase())) {
    newCount = this.wordToCounts.get(word.toLowerCase()) + 1;
    this.wordToCounts.set(word.toLowerCase(), newCount);

  // if an uppercase version is in the map, we know our input
  // word must be lowercase. since we only include uppercase
  // words if they're always uppercase, we add the lowercase
  // version and give it the uppercase version's count:
  } else (this.wordToCounts.has(this.capitalize(word))) {
    newCount = this.wordToCounts.get(this.capitalize(word)) + 1;
    this.wordToCounts.set(word, newCount);
    this.wordToCounts.delete(this.capitalize(word));

    //otherwise the word is not in the map at all,
    // lowercase or uppercase so we add it to the map
  } else {
    this.wordToCounts.set(word, 1);
  }
};

WordCloudData.prototype.capitalize = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

WordCloudData.prototype.isLetter = function(character) {
  return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(character) >= 0;
}
