function isValid(code) {

  var openersToClosers = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  var openers = new Set(['(', '[', '{']);
  var closers = new Set([')', ']', '}']);

  openersStack = [];

  for (var i = 0; i < code.length; i++) {
    var char = code.charAt(i);

    if (openers.has(char)) {
      openersStack.push(char);
    } else if (closers.has(char)) {
      if (!openersStack.length) {
        return false;
      } else {
        
        lastUnclosedOpener = openersStack.pop();
        // if this closer doesn't correspond to the most recently
        // seen unclosed opener, short-circuit, returning false
        if (openersToClosers[lastUnclosedOpener] != char) {
          return false;
        }
      }
    }
  }
  return openersStack.length === 0;
} 

//Complexity: O(n) time (one iteration through the string)
// and O(n) space ... in the worst case, all of our characters
// are openers, so we push them all onto the stack

let testString = "({[]})"
console.log(isValid(testString));
