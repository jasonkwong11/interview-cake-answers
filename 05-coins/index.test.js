const change = require('./index');

let amount = 4;
let denominations = [1, 2, 3];

test('Change', () => {
  expect(change(amount, denominations)).toEqual(4)
})
