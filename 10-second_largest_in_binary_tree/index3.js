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

Our first thought might be, "it's simply the parent of the largest element!
That seems obviously true when we imagine a nicely balanced tree like this one:

          ( 5 )
        /     \
      (3)     (8)
     /  \     /  \
   (1)  (4) (7)  (9)"

But what if the largest element itself has a left subtree?

.        ( 5 )
        /     \
      (3)     (8)
     /  \     /  \
   (1)  (4) (7)  (12)
                 /
               (10)
               /  \
             (9)  (11)


Here the parent of our largest is 8, but the second largest is 11.

So the second largest isn't necessarily the parent of the largest..
... back to the drawing board.

Wait. No. The second largest IS the parent the largest ...
IF THE LARGEST DOES NOT HAVE A LEFT SUBTREE. if we can handle the
case where the largest does have a left subtree, we can handle all
cases, and we have a solution.

So let's try sticking with this. How do we find the second largest
when the largest has a left subtree?

==> It's the largest item in that left subtree! We just wrote a function
for finding the largest element in a tree. We could use that here!

How would we code this up?
*/

function findLargest(rootNode) {
  if (!rootNode) {
    throw new Error('Tree must have at least 1 node');
  }

  if (rootNode.right) {
    return findLargest(rootNode.right);
  }

  return rootNode.value;
}

function findSecondLargest(rootNode) {
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('Tree must have at least 2 nodes');
  }
  //case: we're currently at largest, and largest has a left subtree,
  //so 2nd largest is largest in said subtree
  if (rootNode.left && !rootNode.right) {
    return findLargest(rootNode.left);
  }

  //case: we're at parent of largest, and largest has no left subtree,
  //so 2nd largest must be current node
  if (rootNode.right &&
      !rootNode.right.left &&
      !rootNode.right.right) {
    return rootNode.value;
  }

  // otherwise: step right
  return findSecondLargest(rootNode.right);
}

/*
Okay awesome. This'll work. It'll take O(h) time (where h is the height of the tree)
and O(h) space.

But that h space in the call stack is avoidable. How can we get this down to
constant space?

SOLUTION:

We start with a function for getting the largest value. The largest value is simply the 
"rightmost" one, so we can get it in one walk down the tree by traversing rightward
until we don't have a right child anymore:
*/

function findLargest(rootNode) {
  var current = rootNode;
  while (current) {
    if (!current.right) { return current.value };
    current = current.right;
  }
}

/*
With this in mind, we can also find the second largest in one walk down the tree.
At each step, we have a few cases:

1. If we have a left subtree but not a right subtree, then the current node
is the largest overall (the 'rightmost') node. The second largest element
must be the largest element in the left subtree. We use our findLargest()
function above to find the largest in that left subtree.

2. If we have a right child, but that right child doesn't have any children,
then the right child must be the largest element and our current node must
be the second largest element.

3. Else, we have a right subtree with more than one element, so the largest
and second largest are somewhere in that subtree. So we step right.

*/
function findLargest(rootNode) {
  var current = rootNode;
  while (current) {
    if (!current.right) {return current.value}
      current = current.right;
  }
}

function findSecondLargest(rootNode) {
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('Tree must have at least 2 nodes');
  }

  var current = rootNode;

  while (current) {
    //case: current is largest and has a left subtree
    // 2nd largest is the largest in that subtree
    if (current.left && !current.right) {
      return findLargest(current.left);
    }

    //case: current is the parent of largest, and largest has no children
    // so current is 2nd largest
    if (current.right &&
        !current.right.left &&
        !current.right.right) {
      return current.value
    }

    current = current.right;
  }
}

/*
COMPLEXITY:

We're doing one walk down our BST, which means O(h) time, where h is the
height of the tree (again, that's O(lg n) if the tree is balanced, 
O(n) otherwise). 

O(1) space.

WHAT WE LEARNED:

Here we used a "simplify, solve, and adapt" strategy.

The question asks for a function to find the second largest element in 
a BST, so we started off by simplifying the problem: we thought about how
to find the first largest element.

Once we had a strategy for that, we adapted that strategy to work for finding
the second largest element.

It may seem counter-intuitive to start off by solving the wrong question.
But starting off with a simpler version of the problem is often much faster,
because it's easier to wrap our heads around right away.

One more note about this one:

Breaking things down into cases is another strategy that really helped us here.

Notice how simple finding the second largest node got when we divided it into
two cases:

1. The largest node has a left subtree.
2. The largest node does not have a left subtree.

Whenever a problem is starting to feel complicated, try breaking it down into cases.

It can be really helpful to actually draw out sample inputs for those cases. This'll
keep your thinking organized and also help get your interviewer on the same page.
*/




