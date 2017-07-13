var twoSum = function(nums, target) {
    //hash[number] = index
    let hash = {}
    
    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i]
        let complement = target - currentNum;
        if (hash[complement] !== undefined) { 
            return [hash[complement], i] 
        } else { 
            hash[currentNum] = i
        }
    }
};

// Time Complexity: O(n)... one pass through nums
// Space Complexity O(1)... constant number of variables