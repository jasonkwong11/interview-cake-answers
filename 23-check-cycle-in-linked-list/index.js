function LinkedListNode(value) {
  this.value = value;
  this.next = null;
}

// A cycle occurs when a node's next points back to a previous
// node in the list. The linked list is no longer linear
// with a beginning and end - instead it cycles through a loop of nodes

function containsCycle(firstNode) {
  //starts both runners at the beginning
  var slowRunner = firstNode;
  var fastRunner = firstNode;

  //until we hit the end of the list
  while (fastRunner && fastRunner.next) {
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;

    // case: fastRunner is about to "lap slowRunner"
    if (fastRunner === slowRunner) {
      return true
    }
  }

  //case fastRunner hits the end of the list
  return false;
}

//Complexity:
//O(n) time and O(1) space

// Worst case is when we do have a cycle, so we 
// dont return until fastRunner equals slowRunner
