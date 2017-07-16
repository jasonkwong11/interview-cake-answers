/*
Write a function to see if a binary tree is
"superbalanced" (a new tree property we made up)

A tree is superbalanced if the difference between
the depths of any two leaf nodes is no greater
than one.

Rephrase that as:
  1. "The difference between the min leaf depth
  and the max leaf depth is 1 or less"

  2. "there are at most two distinct leaf depths,
  and they are at most 1 apart"

So we should do depth-first search because it would let us
hit our leaves earlier, which allows us to short
circuit earlier in some cases
*/

function isBalanced(treeRoot) {
  // a tree with no nodes is superbalanced, since
  // there are no leaves!
  if (!treeRoot) {
    return true;
  }

  var depths = []; // we short-circuit as soon as we
  // find more than 2

  //stack will store pairs of a node and the node's depth
  var stack = [];
  stack.push([treeRoot, 0]);

  while (stack.length) {
  //pop a node and its depth from the top of our stack
    var nodePair = stack.pop();
    var node = nodePair[0],
      depth = nodePair[1];

    //case: we found a leaf:
    if (!node.left && !node.right) {
      //we only care if it's a new depth:
      if (depths.indexOf(depth) < 0) {
        depths.push(depth);

        //two ways we might now have an unbalanced
        //tree: 1) more than 2 different leaf depths
        //2) 2 leaf depths that are more than 1 apart

        if ((depths.length > 2) ||
          (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
          return false;
        }
      }
      // case: this isn't a leaf -- keep stepping down
    } else {
      if (node.left) {
        stack.push([node.left, depth + 1]);
      }
      if (node.right) {
        stack.push([node.right, depth + 1]);
      }
    }
  }
  return true
}
