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
function preorderSearch(node) {

  //Check that a node exists

  if(node === null) {
    return;
  }

  //Print the data of the node.
  console.log(node.data);

  //Pass in a reference to the left child to preorderSearch.
  // Then, pass reference to the right child node to preorderSearch
  preorderSearch(node.leftChild);
  preorderSearch(node.rightChild);
}

preorderSearch(bst)
