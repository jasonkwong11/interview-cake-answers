function TempTracker() {
  
  //for mode
  this.occurences = []; // array of 0s at indices 0..110
  for (let i = 0; i < 111; i++) {
    this.occurences[i] = 0;
  }
  this.maxOccurences = 0;
  this.mode = null;

  // for mean:
  this.totalNumbers = 0;
  this.totalSum = 0;
  this.mean = null;

  // for min and max
  this.minTemp = null;
  this.maxTemp = null;
}

TempTracker.prototype.insert = function(temperature) {
  // for mode
  this.occurence[temperature]++;
  if (this.occurences[temperature] > this.maxOccurences) {
    this.mode = temperature;
    this.maxOccurences = this.occurences[temperature];
  }

  //for mean
  this.totalNumbers++;
  this.totalSum += temperature;
  this.mean = this.totalSum / this.totalNumbers;

  // for min and max
  if (this.maxTemp === null || temperature > this.maxTemp) {
    this.maxTemp = temperature;
  }

  if (this.minTemp === null || temperature < this.minTemp) {
    this.minTemp = temperature;
  }
};

// note: we don't actually need these since we have the
// properties: we can just do TempTracker.mean;
// we'll leave them here because the question asked
// for them:

TempTracker.prototype.getMax = function() {
  return this.maxTemp;
};

TempTracker.prototype.getMin = function() {
  return this.minTemp;
};

TempTracker.prototype.getMean = function() {
  return this.mean;
}

TempTracker.prototype.getMode = function() {
  return this.mode;
}

//Complexity: O(1) time for each function
// and O(1) space related to input!
// (Our occurrences array's size is bounded
// our range of possible temps, in this case 0-110)

module.exports = tempTracker;
