function getClosingParen(sentence, openingParenIndex) {
  var openNestedParens = 0;

  for (var position = openingParenIndex + 1; position < sentence.length; position++) {
    var char = sentence[position];

    if (char === '(') {
      openNestedParens += 1;
    } else if (char === ')') {
      if (openNestedParens === 0) {
        return position;
      } else {
        openNestedParens -= 1;
      }
    }
  }

  throw new Error('No closing parenthesis');
}


//Complexity:
// O(n) time, where n is the number of chars in the string.
// O(1) space.

// The trick to many "parsing" questions like this is using
// a stack to track which brackets /phrases/etc are 'open'
// as you go

// So next time you get a parsing question, one of your 
// first thoughts should be "use a stack"

// In this problem we can realize our stack would only hold
// '(' characters. So instead of storing each of those
// characters in a stack, we can store the NUMBER of items
// our stack would be holding. Gets O(n) => O(1)
