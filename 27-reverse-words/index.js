  function reverseWords(message) {

    var messageArray = message.split('');

    // first we reverse all the characters in the entire messageArray
    reverseCharacters(messageArray, 0, messageArray.length - 1);
    // this gives us the right word order
    // but with each word backwards

    // now we'll make the words forward again
    // by reversing each word's characters

    // we hold the index of the *start* of the current word
    // as we look for the *end* of the current word
    var currentWordStartIndex = 0;
    for (var i = 0; i <= messageArray.length; i++) {

        // found the end of the current word!
        if (i === messageArray.length || messageArray[i] === ' ') {

            // if we haven't exhausted the string our
            // next word's start is one character ahead
            reverseCharacters(messageArray, currentWordStartIndex, i - 1);
            currentWordStartIndex = i + 1;
        }
    }

    return messageArray.join('');
}

function reverseCharacters(messageArray, startIndex, endIndex) {

    // walk towards the middle, from both sides
    while (startIndex < endIndex) {

        // swap the front char and back char
        var temp = messageArray[startIndex];
        messageArray[startIndex] = messageArray[endIndex];
        messageArray[endIndex] = temp;
        startIndex++;
        endIndex--;
    }
}


//COMPLEXITY: O(n) time and O(n) space.
// space cost comes from converting the message string
// into an array.

