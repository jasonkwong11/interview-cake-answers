var n = 20
var calories = '504 378 291 380 728 630 797 212 32 792 895 635 850 853 859 127 653 655 476 748'

calories = calories.split(' ');
calories = calories.map(Number);

function calorieCount(n, arr){
    // your code goes here
    let sortedCal = calories.slice().sort((a, b) => {
        return a > b ? -1 : 1
    })

    let miles = 0;

    for (i = 0; i < n; i++) {
        miles = miles + (sortedCal[i] * (2^i))
    }
    console.log(miles)
}

calorieCount(n, calories)
//should yield 124138217




#!/bin/python

import sys
import math


n = int(raw_input().strip())
calories = map(int, raw_input().strip().split(' '))
# your code goes here
calories.sort()
leng = len(calories) - 1
miles = 0
j = 0
while(leng >= 0) :
        miles += int(math.pow(2, j)) * calories[leng]
        j += 1
        leng -= 1
print miles



