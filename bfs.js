/* Game Plan:
  1. Print/get value of the root node value
  2. Take rootNode.left and push it in the queue
  3. Take rootNode.right and push it in the queue
  4. Take the first item in the queue, it's currentNode
  5. Print it, start from step 1
*/

var tree = [
    { left: 1, right: 2},
    { left: 3, right: 4},
    { left: 5, right: 6 },
    { left: 7, right: 8 },
    { left: 9, right: 10 },
    { left: 11, right: 12 },
    { left: 13, right: 14 }
];

function bfs(tree) {
  var queue = [];

  //enqueue root:
  queue.push(0);

  do {
    //for each node in the queue:
    for (var i = 0; i < queue.length; i++) {
      //dequeue
      var index = queue.shift();
      //print node
      console.log('Current Index:');
      console.log(index);

      var node = tree[index]
      //enqueue children of the node:
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    console.log("break")
  } while ( 0 !== queue.length)
}

bfs(tree)

/*
function bfs(tree) {
  let queue = [];
  queue.push(tree[0]);

  for (let i = 0; i < tree.length; i++) {  
    let currentNode = queue.shift()   
    console.log(currentNode.value)
    queue.push(currentNode.left)
    queue.push(currentNode.right)
  }
}
*/
