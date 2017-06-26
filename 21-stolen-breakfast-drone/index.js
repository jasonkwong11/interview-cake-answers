function findUniqueDeliveryId(deliveryIds) {

  var idToOccurrences = new Map();

  deliveryIds.forEach((deliveryId) => {
    if (idsToOccurrences.has(deliveryId)) {
      var newCount = idsToOccurrences.get(deliveryId) + 1;
      idsToOccurrences.set(deliveryId, newCount);
    } else {
      idsToOccurrences.set(deliveryId, 1);
    }
  });

  for (var [id, count] of idsToOccurrences) {
    if (count === 1) {
      return id;
    }
  }
}

// Use bit level:
// XOR all the integers in the array. We start with a
// variable uniqueDeliveryId set to 0. Every
// time we XOR with a new ID, it will change the bits.
// When we XOR with the same ID again, it will cancel
// out the earlier change.
//.. in the end: we'll be left with the ID that appeared once.

function findUniqueDeliveryId(deliveryIds) {
  var uniqueDeliveryId = 0;

  deliveryIds.forEach((deliveryId) => {
    uniqueDeliveryId ^= deliveryId;
  });

  return uniqueDeliveryId;
}

//Complexity: O(n) time and O(1) space
//Lesson learned: useful reminder of the power we can
// unlock by knowing what's happening at the bit level

//Clues when you should use bit manipulation to solve 
// the problem: 1. You want to multiply or divide by 2
// (use a left shift to multiply by 2)
// right shift to divide by 2.
// 2. You want to "cancel out" matching numbers (use XOR)