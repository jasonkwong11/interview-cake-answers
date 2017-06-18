const highestProductOf3 = require('./index');

test('highestProductOf3', () => {
  let array = [1, 10, -5, 1, -100];
  let result = 5000;

  expect(highestProductOf3(array)).toEqual(result);
})