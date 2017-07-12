let array = [1, 7, 3, 4];

function getProductsOfAllIntsExceptAtIndex(array) {

  if(array.length < 2){ throw new Error("need at least 2 elements") }

  let productSoFar = 1
  let products = [];

  for (let i = 0; i < array.length; i++) {
    products[i] = productSoFar
    productSoFar *= array[i]
  }

  productSoFar = 1;

  for (let j = array.length - 1; j >= 0; j--) {
    products[j] *= productSoFar
    productSoFar *= array[j]
  }
  return products
}

console.log(getProductsOfAllIntsExceptAtIndex(array));
//[ 84, 12, 28, 21 ]