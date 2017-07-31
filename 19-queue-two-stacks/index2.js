function QueueTwoStacks() {
  this.inStack = [];
  this.outStack = [];
}

QueueTwoStacks.prototype.enqueue = function(item) {
  this.inStack.push(item);
}

QueueTwoStacks.prototype.dequeue = function() {
  if (this.outStack.length === 0) {
    //Move items from instack to outStack, reversing order

    while (this.inStack.length > 0) {
      var newInStackItem = this.inStack.pop();
      this.outStack.push(newInStackItem);
    }

    // If outStack is still empty, raise an error
    if (this.outStack.length === 0) {
      return undefined;
    }
  }
  return this.outStack.pop();
}


//COmplexity: enqueue is O(1)
//And so is dequeue when outstack has items.

// Dequeue on an empty outStack is order of the numbers
// of items in inStack at that moment which can vary
//significantly

//Notice that the more expensive a dequeue 
//on an empty outStack is (that is, the more items 
//we have to move from inStack to outStack), the
// more O(1)O(1)-time dequeues off of a non-empty 
//outStack it wins us in the future. 

