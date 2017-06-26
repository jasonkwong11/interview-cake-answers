function reversedLinkedList(firstNode) {
  var currentNode = firstNode;
  var previous = null;
  var nextNode = null;

  if (firstNode === null) {
    throw new Error('Must have at least one node')
  }

  if (firstNode.next === null) {
    return firstNode;
  }

  while(currentNode) {
    //save the next node or you lose it
    nextNode = currentNode.next;
    //reverse the pointer
    currentNode.next = previous;
    //increment previous to current node
    previous = currentNode;
    //increment node to next node or null at end of list
    currentNode = nextNode;
  }
  return previous; // Change the list head.
}

//Complexity:
// O(n) time... cost of traversing through the n nodes in list
// O(1) space... constant space for in place operation

// Pitfalls: may cause side effects with other code that
// points to this one.