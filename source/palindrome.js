const validationError = require('../Errors').validationError;
const MIN = -1 * 2 ** 31;
const MAX = 2 ** 31 - 1;

function validateInput(number) {
  if (isNaN(number)) {
    throw validationError('Invalid number in input');
  }
  if (!Number.isInteger(number))
    throw validationError('Not an integer entered');
  if (number < MIN || number > MAX)
    throw validationError('The number is out of range');
}

module.exports = (input) => {
  const number = +input;
  validateInput(number);
  const digits = number.toString().split('');
  const halfIndex = Math.floor(digits.length / 2);
  for (let i = 0; i < halfIndex; i++) {
    if (digits[i] !== digits[digits.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
