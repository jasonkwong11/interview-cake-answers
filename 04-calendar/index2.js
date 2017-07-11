function mergeRanges(meetingTimes) {
  /*
  1. Sort the meetingTimes by startTime
  2. iterate through the meetingTimes

  if meetingTimes[i + 1].startTime is less than or equal to
  meetingTimes[i].endTime, then set meetingTimes[i].endTime
  to meetingTimes[i + 1]'s endTime

  else

  push the current meetingTime into the new array
  */

  let sortedMeetings = meetingTimes.slice().sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  });

  let merged = [sortedMeetings[0]];

  for (let i = 1; i < sortedMeetings.length; i++) {
    let current = sortedMeetings[i];
    let lastMergedMeeting = merged[merged.length-1]

    if (lastMergedMeeting.endTime >= current.startTime && current.endTime > lastMergedMeeting.endTime) {
      //merge the meetings
      lastMergedMeeting.endTime = current.endTime;
    } else {
      merged.push(current);
    }
  }
  return merged;
}

//Time Complexity: O(n)... one walk through the array to sort. another walk to 
//merge the meetings... O(log n) + O(n) ==> O(log n)

//Space complexity: O(n)... worst case scenario of creating a new array

var input = [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
]

console.log(mergeRanges(input));
