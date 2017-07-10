/* 
  the product of all the integers except the integer
  at each index can be broken down into:
  1. the product of all the integers before each index
  2. the product of all the integers after each index  
*/

let array =   [1, 7, 3, 4];

function getProductsOfAllIntsExceptAtIndex(array) {
  //check to make sure array has enough elements to have a product
  if (array.length < 2){ throw new Error("Must include at least 2 elements")}

  let products = [];
  let productSoFar = 1;

  for (let i = 0; i < array.length; i++) {
    products[i] = productSoFar;
    productSoFar *= array[i];
  }

  productSoFar = 1;

  for (let j = array.length - 1; j >= 0; j--) {
    products[j] *= productSoFar;
    productSoFar *= array[j];
  }
  return products;
} 

console.log(getProductsOfAllIntsExceptAtIndex(array))
module.exports = getProductsOfAllIntsExceptAtIndex;


