function colorGraph(graph, colors) {
  graph.forEach((node) => {
    //get the node's neighbors' colors, as a set so we
    // can check if a color is illegal in constant time

    if (node.neighbors.has(node)) {
      throw new Error('Loop detected!' + node.label);
    }

    // get the node's neighbor's colors
    // as a set so we can check if a color
    // is illegal in constant time

    var illegalColors = new Set();
    
    node.neighbors.forEach((neighbor) => {
      if (neighbor.color !== null) {
        illegalColors.add(neighbor.color);
      }
    });

    //assign the first legal color
    for (var i = 0; i < colors.length; i++) {
      var color = colors[i];

      if (!illegalColors.has(color)) {
        node.color = color;
        break;
      }
    }
  });
}

// We'll try at most illegalColors.size + 1 in total.
// That's how many we'd need if we test all the colors
// in illegalColors first, before finally testing 
// one legal color last

// How many colors are in illegalColor. It's as most
// the number of neighbors, if each neighbor has a
// different color

// In total, over the course of the entire loop, how
// many neighbors are there? Well each of our M edges
// add two neighbors to the graph: one for each node
// on either end. So that's 2 * M neighbors in total.
// which means 2 * M illegal colors in total

/// But remember: we said we'd try as many as illegalColors.size + 1
// colors per node. We still have to factor in that "TODO"
// across all N of our nods thats an additional N colors.
// So we try 2 * M + N colors in total across all of our nodes

//That's O(M + N) time for assigning the first legal color
// to every node. Add that to the O(M) for
// finding all the illegal colors, and we get O(M + N) time in
// total for our graph coloring function.

// ^^ This is the fastest runtime we can get
// because we'll have to look at every node
// and every edge at least once.

//Space cost: The only data structure
// we allocate with non-constant space is the set
// of illegal colors. Whats the most space
// that ever takes up?

// In the worst case, the neighbors of the node
// with the maximum degree will all have different
// colors, so our space cost is O(D)

// For graph problems in general, 
// edge cases are: nodes with no edges,
// cycles, loops

// isolated nodes (no edges) tend to cause problems
// when we're traversing a graph (starting
// from one node and 'walking along' to other
// nodes, like we do in a depth-first or
// breadth first search)
// ... we're not doing that here (iterating
// over all nodes instead)

// cycles cause problems with graph traversal
// because we can end up in infinite loops
// (going around and around the cycle)
// but we're not traversing the graph here

// loop? that's a problem. a node with a loop
// is adjacent to itself, so it can't have
// the same color as ... itself.

// it's impossible to 'legally color' a node
// with a loop so we should throw an error.
//  ... we know a node has a loop if it is
// in its own list of neighbors.





