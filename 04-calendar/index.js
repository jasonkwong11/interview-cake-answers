// consider edge cases: 
// 1. the end time of the 
// first meeting and the start time of the second
// meeting are equal.
// eg: [{startTime: 1, endTime: 2}, {startTime: 2, endTime: 3}]

// 2. The second meeting ends before the first 
// meeting ends.
// eg: [{startTime: 1, endTime: 5}, {startTime: 2, endTime: 3}]

// High level plan:
// First, sort the input array of meetings by start time, so any
// meetings that might need to be merged are now next to each other

// Then walk through the sorted meetings from left to right. At each step:
// 1. We can merge the current meeting with previous, so we do.
// 2. We can't merge the current meeting with the previous one, so we know
// the previous meeting can't be merged with any future meetings and we 
// throw the current meeting into mergedMeetings

function mergeRanges(meetings) {
  // sort by start times
  let sortedMeetings = meetings.slice().sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  });

  let mergedMeetings = [sortedMeetings[0]];

  for (let i = 1; i < sortedMeetings.length; i++) {
    let currentMeeting = sortedMeetings[i];
    let lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];

    // if the current and the last meetings overlap, use the
    // latest end time:
    if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
      lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);
    } else {
      mergedMeetings.push(currentMeeting);
    }
  }
  return mergedMeetings;
}

// COMPLEXITY:
// O(n log n) time.. because we sort it first even though we walk through array once
// O(n) space because this is worst case scenario of creating new array

module.exports = mergeRanges;
