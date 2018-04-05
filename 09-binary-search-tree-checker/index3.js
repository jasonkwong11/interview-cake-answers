/*

Write a function to check that a binary tree
is a valid binary search tree.

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

BREAKDOWN:

One way to break the problem down is to come up
with a way to confirm that a single node is in
a valid place relative to its ancestors. Then if
every node passes this test, our whole tree is
a valid BST.

What makes a given node 'correct' relative to
its ancestors in a BST? Well, it must be
greater than any node it is in the right
subtree of, and less than any node it is in
the left subtree of.

So we could do a walk through our binary tree,
keeping track of the ancestors for each node
and whether the node should be greater than or less than
each of them.

If each of these greater than or less than relationships
hold true for each node, our BST is valid.

The simplest ways to traverse the tree are depth-first
and breadth-first. They have the same time cost
(they each visit each node once). 

Depth-first traversal of a
tree uses memory proportional to the depth of the tree, while
breadth-first traversal uses memory proportional to the
breadth of the tree (how many nodes there are on the level
that has the most nodes).

Because the tree's breadth can as much as double each time
it gets one level deeper, depth-first traversal is likely
to be more space-efficient than breadth-first traversal,
though they are strictly both O(n) additional space in the
worst case. 

The space savings are obvious if we know our
binary tree is balanced - its depth will be O(lg n) and its
breadth will be O(n).

But we're not just storing the nodes themselves in memory,
we're also storing the value from each ancestor and
whether it should be less than or greater than the given
node. Each node has O(n) ancestors(O(lg n) for balanced
binary tree), so that gives us O(n^2) additional memory
cost O(n lg n) for a balanced binary tree. We can do better.


Let's look at the inequalities we'd need to store
for a given node:

Notice that we would end up testing that blue node
<20, <30, and < 50.

So instead of storing each ancestor, we can just keep
track of a lowerBound and upperBound that our 
node's value must fit inside.


SOLUTION:

We do a depth first walk through the tree, testing
each node for validity as we go. 

A given node is
valid if it's greater than all the ancestral nodes 
in the right sub-tree of and less than all the ancestral
nodes of it's in the left-subtree of.

Instead of keeping track of each ancestor to check
these inequalities, we just check the largest number it
must be greater than (its lowerBound) and the smallest
number it must be less than (its upperBound)
*/

function isBinarySearchTree(treeRoot) {
  //start at the root, with an arbitrarily low lowerbound
  // and an arbitrarily high upperbound
  var nodeAndBoundsStack = [];
  nodeAndBoundsStack.push({node: treeRoot, lowerBound: -Infinity, upperBound: Infinity});

  //depth-first traversal
  while (nodeAndBoundsStack.length) {
    var nodeAndBounds = nodeAndBoundsStack.pop();
    var node = nodeAndBounds.node,
    lowerBound = nodeAndBounds.lowerBound,
    upperBound = nodeAndBounds.upperBound;

    // if this node is invalid, we return false right away
    if (node.value <= lowerBound || node.value >= upperBound) {
      return false;
    }

    if (node.left) {
      //this node must be less than the current node
      nodeAndBoundsStack.push({node: node.left, lowerBound: lowerBound, upperBound: node.value});
    }

    if (node.right) {
      //this node must be greater than the current node
      nodeAndBoundsStack.push({node: node.right, lowerBound: node.value, upperBound: upperBound})
    }
  }

  // if none of the nodes were invalid, return true
  // (at this point we have checked all nodes)
  return true;
}
/*
Instead of allocating a stack ourselves, we could write a recursive function
that uses the call stack. This would work, but it would be vulnerable to
stack overflow. However the code does end up quite bit cleaner:
*/

function recursiveIsBinarySearchTree(treeRoot, lowerBound, upperBound){
  lowerBound = (typeof lowerBound !== 'undefined') ? lowerBound : -Infinity;
  upperBound = (typeof upperBound !== 'undefined') ? upperBound : Infinity;

  // base case, no more nodes in the stack
  if (!treeRoot) { return true; }

  // not valid BST
  if (treeRoot.value >= upperBound || treeRoot.value <= lowerBound) {
    return false;
  }

  return isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value) &&
  isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound);
}

/*
Checking if an in order traversal of the tree is sorted is a great
answer too, especially if you're able to implement it without storing
a full list of nodes

COMPLEXITY:

O(n) time and O(n) space.

The time cost is easy: for valid binary search trees, we'll ahve to check
all n nodes.

Space is a little more complicated. Because we're doing a depth first
search, nodeAndBoundsStack will hold at most d nodes where d is the 
depth of the tree (the number of levels in the tree from the root
down to the lowest node). So we could say our space cost is O(d).

But we can also relate d to n. In a balanced tree, d is log2n. And the
more unbalanced the tree gets, the closer d gets to n.

In the worst case, the tree is a straight line of right children
from the root where every node in that line also has a left child.
... the traversal will walk down the line of right children,
adding a new left child to the stack at each step.
... when the traversal hits the rightmost node, the stack will
hold half of the total n total nodes in the tree. 
... half of n is O(n), so our worst case space cost is O(n)

WHAT we learned:
We could think of this as a greedy approach. we start off by trying
to solve the problem in just one walk through the tree. So we ask
oursleves what values we need to track in order to do that.
...Which leads us to our stack that tracks upper and lower bounds.

We could also think of this as a sort of 'divide and conquer' approach.
The idea in general behind divide and conquer is to break the problem
down into two or more subproblems, solve them, and then use that
solution to solve the original problem.

In this case, we're dividing the problem into subproblems by saying,
"This tree is a valid binary search tree if the left subtree is valid
and the right subtree is valid" This is more apparent in the
recursive formulation of the answer above.

Of course it's just fine that our approach could be thought of 
greedy or thought of as divide and conquer. It can be both. The point
here isn't to create strict categorizations so we can 
debate whether or not something 'counts' as divide and conquer.

Instead the point is to recognize the underlying patterns behind
algorithms, so we can get better at thinking through problems.

Sometimes we'll have to smoosh together two or more different patterns
to get our answer.
*/

