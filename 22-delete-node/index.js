function deleteNode(nodeToDelete) {
  // get the input node's next node, the one we
  // want to skip to

  var nextNode = nodeToDelete.next;

  if(nextNode) {
    // replace the input node's value and point with the next
    // node's value and pointer. the previous node now
    // effectively skips over the input node

    nodeToDelete.value = nextNode.value;
    nodeToDelete.next = nextNode.next;
  } else {
    throw new Error("Can't delete the last node with this method")
  }
}

//Potential problem: this doesn't work for deleting
// the last node in the list

// Side effects:
// 1. Any references to the input node have now effectively
// been reassigned to its next node.
// ... we deleted the node assigned to the variable b, but
// in actuality, we just gave it a new value and a new next!
// if we had another pointer to b somewhere else in our code
// and we were assuming it still had its old value(8), could cause bugs

//2. If there are pointers to the input node's original next node
// those pointers now point to a "dangling" node.
// which is a node that's no longer reachable by walking down our list

//Complexity:
// O(1) time and O(1) space
// In place place operations like this can save time/space,
// but they're risky. If you ever make inplace modifications
// in an interview, make sure you tell your interviewer 
// that in a real system, you'd carefully check for side effects
// in the rest of the code base

