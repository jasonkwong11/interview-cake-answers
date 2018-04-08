/*
QUESTION:

WRITE A FUNCTION TO FIND THE 2ND LARGEST
ELEMENT IN A BINARY SEARCH TREE.

Here's a sample binary tree node class:
*/

function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function (value) {
  this.left = new BinaryTreeNode(value);
  return this.left;
};

BinaryTreeNode.prototype.insertRight = function (value) {
  this.right = new BinaryTreeNode(value);
  return this.right;
}

/*
BREAKDOWN

Let's start by solving a simplified version of the 
problem and see if we can adapt our approach
from there.

How would we find the largest element in a BST?

A reasonable guess is to say the largest element
is simply the "rightmost" element.

So maybe we can start from the root and just step
down right child pointers until we can't anymore
(until the right child is null). At that point
the current node is the largest in the whole tree.

Is this sufficient? We can prove it is by contradiction:

If the largest element were not the 'rightmost', then
the largest element would either:

1. be in some ancestor node's left subtree, or
2. have a right child.

But each of these leads to a contradiction:

1. If the node is in some ancestor node's left subtree
it's smaller than that ancestor node, so it's not the
largest.

2. If the node has a right child that child is larger
than it, so it's not the largest.

So the "rightmost" element must be the largest

How would we formalize getting the 'rightmost' element
in code?

WE can use a simple recursive approach. At each step:

1. If there is a right child, that node and the subtree
below it are all greater than the current node. So step
down to this child and recurse.

2. Else there is no right child and we're already at the
'rightmost' element, so we return it's value.
*/

function findLargest(rootNode) {
  if (!rootNode) {
    throw new Error('Tree must have at least 1 node');
  }

  if (rootNode.right) {
    return findLargest(rootNode.right)
  }

  return rootNode.value;
}

/*
Okay, so we can find the largest element. How can we
adapt this approach to find the second largest element?
*/






