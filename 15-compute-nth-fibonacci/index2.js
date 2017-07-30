function fibonnaci(n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fibonnaci(n - 1) + fibonnaci(n - 2) 
}

// Complexity: O(log n)