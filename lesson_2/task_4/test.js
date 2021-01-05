const assert = require("assert");
const resolve = require("./index.js");

assert.deepStrictEqual(resolve(
	[2,3,1,3,2,4,6,22,7,9,2,19],
	[2,1,4,3,9,6]),
	[2,2,2,1,4,3,3,9,6,7,19,22]
);
const bigArr = new Array(1001).fill(null).map((_, i) => i);
assert.throws(() => resolve([],[2,1,4,3,9,6,2]), {
	message: "Длина массива arr1 не соотвествует условиям",
});
assert.throws(() => resolve(bigArr,[2,1,4,3,9,6,2]), {
	message: "Длина массива arr1 не соотвествует условиям",
});
assert.throws(() => resolve([2,3,1,3,2,4,6,22,7,9,2,19],[]), {
	message: "Длина массива arr2 не соотвествует условиям",
});
assert.throws(() => resolve([2,3,1,3,2,4,6,22,7,9,2,19],bigArr), {
	message: "Длина массива arr2 не соотвествует условиям",
});
assert.throws(() => resolve([2,3,1,3,2, 4.3, 6,22,7,9,2,19],[2,1,4,3,9,6]), {
	message: "Массив arr1 содержит недопустимые элементы",
});
assert.throws(() => resolve([2,3,1,3,2,4,6,22,7,9,2,19],[2,1,'4',3,9,6]), {
	message: "Массив arr2 содержит недопустимые элементы",
});
assert.throws(() => resolve([2,3,1,3,2,4,6,22,7,9,2,19],[2,1,4,3,9,6,42]), {
	message: "Массив arr1 не содержит элементы из массива arr2",
});
assert.throws(() => resolve([2,3,1,3,2,4,6,22,7,9,2,19],[2,1,4,3,9,6,2]), {
	message: "Элементы массива arr2 не уникальны",
});


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
