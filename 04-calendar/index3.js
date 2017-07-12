

var input = [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
]


var result = [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 8},
    {startTime: 9,  endTime: 12},
]
/*
  Plan:
    1. Check for at least there's at least one meeting time
      b. Sort the input array by startTime.
    2. create a merged array and push in the first meetingTime
    3. Iterate through the array, for each one if the lastMergedMeeting's endTime is
    greater than the current meeting's start time && lastmergedMeeting's endTime is 
    less than currentMeeting's endtime... set lastMergedMeeting.endTime to currentmeeting.endtime
    4. 
*/

function mergeRanges(meetingsTimes) {
  if(meetingsTimes.length < 1) {throw new Error('need at least one meeting')}

  let sortedMeetings = meetingsTimes.slice().sort((a, b) => {
    return a.startTime < b.startTime ? -1 : 1
  })

  let merged = [sortedMeetings[0]]

  for (let i = 1; i < sortedMeetings.length; i++) {
    let lastMergedMeeting = merged[merged.length - 1];
    let currentMeeting = sortedMeetings[i]

    if (lastMergedMeeting.endTime >= currentMeeting.startTime && lastMergedMeeting.endTime < currentMeeting.endTime) {
      lastMergedMeeting.endTime = currentMeeting.endTime
    } else {
      merged.push(currentMeeting);
    }
  }
  return merged;
}

//Time complexity: O(log n)... because you have of the sort: specifically O(log n) + O (n)
// Space complexity: O(n) ... worst case scenario the new array needs to hold all meetings






console.log(mergeRanges(input))