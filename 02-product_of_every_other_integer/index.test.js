const getProductsOfAllIntsExceptAtIndex = require('./index');

let array = [1, 7, 3, 4];
let result = [84, 12, 28, 21];

test("getProductsOfAllIntsExceptAtIndex", () => {
  expect(getProductsOfAllIntsExceptAtIndex(array)).toEqual(result);
})