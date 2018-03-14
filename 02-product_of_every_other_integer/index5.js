let inputArray =   [1, 7, 3, 4];
//should return [84, 12, 28, 21]

/*
 A brute force approach would use two loops to multiply
 the integer at every index by the integer at every
 nestedIndex, unless index === nestedIndex.
 
 This would give us a runtime of O(n^2). We can do better.
 
We're wasting a lot of time doing the same calculations.
As an example, let's take:

input array:
[1, 2, 6, 5, 9]

array of products of all integers except the integer at each index
[540, 270, 90, 108, 60]  // [2 * 6 * 5 * 9,  1 * 6 * 5 * 9,  1 * 2 * 5 * 9,  1 * 2 * 6 * 9,  1 * 2 * 6 * 5]
We're doing some of the same multiplications two or three times!

When we calculate [2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5], we're calculating 5*9 three times: at indices 0, 1, and 2.

Or look at this pattern:

When we calculate [2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5], we have 1 in index 1, and we calculate 1*2 at index 2, 1*2*6 at index 3, and 1*2*6*5 at index 4.
We’re redoing multiplications when instead we could be storing the results!

This would be a great time to use a greedy approach. We could store the 
results of each multiplication highlighted in blue, then just multiply
by one new integer each time.

So in the last highlighted multiplication, for example, we wouldn't
have to multiply 1 * 2 * 6 again. If we stored that value (12) from
the previous multiplication, we could just multiply 12 * 5.

CAN WE BREAK OUR PROBLEM DOWN INTO SUBPROBLEMS SO WE CAN USE A
GREEDY APPROACH?

Lets look back at the last example: 

[2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5]

WHAT DO ALL THE HIGHLIGHTED MULTIPLICATIONS HAVE IN COMMON?

They are all the integers that are before each index in the input
array ([1, 2, 6, 5, 9]).

For example, the highlighted multiplication at index 3 (1 * 2 * 6)
is all the integers before index 3 in the input array.

[1, 2, 6, 5, 9]

[2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5]

Do all the multiplications that aren't highlighted have anything in
common? 

Yes, they're the integers that are after each index in the input array!

Knowing this, can we break down our original problem to use a greedy approach?

ANSWER:

The product of all the integers except the integer at each index can be
broken down into two pieces:

1. the product of all the integers before each index, and
2. the product of all the integers after each index.

To start, let's get the product of all the integers before each index.

How can we do this? Let's take another example:

// input array
[3, 1, 2, 5, 6, 4]

// multiplication of all integers before each index
// (we give index 0 a value of 1 since it has no integers before it)
[1, 3,  3 * 1,  3 * 1 * 2,  3 * 1 * 2 * 5,  3 * 1 * 2 * 5 * 6]

// final array of the products of all the integers before each index
[1, 3, 3, 6, 30, 180]

Notice that we're always adding one new integer to our multiplication 
for each index!

So to get the products of all the integers before each index, we could
greedily store each product so far and multiply that by the next integer.

Then we can store that new product so far and keep going.


*/
var productsOfAllIntsBeforeIndex = [];

// for each integer, find the product of all the integers
// before it, storing the total product so far each time

var productSoFar = 1;
for (var i = 0; i < intArray.length; i++){
    productsOfAllIntsBeforeIndex[i] = productSoFar;
    productSoFar *= intArray[i];
    
}


/*
So we solved the subproblem of finding the products of all the integers before each index. Now, how can we find the products of all the integers after each index?

It might be tempting to make a new array of all the values in our input array in reverse, and just use the same function we used to find the products before each index.

Is this the best way?

This method will work, but:

We'll need to make a whole new array that's basically the same as our input array. That's another O(n)O(n) memory cost!
To keep our indices aligned with the original input array, we'd have to reverse the array of products we return. That's two reversals, or two O(n)O(n) operations!

IS there a cleanre way to get the products of all the integers after
each index?

YES, we can just walk through our array backwards! So instead of
reversing the values of the array, we'll just reverse the indicies
we use to iterate!

*/

var productsOfAllIntsAfterIndex = [];
var productSoFar = 1;

for (var i = intArray.length - 1; i >= 0; i--){
    productsOfAllIntsAfterIndex[i] = productSoFar;
    productSoFar *= intArray[i];
}

/* Now we've got productsOfAllIntsAfterIndex,
but we're starting to build a lot of new arrays. And
we still need our final array of total products.
How can we save space?

Let’s take a step back. Right now we’ll need three arrays:

productsOfAllIntsBeforeIndex,
productsOfAllIntsAfterIndex, and
productsOfAllIntsExceptAtIndex.

To get the first one, we keep track of the total product 
so far going forwards, and to get the second one, we keep track 
of the total product so far going backwards.

How do we get the third one?

Well, we want the product of all the integers before an index
and the product of all the integers after an index. We just need
to multiply every integer in productsOfAllIntsBeforeIndex
with the integer at the same index in productsOfAllIntsAfterIndex!

Let's take an example. Say our input array is [2, 4, 10][2,4,10]:

We'll calculate productsOfAllIntsBeforeIndex as:

If the input array is [2, 4, 10],
the product of all the numbers before each index is [1, 2, 8]

And we'll calculate productsOfAllIntsAfterIndex as:

If the input array is [2, 4, 10],
the product of all the numbers after each index is [40, 10, 1]

If we take these arrays and multiply the integers
at the same indices, we get:

And this gives us what we're looking for- the products of all
the integers except the integer at each index.

Knowing this, can we eliminate any of the arrays to reduce the memor
we use?

Yes, instead of building the second array, we can just take the
product we would have stored and multiply it by the matching
integer in productsOfAllIntsBeforeIndex!

So in our example above, when we calculated our first(well 0th)
product after index (whcih is 40), we'd just multiply it
instead of staring it a new array

Now we just need one array.

EDGE CASES:
What if the input array contains zeros? What if the input array 
only has one integer?

We'll be fine with zeros. What if the input array has fewer than
two integers?... there won't be any products to return 
because at any index there are no other integers, so lets
 throw an exception
 
 SOLUTION
 
 To find the products of all the integers except the integer at each index, we'll go through our array greedily ↴ twice. First we get the products of all the integers before each index, and then we go backwards to get the products of all the integers after each index.

When we multiply all the products before and after each index, we get our answer—the products of all the integers except the integer at each index!


*/

function getProducts(intArray){
    if(intArray.length < 2) {
        throw new Error('Need at least 2 ints')
    }
    
    var productsOfAllIntsExceptAtIndex = []
    // for each integer, we find the product of all the integers
    // before it, storing the total product so far each time
    var productSoFar = 1;
    for (var i = 0; i < intArray.length; i++){
        productsOfAllIntsExceptAtIndex[i] = productSoFar;
        productSoFar *= intArray[i];
    }
    
    // for each integer, we find the product of all the integers
    // after it. since each index in products already has the
    // product of all the integers before it, now we're storing
    // the total product of all other integers
    
    productSoFar = 1;
    for (var j = intArray.length - 1; j >= 0; j--){
        productsOfAllIntsExceptAtIndex[i] *= productSoFar;
        productSoFar *= intArray[j];
    }
    
    return productsOfAllIntsExceptAtIndex;
}


