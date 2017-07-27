function findLargest(rootNode) {
  if(!rootNode) {
    throw new Error('Tree must have at least 1 node')
  }
2
  if (rootNode.right) {
    return findLargest(rootNode.right);
  }
  return rootNode.value;
}

function findSecondLargest(rootNode) {
  if(!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('Tree must have at least 2 nodes!');
  }

  //case: we're currently at the largest, and largest
  // has a left subtree, so 2nd largest is the largest
  // in said subtree

  if(rootNode.left && !rootNode.right) {
    return findLargest(rootNode.left);
  }

  //case: we're at parent of largest and largest
  //has no left subtree, so 2nd largest must be
  // current node
  if (rootNode.right && 
    !rootNode.right.left &&
    !rootNode.right.right) {
    return rootNode.value;
  }
  //otherwise: step right