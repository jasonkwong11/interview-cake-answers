/*
QUESTION: Write a function that, given:

1. an amount of money
2. an array of coin denominations

computes the number of ways to make the amount
of money with coins of the available denominations.

Example: for amount = 4 (4cents) and 
denominations = [1, 2, 3] (1 cent, 2 cents, 3 cents),
your program would output 4 - the number of ways to
make 4 cents with those denominations:

1. 1, 1, 1, 1
2. 1, 1, 2
3. 1, 3
4. 2, 2

BREAKDOWN:

We need to find some way to break this problem
down into subproblems.

Here's one way: for each denomination, we can use
it once, or twice, or as many times as it takes
 to reach or overshoot the amount with coins of that
 denomination alone.

For each of those choices of how many times to include
coins of each denomination, we're left with the
subproblem of seeing how many ways we can get the
remaining amount from remaining denominations.

Here's that approach in pseudocode:

function numberOfWays(amount, denominations){
  answer = 0;
  denominations.forEach(denomination) {
    possibleNumTimesToUseDenominationWithoutOvershootingAmount.forEach(numTimesToUseDenomination){
      answer += numberOfWays(amountRemaining, otherDenominations);
    }
  }
  return answer;
}

As a recursive function, we could formalize this as:

function changePossibilitiesTopDown(amountLeft, denominations, currentIndex) {
  currentIndex = (typeof currentIndex !== 'undefined') ? currentIndex : 0;

  // base cases:
  // we hit the amount spot on. yes!

  if (amountLeft === 0) return 1;

  // we overshot the amountLeft(used too many coins)
  if (amountLeft < 0) return 0;

  //we're out of denominations
  if (currentIndex === denominations.length) return 0;

  console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');
  
  //choose a current coin
  var currentCoin = denominations[currentIndex];

  // see how many possibilities we can get
  // for each number of times to use currentCoin

  var numPossibilities = 0;

  while (amountLeft >= 0) {
    numPossibilities += changePossibilities(amountLeft,
      denominations, currentIndex + 1);
      amountLeft -= currentCoin;
  }
  return numPossibilities
}

But there's a problem -- we'll often duplicate the work of checking remaining change
possibilities:

Note the duplicate calls with the input 4, [1,2,3]:

changePossibilitiesTopDown(4, [1, 2, 3]);
  checking ways to make 4 with [1, 2, 3]
  checking ways to make 4 with [2, 3]
  checking ways to make 4 with [3]
  checking ways to make 2 with [3]
  checking ways to make 3 with [2, 3]
  checking ways to make 3 with [3]
  checking ways to make 1 with [3]
  checking ways to make 2 with [2, 3]
  checking ways to make 2 with [3]
  checking ways to make 1 with [2, 3]
  checking ways to make 1 with [3]
❮ 4

How can we avoid this duplicate work and bring down the time cost?

One way is to memoize:

function Change() {
  this.memo = {};
}

Change.prototype.changePossibilitiesTopDown = function(amountLeft, denominations, currentIndex) {
  currentIndex = ( typeof currentIndex !== 'undefined') ? currentIndex : 0;

  // check our memo and short-circuit if we've already solved this one
  var memoKey = [amountLeft, currentIndex].join(', ');
  if (this.memo.hasOwnProperty(memoKey)) {
    console.log('grabbing memo [' + memoKey + ']');
    return this.memo[memoKey];
  }

  // base cases:
  // we hit the amount spot on. yes!
  if (amountLeft === 0) return 1;

  // we overshot the amount left (used too many coins)
  if (amountLeft < 0) return 0;

  // we're out of denominations
  if(currentIndex === denominations.length) return 0;

  console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');

  // choose a current coin
  var currentCoin = denominations[currentIndex];

  // see how many possibilities we can get
  // for each number of times to use currentCoin
  var numPossibilities = 0;
  while (amountLeft >= 0) {
    numPossibilities += this.changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
    amountLeft -= currentCoin;
  }
  // save the answer in our memo so we don't compute it again
  this.memo[memoKey] = numPossibilities;
  return numPossibilities;
}

The answer is quite good. it solves our duplicate work problem. It takes O(n * m) time
and O(n * m) space where n is the amount and m is the number of items in denominations.

However we can do better. because our method is recursive, it will build up a large
call stack of size O(m). Of course, this cost is eclipsed by the memory cost of memo,
which is O(n * m). But it's still best to avoid building up a large stack like this,
because it can cause a stack overflow (yes that means recursion is usually better
to avoid for funcitons that might have arbitrarily large inputs.)

It turns out we can get to O(n) additional space.

A great way to avoid recursion is to go bottom-up:

// BOTTOM-UP ASIDE:

Going bottom-up is a way to avoid recursion, saving the memory cost that recursion incurs when it builds up the call stack.

Put simply, a bottom-up algorithm "starts from the beginning," while a recursive algorithm often "starts from the end and works backwards."

For example, if we wanted to multiply all the numbers in the range 1..n1..n, we could use this cute, top-down, recursive one-liner:

  function product1ToN(n) {
    // we assume n >= 1
    return (n > 1) ? (n * product1ToN(n-1)) : 1;
}

This approach has a problem: it builds up a call stack of size O(n)O(n), which makes our total memory cost O(n)O(n). This makes it vulnerable to a stack overflow error, where the call stack gets too big and runs out of space.

To avoid this, we can instead go bottom-up:

  function product1ToN(n) {
    // we assume n >= 1

    var result = 1;
    for (var num = 1; num <= n; num++) {
        result *= num;
    }

    return result;
}

This approach uses O(1)space (O(n) time).

Some compilers and interpreters will do what's called tail call optimization (TCO), where it can optimize some recursive functions to avoid building up a tall call stack. Python and Java decidedly do not use TCO. Some Ruby implementations do, but most don't. Some C implementations do, and the JavaScript spec recently allowed TCO. Scheme is one of the few languages that guarantee TCO in all implementations. In general, best not to assume your compiler/interpreter will do this work for you.

Going bottom-up is a common strategy for dynamic programming problems, which are problems where the solution is composed of solutions to the same problem with smaller inputs (as with multiplying the numbers 1..n1..n, above). The other common strategy for dynamic programming problems is memoization.

//END BOTTOM UP ASIDE

Our recursive approach was top-down because it started with the final value for amount and recursively
broke the problem down into subproblems with smaller values for amount. What if instead we tried to
compute the answer for small values of amount first, and use those answers to iteratively compute
the answer for higher values until arriving at the final amount?

We can start by making an array, wayOfDoingNCents, where the index is the amount and the value at each
index is the number of ways of getting that amount

This array will take O(n) space, where n is the size of amount.

To further simplify the problem, we can work with only the first coin in denominations, then add
in the second coin, then the third, etc.

What would waysOfDoingNCents look like for just our first coin? 1cent? Let's call this waysOfDoingNCents1

  var waysOfDoingNCents1 = [
    1,  // 0c:  no coins
    1,  // 1c:  1 1c coin
    1,  // 2c:  2 1c coins
    1,  // 3c:  3 1c coins
    1,  // 4c:  4 1c coins
    1,  // 5c:  5 1c coins
];

Now what if we add a 2 cent coin?

  var waysOfDoingNCents1And2 = [
    1,      // 0c:  no change
    1,      // 1c:  no change
    1 + 1,  // 2c:  new [(2)]
    1 + 1,  // 3c:  new [(2, 1)]
    1 + 2,  // 4c:  new [(2, 1, 1), (2,2)]
    1 + 2,  // 5c:  new [(2, 1, 1, 1), (2, 2, 1)]
];

How do we formalize this process of going from waysOfDoingNCents to waysOfDoingNCents1And2?

Let's suppose we're partway through already (this is a classic dynamic programming approach).
Say we're trying to calculate waysOfDoingNCents1And2[5]. Because we're going
bottom-up, we know we already have: 

1. waysOfDoingNCents1And2 for amounts less than 5
2. a fully-populated waysOfDoingNCents1

So how many new ways should we add to waysOfDoingNCents1[5] to get waysOfDoingNCents1And2[5]?

..Well, if there are any new ways to get 5cents now that we have 2cent coins, those new ways must
involve at least one 2cent coin. So if we presuppose that we'll use one 2cent coin, that leaves
us with 5 - 2 = 3 left to come up with. We already know how many ways we can get 3 cents with 1 and 2
cent coins: waysOfDoingNCents1And2[3], which is 2.

So we can see that:

  waysOfDoingNCents1And2[5] = waysOfDoingNCents1[5] + waysOfDoingNCents1And2[5 - 2]

Why don't we also need to check waysOfDoingNCents1And2[5 - 2 - 2] (two 2cent coins)?
  ... Because we already checked waysOfDoingNCents1And2[1] when calculating waysOfDoingNCents1And2[3]

We'd be counting some arrangements multiple times. In other words, waysOfDoingNCents1And2[k]
already includes the full count of possiblities for gettingk, including possiblities that use
2 cent any number of times. We're only interested in how many MORE possibilities we might get
when we go from k to k + 2 and thus have the ability to add one more 2 cent coin to each of the
possibilities we have for k.


SOLUTION

We use a bottom up algorithm to build up a table waysOfDoingNCents such that waysOfDoingNCents[k]
is how many ways we can get to k cents using our denominations. We start with the base
case that there's one way to create the amount zero, and progressively add each of our 
denominations.

The number of new ways we can make a higherAmount when we account for a new coin is simply
waysOfDoingNCents[higherAmount - coin], where we know that value already includes
combinations involving coin(because we went bottom-up, we know smaller values have already
been calculated.)

*/

