let array =   [1, 7, 3, 4];
// should return [ 84, 12, 28, 21 ]

function getProductsOfAllIntsExceptAtIndex(array) {
  //first instantiate a products array of 1's
  let products = []
  for (let k=0; k<=array.length-1; k++) {
    products[k] = 1;
  }

  let productSoFar = 1;

  for (let i = 0; i < array.length; i++) {
    products[i] = productSoFar;
    productSoFar *= array[i]
  }

  productSoFar = 1

  for (let j = array.length - 1; j >= 0; j--) {
    products[j] *= productSoFar
    productSoFar *= array[j]
  }
  return products
}

console.log(getProductsOfAllIntsExceptAtIndex(array));