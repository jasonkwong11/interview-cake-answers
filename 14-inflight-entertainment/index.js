function canTwoMoviesFillFlight(movieLengths, flightLength) {

  //movie lengths we've seen so far

  var movieLengthsSeen = new Set();

  for (var i = 0; i < movieLengths.lengths; i++) {
    var firstMovieLength = movieLengths[i];

    var matchingSecondMovieLength = flightLength - firstMovieLength;
    if (movieLengthsSeen.has(matchingSecondMovieLength)) {
      return true;
    }

    movieLengthsSeen.add(firstMovieLength);
  }
  //we never found a match so return false
  return false;
}


//COMPLEXITY:
// O(n) time and O(n) space

//LESSON LEARNED:
// use a set to access our movies by length, in O(1) time.
//Using hash-based data structures, like objects or sets, is 
// SO COMMON in coding challenge solutions, it should always 
// be your first thought... Always ask yourself, right from the
// start: "Can I save time by using an object?"