function changePossibilitiesBottomUp(amount, denominations) {
  //initialize an array of zeros with indices up to amount

  var waysOfDoingNCents = [];
  for (var i = 0; i <= amount; i++) {
    waysOfDoingNCents[i] = 0;
  }
  waysOfDoingNCents[0] = 1;

  denominations.forEach(function(coin) {
    for (var higherAmount = coin; higherAmount <= amount; higherAmount++){
      var higherAmountRemainder = higherAmount - coin;
      waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
    }
  });

  return waysOfDoingNcents[amount];
}

/*
Here's how waysOfDoingNCents would look in successive iterations of our function for
amount = 5 and denominations = [1, 3, 5]

  ===========
key:
a = higherAmount
r = higherAmountRemainder
===========

============
for coin = 1:
============
[1, 1, 0, 0, 0, 0]
 r  a

[1, 1, 1, 0, 0, 0]
    r  a

[1, 1, 1, 1, 0, 0]
       r  a

[1, 1, 1, 1, 1, 0]
          r  a

[1, 1, 1, 1, 1, 1]
             r  a

============
for coin = 3:
=============
[1, 1, 1, 2, 1, 1]
 r        a

[1, 1, 1, 2, 2, 1]
    r        a

[1, 1, 1, 2, 2, 2]
       r        a

============
for coin = 5:
=============
[1, 1, 1, 2, 2, 3]
 r              a


final answer: 3


COMPLEXITY:

O(n * m) time and O(n) additional space, where n is the amount of money and m is the number
of potential denominations

WHAT WE LEARNED

This question is in a broad class called dynamic programming. Dynamic programming is kind of like the next
step up from greedy. You're taking that idea of "keeping track of what we need in order to update
the best answer so far," and applying it to situations where the best answer so far might not just
have to do with the previous answer, but some other EARLIER answer as well.

So as you can see in this problem, we kept track of all of our previous answers to smaller versions
of the problems (called 'subproblems') in a big array called waysOfDoingNCents.

Again, same idea of keeping track of what we need in order to update the answer as we go,
like we did when storing the max product of 2, min product of 2, etc in the highest product
of 3 question. Except now the thing we need to keep track of is all our previous answers, which
we're keeping in an array.

We built that array bottom-up, but we also talked about how we could do it top-down and
memoize. Going bottom--up is cleaner and usually more efficient, but often it's easier
to think of the top-down version first and try to adapt from there.
*/





