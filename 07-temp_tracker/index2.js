/*
Write a class TempTracker with these methods:

insert()—records a new temperature
getMax()—returns the highest temp we've seen so far
getMin()—returns the lowest temp we've seen so far
getMean()—returns the mean ↴ of all temps we've seen so far
getMode()—returns a mode ↴ of all temps we've seen so far
Optimize for space and time. Favor speeding up the getter functions getMax(), getMin(), getMean(), and getMode() over speeding up the insert() function.

Temperatures will all be inserted as integers. We'll record our temperatures in Fahrenheit, so we can assume they'll all be in the range 0..1100..110.

If there is more than one mode, return any of the modes.
*/

function TempTracker () {

  //for mode: 
  this.occurences = [];
  for (var i = 0; i < 111; i++) {
    this.occurences[i] = 0;
  }
  this.maxOccurrences = 0;
  this.mode = null;

  //for mean
  this.tempsSum = 0;
  this.tempsCount = 0
  this.mean = null;

  //for min and max
  this.currentMax = null
  this.currentMin = null
}

TempTracker.prototype.insert = function(temp) {
  // for mode:
  this.occurences[temp]++;
  if (this.occurences[temp] > this.maxOccurrences) {
    this.mode = temp;
    this.maxOccurrences = this.occurences[temp];
  }

  // for mean:
  this.tempsCount += 1
  this.tempsSum += temp
  this.mean = this.tempsSum / this.tempsCount;

  //for min/Max
  if (this.currentMax == null || temp > this.currentMax) {this.currentMax = temp}
  if (this.currentMin == null || temp < this.currentMin) {this.currentMin = temp}
}

TempTracker.prototype.getMax = function() {
  return this.currentMax
}

TempTracker.prototype.getMin = function() {
  return this.currentMin
}

TempTracker.prototype.getMean = function() {
  return this.mean
}

TempTracker.prototype.getMode = function() {
  return this.mode;
}

//Time Complexity: O(1) for each function
// O(1) space for each input
// our range of possible temps in this case 0-110


