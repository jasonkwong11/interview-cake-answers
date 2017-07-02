// Think of the array as a linked list
// the value of the integer is the value of the node.

// the next pointer is the value-th element in the array

//Solution: 

//Pattern 1: the last node never has any incoming pointers.

// this makes sense- since the array has a length n + 1
// and all the values are n or less, there can never be
// a pointer to the last position.
// if n is 5, the length of the array is 6, but there
// can't be a value 6 so no pointer will ever point to the
// 6th node. Since it has no incoming pointers, we should
// treat the last position in our array as the "head"
// of our linked list

// Pattern 2: There's never an end to our list:
// No pointer ever points to null. Every node as a
// value in the range 1..n, so every node points
// to another node(or to itself)

// Since the list goes on forever, it must have
// a cycle(a loop). 

// The first node in the cycle always has 
// at least two incoming pointers

// How can we make sure we've gotten inside our cycle?
// Well there has to be a cycle in our list, and at
// the latest, the cycle is just the last node we hit
// as we traverse the list from the head:
// so we can just start at the head and walk n steps
// by then we'll have to be inside a cycle

// General Strategy:
//A.) we know the position of a node with multiple 
//incoming pointers is a duplicate in our array because
// the nodes that pointed to it must have the same value

//B.) We find a node with multiple incoming pointers by 
// finding the first node in a cycle

//C.) We find the first node in a cycle by finding the 
// length of the cycle and advancing two pointers:
// one starting at the head of the linked list,
// and the other starting ahead as many steps as there are steps
// in the cycle. The pointers will meet at the first node
// in the cycle

//D.) we find the lenght of a cycle by remembering a position
// inside the cycle and counting the number of steps it takes
// to get back to that position.

//E.) We get inside a cycle by starting at the head and walking
// n steps. We know the head of the list is at position n + 1

function findRepeat(intArray) {
  const n = intArray.length - 1;

  //Step 1: get inside a cycle
  //start at position n + 1 and walk n steps to
  // find a position guarenteed to be in a cycle
  var positionInCycle = n + 1;
  for (var i = 0; i < n; i++) {
    positionInCycle = intArray[positionInCycle - 1];
  }

  //Step 2: find the length of the cycle
  //find the length of the cycle by remembering a position
  // in the cycle and counting the steps it takes
  // to get back to that position.
  const rememberedPositionInCycle = positionInCycle;
  var currentPositionInCycle = intArray[positionInCycle - 1]; // 1 step ahead
  var cyclesStepCount = 1;

  while (currentPositionInCycle !== rememberedPositionInCycle) {
    currentPositionInCycle = intArray[currentPositionInCycle - 1];
    cyclesStepCount += 1;
  }

  // Step 3: find the first node of the cycle:
  // start two pointers:
  // 1: at position n + 1
  // 2: ahead of position n + 1 as many steps as the cycle's length
  // these two pointers form our stick

  var pointerStart = n + 1;
  var pointerAhead = n + 1;
  for (var i = 0; i < cyclesStepCount; i++) {
    pointerAhead = intArray[pointerAhead - 1];
  }

  // advance until the pointers are in the same position
  // which is the first node in the cycle
  while (pointerStart !== pointerAhead) {
    pointerStart = intArray[pointerStart - 1];
    pointerAhead = intArray[pointerAhead - 1];
  }

  // since there are multiple values pointing to the
  // first node in the cycle, its position is a duplicate
  // in our array
  return pointerStart;
}
// Complexity: O(n) time and O(1) space
// Our space cost is O(1) because all of our additional
//variables are integers, which take constant space

//for our runtime, we iterate over the array a constant
//number of times and each iteration takes O(n) time
// in it's worst case... so we traverse the linked list
// more than once, but it's still a constant number
// of times -- about 3

