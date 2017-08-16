let node = {
  data: 4,
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

function findOrAdd(rootNode, newNode) {
  let currentNode = rootNode;
  if(newNode.data < rootNode.data) {
    currentNode = rootNode.leftChild
    if (currentNode) {
      findOrAdd(currentNode, newNode)
    } else {
      currentNode.leftChild = newNode;
    } 
  } else if (newNode.data > rootNode.data) {
    currentNode = rootNode.rightChild;
    if (currentNode) {
      findOrAdd(currentNode, newNode)
    } else {
      currentNode.rightChild = newNode;
    }
  }
}
