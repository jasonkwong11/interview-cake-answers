let node = {
  data: 3,
  rightChild: null,
  leftChild: null
}

let bst ={
  data: 6,
  rightChild: {
    data: 8,
    leftChild: null,
    rightChild: null
  },
  leftChild: {
    data: 1,
    rightChild: {
      data: 4,
      rightChild: null,
      leftChild: null
    },
    leftChild: null
  }
}

// Time and Space cost of Binary Search Tree:
// Space:   O(n)...  Time:  O(log n)

// find or add a new node to a bst

function findOrAdd(currentNode, newNode){
  if(currentNode.data == newNode.data){
    return true
  }

  if(newNode.data < currentNode.data){
    if(currentNode.left){
      return findOrAdd(currentNode.left, newNode)
    } else {
      console.log(currentNode)
      return currentNode.left = newNode
    }
  }

  if(newNode.data > currentNode.data){
    if(currentNode.right){
      return findOrAdd(currentNode.right, newNode)
    } else {
      console.log(currentNode)
      return currentNode.right = newNode
    }
  }
}

// print the nodes of a bst in order
function inOrder(currentNode){
  if(currentNode.leftChild){
    inOrder(currentNode.leftChild)
  }
  console.log(currentNode.data)

  if(currentNode.rightChild){
    inOrder(currentNode.rightChild)
  }
}

// return the maximum value of a bst:
function max(currentNode) {
  if(currentNode.rightChild){
    return max(currentNode.rightChild)
  } else {
    console.log(currentNode.data);
    return currentNode.data
  }
}

// return the minimum value of a bst:
function min(currentNode) {
  if(currentNode.leftChild) {
    return min(currentNode.leftChild)
  } else {
    console.log(currentNode.data)
    return currentNode.data;
  }
}
