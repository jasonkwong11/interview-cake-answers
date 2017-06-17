/* 
  the product of all the integers except the integer
  at each index can be broken down into:
  1. the product of all the integers before each index
  2. the product of all the integers after each index  
*/

function getProductsOfAllIntsExceptAtIndex(array) {
  //check to make sure array has enough elements to have a product
  if (array.length < 2){ throw new Error("Must include at least 2 elements")}

  let productsOfAllIntsExceptAtIndex = [];
  let productSoFar = 1;

  for (let i = 0; i < array.length; i++) {
    productsOfAllIntsExceptAtIndex[i] = productSoFar;
    productSoFar *= array[i];
  }

  productSoFar = 1;

  for (let j = array.length - 1; j >= 0; j--) {
    productsOfAllIntsExceptAtIndex[j] *= productSoFar;
    productSoFar *= array[j];
  }
  return productsOfAllIntsExceptAtIndex;
} 

module.exports = getProductsOfAllIntsExceptAtIndex;