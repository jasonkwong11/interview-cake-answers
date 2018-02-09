/*
Given an array of integers, return indices of 
the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, 
and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

let nums = [9, 2, 11, 15, 7];
let target = 9;

function twoSums(nums, target) {
  /*
  high level plan:
    - initialize a hash that will include a collection
    of the numbers iterated through,
    matched with their indexes

    -iterate through the numbers: for each number
    check to see if its complement (targetNum - currentNum)
    is in the hash
      ... if so, return those two numbers in an array
      ... if not, add the current number to the hash
  */
  let hash = {};
  for (i = 0; i < nums.length; i++) {
    let currentNum = nums[i];
    let complement = target - currentNum;

    if (hash[complement] !== undefined) {
      return [hash[complement], i]
    } else {
      hash[currentNum] = i;
    }
  }
}

console.log(twoSums(nums, target))
