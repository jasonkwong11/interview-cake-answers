function kthToLastNode(k, head) {
  var leftNode = head;
  var rightNode = head;

 //move rightNode to the kth node

 for (var i = 0; i < k - 1; i++) {
    rightNode = rightNode.next;
 }

 //starting with leftNode on the head,
 //move leftNode and rightNode down the list
 //maintaining a distance of k between them,
 // until rightNode hits the end of the list

 while (rightNode.next) {
    leftNode = leftNode.next;
    rightNode = rightNode.next;
 }

 // since leftNode is k nodes behind rightNode,
 // leftNode is now the kth to last node
 return leftNode;
}

//Slightly faster due to caching and other
//optimizations that modern processors and memory have

// Don't be fooled: "one pass" isn't always
// fewer steps than "two passes"
// Always ask yourself, "have i actually changed the number of steps?"