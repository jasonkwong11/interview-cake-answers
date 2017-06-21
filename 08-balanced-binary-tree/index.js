function isBalanced(treeRoot) {
  // a tree with no nodes is superbalanced,
  // since there are no leaves!
  if (!treeRoot) {
    return true;
  }

  // we short-circuit as soon as we find more than 2
  var depths = [];

  //nodes will store pairs of a node and the node's depth
  var nodes = [];
  nodes.push([treeRoot, 0]);

  while (nodes.length) {

    //pop a node and it's depth from the top of our stack
    var nodePair = nodes.pop();
    var node = nodePair[0],
      depth = nodePair[1];

    //case: we found a leaf because there's no
    //left and no right children
    if (!node.left && !node.right) {

      // we only care if it's a new depth
      if(depths.indexOf(depth) < 0) {
        depths.push(depth);

        // two ways we might now have an unbalanced tree:
        // 1) more than 2 different leaf depths
        // 2) 2 leaf depths
        if ((depths.length > 2) ||
              (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
          return false;
        }
      } 
      // this isn't a leaf: keep stepping down
      // and increment depth by 1
    } else {
      if (node.left) {
        nodes.push([node.left, depth + 1]);
      }
      if (node.right) {
        nodes.push([node.right, depth + 1]);
      }
    }
  }
  return true
}

//Complexity: O(n) time and O(n) space
// For time, the worst case is the tree is balanced
// and we have to iterate over all n nodes to make sure

// For the space cost, we have two data structures to watch: depths and nodes
// depth will never hold more than 3 elements so 
// we can write that off as O(1)

// because we're doing depth-first search, nodes will
// hold at most d nodes where d is the depth of the tree
// the number of levels in the tree from the root node
// down to the lowest node..you can say space is O(d)