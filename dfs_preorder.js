function preorderSearch(node) {

  //Check that a node exists

  if(node === null) {
    return;
  }

  //Print the data of the node.
  console.log(node.data);

  //Pass in a reference to the left child to preorderSearch.
  // Then, pass reference to the right child node to preorderSearch
  preorderSearch(node.left);
  preorderSearch(node.right);
}

