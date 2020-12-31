const assert = require("assert");
const resolve = require("./index.js");

assert.strictEqual(resolve('()[]{}'), true);
assert.strictEqual(resolve('()'), true);
assert.strictEqual(resolve('(]'), false);
assert.strictEqual(resolve('([)]'), false);
assert.strictEqual(resolve('{[]}'), true);
assert.strictEqual(resolve('{[()]}'), true);
assert.strictEqual(resolve('((({[]})))'), true);
assert.strictEqual(resolve('{[]}('), false);
assert.strictEqual(resolve('({[]}'), false);
assert.throws(() => resolve("{[(42)]"), {
	message: "Строка содержит недопустимые символы",
});
assert.throws(() => resolve(""), {
	message: "Длина строки не соответствует условиям",
});
const bigStr = new Array(105).fill('(').join('');
assert.throws(() => resolve(bigStr), {
	message: "Длина строки не соответствует условиям",
});

/*
Problem 3.

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.

Example 1:
Input: s = "()"
Output: true
Example 2:
Input: s = "()[]{}"
Output: true
Example 3:
Input: s = "(]"
Output: false
Example 4:
Input: s = "([)]"
Output: false
Example 5:
Input: s = "{[]}"
Output: true

Constraints:
1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/
