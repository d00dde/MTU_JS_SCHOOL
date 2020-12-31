const assert = require("assert");
const resolve = require("./index.js");

assert.strictEqual(resolve(123), false);
assert.strictEqual(resolve(1111), true);
assert.strictEqual(resolve(1234321), true);
assert.strictEqual(resolve(-113321), false);
assert.strictEqual(resolve(123321), true);
assert.throws(() => resolve(123456654321), {
	message: "Число находится вне допустимого диапазона",
});
assert.throws(() => resolve('1111'), {
	message: "Введено не натуральное число",
});
assert.throws(() => resolve(123.321), {
	message: "Введено не натуральное число",
});

/*
Problem 2

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:
Input: x = 121
Output: true
Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
Example 4:
Input: x = -101
Output: false


Constraints:
-2**31 <= x <= 2**31 - 1
*/
