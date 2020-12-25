const assert = require("assert");
const resolve = require("./index.js");

assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4,6,22,7,9,2,19],
	[2,1,4,3,9,6]),
	[2,2,2,1,4,3,3,9,6,7,19,22]
);
assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4,6,22,7,9,2,19],
	[2,1,4,3,9,6,2]),               // Элементы arr2 не уникальны
	[]
);
assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4,6,22,7,9,2,19],
	[2,1,4,3,9,6,42]),              // Не все элементы arr2 содержатся в arr1
	[]
);
assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4.1,6,22,7,9,2,19],		// Элементы arr1 содержат не натуральные числа
	[2,1,4,3,9,6]),
	[]
);
assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4,1001,6,22,7,9,2,19],		// Элементы arr1 выходят из допустимого диапазона
	[2,1,4,3,9,6]),
	[]
);

/*
Problem 4

Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2.  Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.

Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

Constraints:
1 <= arr1.length, arr2.length <= 1000
0 <= arr1[i], arr2[i] <= 1000
All the elements of arr2 are distinct.
Each arr2[i] is in arr1.
*/
