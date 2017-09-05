/*
N = days of average home sale price data
K = window size, in days

For each window of K days, find the number of 
increasing subranges within the window minus
the number of decreasing subranges within the
window

Sample Input:
5 3
188930 194123 201345 154243 154243
*/

let window1 = [188930, 194123, 201345];

let cache = [0, 1, 3, 6, ]
//keep a running count of the points accrued at each index
// points at each index == index times the number of points at
// the previous index 

// idea2: find the continuous streak of increasing
// or decreasing numbers, then count the elems in that streak
// ... then use the triangle formula to find the points
// assign it to increasingCount/decreasingCount
// restart the streak from the next number

// if current == prev, then simply reset the streak to zero
// not adding to increasingC or decreasingCount

let window2 = [194123, 201345, 154243];
let window3 = [201345, 154243, 154243];


// window1: there are 3 increasing subranges:
// reversedWindow1 = [201345, 194123, 188930]

/*  1. [188930, 194123, 201345]
    2. [188930, 194123]
    3. [194123, 201345]
*/


/* window4 = [1, 2, 3, 4]
  1. [1, 2, 3, 4]
  2. [1, 2, 3]
  3. [1, 2]
  4. [2, 3, 4]
  5. [2, 3]
  6. [3, 4]

Sorted: 
  if 1 element ==> 0
  if 2 elements ==> 1
  if 3 elements ==> 3
  if 4 elements ==> 6
  if 5 elements ==> 

*/

/* Bottom Up:
let window2 = [1, 2]
  answer is 1

let window3 = [1, 2, 3]
  answer is 3
    1. [1, 2, 3]
    2. [1, 2]
    3. [2, 3]

let window4 = [1, 2, 3, 4]
  answer is 6 
    1. [1, 2, 3, 4]
    2. [1, 2, 3]
    3. [1, 2]
    4. [2, 3, 4]
    5. [3, 4]
    6. [2, 3]

*/



// window2: there is 1 increasing subrange and 1 decreasing:
/* so the answer is 0
// window3: there is 1 decreasing subrange and 0 increasing
// so the answer is -1

*/
/* Game Plan:
1. Find the windows: a contiguous range of K days
2. For each window:
  a.) Find the increasing subranges

*/



