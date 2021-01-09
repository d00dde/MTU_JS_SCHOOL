const validationErr = require('../Errors').validationError;
const VALID_SYMBOLS = ['(', ')', '{', '}', '[', ']'];
const MAX_LENGTH = 104;

function validateInput(symbols) {
  if (symbols.length < 1 || symbols.length > MAX_LENGTH)
    throw validationErr('String length does not meet conditions');
  if (symbols.some((symbol) => !VALID_SYMBOLS.includes(symbol)))
    throw validationErr('The string contains invalid characters');
}

function isOpening(symbol) {
  if (symbol === '(' || symbol === '[' || symbol === '{') return true;
  return false;
}

function isPair(closing, opening) {
  switch (closing) {
    case ')':
      return opening === '(';
    case ']':
      return opening === '[';
    case '}':
      return opening === '{';
  }
}

module.exports = (input) => {
  const symbols = input.split('');
  validateInput(symbols);
  const openingStack = [];
  for (let i = 0; i < symbols.length; i++) {
    if (isOpening(symbols[i])) {
      openingStack.push(symbols[i]);
    } else {
      if (!isPair(symbols[i], openingStack.pop())) return false;
    }
  }
  if (openingStack.length) return false;
  return true;
};
