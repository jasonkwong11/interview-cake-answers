function candleCount(n, ar) {
  //initialize the tallest
  var currentMax = ar[0]
  var candleCount = 1
  
  for (var i = 1; i < n; i++) {
      let currentCandle = ar[i]
      if (currentCandle == currentMax) {
          candleCount += 1
      }
      
      if (currentCandle > currentMax) {
          currentMax = currentCandle
          candleCount = 1
      }
  }
  return candleCount
}
let n = 10
let ar = [18, 90, 90, 13, 90, 75, 90, 8, 90, 43]

console.log(candleCount(n, ar))

//should return 5