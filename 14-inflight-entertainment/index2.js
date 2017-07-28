function movieTimes(flight_length, movie_lengths) {
 
  let movieLengthsSeen = new Set();
  
  for (var i = 0; i < movie_lengths.length; i++) {
    var firstMovieLength = movie_lengths[i];
    let complementMovieLength = flight_length - firstMovieLength

    if (movieLengthsSeen.has(complementMovieLength)) {
      return true
    }
    movieLengthsSeen.add(firstMovieLength)
  }
  return false
}