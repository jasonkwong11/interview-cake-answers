// Already implemented this:
  function Stack() {
    // initialize an empty array
    this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
    this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

    // if the stack is empty, return null
    // (it would also be reasonable to throw an exception)
    if (!this.items.length) {
        return null;
    }
    return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
    if (!this.items.length) {
        return null;
    }
    return this.items[this.items.length -1];
};

function MaxStack() {
  this.stack = new Stack();
  this.maxsStack = new Stack();
}

// Add a new item to the top of our stack.
// If the item is greater than or equal to the last item
// in maxsStack, it's the new max! So we'll add it to
// maxsStack.

MaxStack.prototype.push = function(item) {
  this.stack.push(item);

  if(!this.maxsStack.peek() || item >= this.maxsStack.peek()) {
    this.maxsStack.push(item);
  }
  return item;
};

// Remove and return the top item from our stack. If it
// equals the top item in maxsStack, they must have been
// pushed together. So we'll pop it out of maxsStack too.

MaxStack.prototype.pop = function() {
  var item = this.stack.pop();
  if (item === this.maxsStack.peek()) {
    this.maxsStack.pop();
  }
  return item;
}

// The last item in maxsStack is the max item in our stack.
MaxStack.prototype.getMax = function() {
  return this.maxsStack.peek();
};

// Complexity: O(1) time for push, pop(), and getMax()
// O(m) additional space, where m is the number of 
// operations performed on the stack.

// We're trading space efficiency for time efficiency...
// (Walking through the stack to find the max integer)
// whenever getMax() is called took no additional space

// We're spending time on push() and pop() so we can save
// time on getMax(). That's because we chose to optimize
// for the time cost of calls to getMax()

// Sometimes the first step in algorithm design is deciding
// what we're optimizing for. Start by considering the 
// characteristics of the input
