const validationErr = require('../Errors').validationError;
const VALID_SYMBOLS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const MAX_NUMBER = 3999;
const MAX_LENGTH = 15;
const VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function isDecrement(symbol, nextSymbol) {
  if (!nextSymbol) {
    return false;
  }
  if (symbol === 'I' && (nextSymbol === 'V' || nextSymbol === 'X')) {
    return true;
  }
  if (symbol === 'X' && (nextSymbol === 'L' || nextSymbol === 'C')) {
    return true;
  }
  if (symbol === 'C' && (nextSymbol === 'D' || nextSymbol === 'M')) {
    return true;
  }
  return false;
}

function validateInput(symbols) {
  if (symbols.length < 1 || symbols.length > MAX_LENGTH)
    throw validationErr('String length does not meet conditions');
  if (symbols.some((symbol) => !VALID_SYMBOLS.includes(symbol)))
    throw validationErr('The string contains invalid characters');
}

module.exports = (romanNumber) => {
  const symbols = romanNumber.split('');
  validateInput(symbols);
  const total = symbols.reduce((total, symbol, index) => {
    if (isDecrement(symbol, symbols[index + 1])) {
      return total - VALUES[symbol];
    } else {
      return total + VALUES[symbol];
    }
  }, 0);

  if (total > MAX_NUMBER)
    throw validationErr('The number exceeds the allowed value');
  return total;
};
