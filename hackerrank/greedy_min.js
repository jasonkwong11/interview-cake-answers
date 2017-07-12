let n = 3
let arr = [3, -7, 0]


function findMin(n, arr) {
    let sortedArr = arr.slice().sort((a, b) => {
      return a < b ? -1 : 1
    })

    let prev = sortedArr[0]
    let min = Math.abs(sortedArr[1] - sortedArr[0])
    for (let i = 1; i < n; i++) {
      let current = sortedArr[i]
      let potentialMin = Math.abs(current - prev)
      min = Math.min(min, potentialMin)
      prev = current;
    }
    console.log(min)
}
findMin(n, arr)
//should yield 3