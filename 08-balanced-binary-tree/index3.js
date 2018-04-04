/*

QUESTION: Write a function to see if a binary tree is "superbalanced" (a new 
tree property we just made up)

A tree is "superbalanced" if the difference between the depths of any
two leaf nodes is no greater than one.

Here's a sample binary tree node class:
*/
function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
  this.left = new BinaryTreeNode(value);
  return this.left;
}

BinaryTreeNode.prototype.insertRight = function(value) {
  this.right = new BinaryTreeNode(value);
  return this.right;
}

/*
BREAKDOWN

Sometimes it's good to start by rephrasing or 'simplifying' the problem.

The requirement of 'the difference between the depths of any two
leafs nodes is no greater than 1' implies that we'll have to compare
the depths of all possible pairs of leaves. That'd be expensive --
if there are n leaves, there are O(n^2) possible pairs of leaves.

But we can simply this requirement to require less work. For example,
we could equivalently say:

  - "This difference between the min leaf depth and max leaf depth is 1 or less"
  - "There are at most two distinct leaf depths, and they are at most 1 apart"

If you're having trouble with a recursive approach, try using an iterative one.

To get to our leaves and measure their depths, we'll have to traverse the tree
somehow. What methods do we know for traversing a tree?

Depth first and breadth first are common ways to traverse a tree. Which one
should we use here?

The worst-case time and space costs of both are the same - you could make a 
case for either.

But one characteristic of our algorithm is that it could short-circuit and return false
as soon as it finds two leaves with depths more than 1 apart. So maybe we should 
use a traversal that will hit leaves as quickly as possible...

DFS will generally hit leaves before BFS so lets go with that. How cold we write a 
depth first walk that also keeps track of our depth?

SOLUTION

We do a depth first walk through our tree, keeping track of the depth as we go. 
When we find a leaf, we add its depth to an array of depths if we haven't seen 
that depth already.

Each time we hit a leaf with a new depth, there are two ways that our tree might
now be unbalanced:

1. There are more than 2 different leaf depths
2. There are exactly 2 leaf depths and they are more than 1 apart.

Why are we doing a depth-first walk and not a breadth-first one? You could make a
case for either. We chose depth-first because it reaches leaves faster, which
allows us to short-circuit earlier in some cases.
*/

function isBalanced(treeRoot) {
  // a tree with no nodes is superbalanced, since there are no leaves!
  if (!treeRoot) {
    return true;
  }

  var depths = []; //we short circuit as soon as we find more than 2

  // nodes will store pairs of a node and the node's depth
  var nodes = [];
  nodes.push([treeRoot, 0]);

  while (nodes.length) {
    //pop a node and its depth from the top of our stack
    var nodePair = nodes.pop();
    var node = nodePair[0],
        depth = nodePair[1];

    // case: we found a leaf
    if (!node.left && !node.right) {
      // we only care if it's a new depth
      if (depths.indexOf(depth) < 0) {
        depths.push(depth);

        // two ways we might now have an unbalanced tree:
        // 1.) more than 2 different leaf depths
        // 2.) 2 leaf depths that are more than 1 apart
        if ((depths.length > 2) ||
            (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
          return false;
        }
      }
    // case: this isn't a leaf - keep stepping down
    } else {
      if (node.left) {
        nodes.push([node.left, depth + 1]);
      }
      if (node.right) {
        nodes.push([node.right, depth + 1]);
      }
    }
  }

  return true;
}

/*
COMPLEXITY:

O(n) time and O(n) space

For time, the worst case is the tree is balanced and we have to iterate
over all n nodes to make sure.

For the space cost, we have two data structures to watch: depths and nodes.

depths will never hold more than three elements, so we can write that off as O(1).

because we're doing a depth first search, nodes will hold at most d nodes where d
is the depth of the tree (the number of levels in the tree from the root
node down to the lowest node). so we could say our space cost is O(d)

but we can also relate d to n. in a balanced tree, d is O(log2(n)). and the
more unbalancd the ree gets, the closer d gets to n.

in the worst case, the tree is a straight line of right children from
the root where every node in the line also has a left child. the traversal
will walk down the line of right children, adding a new
left child to nodes at each step. when the traversal hits the rightmost node,
nodes will hold half of the n total nodes in the tree. half n is O(n), so
our worst space cost is O(n).

WHAT WE LEARNED:

This is an intro to some tree basics.

Focus on Depth first vs breadth first traversal. You should be
very comfortable with the differences between the two and the strengths
and weaknesses of each.

You should also be very comfortable coding each of them up.

ONE TIP: 

remember that breadth first uses a queue and depth first uses a stack
(could be the call stack or an actual stack object). thats not just 
a clue about implementation, it also helps with figuring out the 
differences in behavior. those differences come from whether we visit
nodes in the order we see them (first in, first out) or we visit the
last-seen node first (last-in, first out)


*/




