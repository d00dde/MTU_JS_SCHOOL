const validationError = require('../Errors').validationError;

const REPEAT_SYMBOLS = ['I', 'X', 'C', 'M'];
const SINGLE_SYMBOLS = ['V', 'L', 'D'];
const VALID_SYMBOLS = REPEAT_SYMBOLS.concat(SINGLE_SYMBOLS);
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
    throw validationError('String length does not meet conditions');
  if (symbols.some((symbol) => !VALID_SYMBOLS.includes(symbol)))
    throw validationError('The string contains invalid characters');
}

function correctValidate(firstSymbol) {
  let prevSymbol = '';
  let maxCounter = 1;
  let currentValue = VALUES[firstSymbol];
  return (symbol, nextSymbol) => {
    const isRepeat = REPEAT_SYMBOLS.includes(symbol);
    if (prevSymbol === symbol) {
      if (!isRepeat) {
        throw validationError(
          'Invalid Roman number (repeat single characters)',
        );
      }
      maxCounter++;
      if (maxCounter > 3) {
        throw validationError(
          'Invalid Roman number (over 3 repeats characters)',
        );
      }
    } else {
      maxCounter = 1;
      prevSymbol = symbol;
    }
    if (VALUES[symbol] > currentValue) {
      throw validationError('Invalid Roman number (wrong characters order)');
    }
    if (!isDecrement(symbol, nextSymbol)) {
      currentValue = VALUES[symbol];
    }
  };
}

module.exports = (romanNumber) => {
  const symbols = romanNumber.toUpperCase().split('');
  validateInput(symbols);
  const correctValidator = correctValidate(symbols[0]);
  const total = symbols.reduce((total, symbol, index) => {
    correctValidator(symbol, symbols[index + 1]);
    if (isDecrement(symbol, symbols[index + 1])) {
      return total - VALUES[symbol];
    } else {
      return total + VALUES[symbol];
    }
  }, 0);

  if (total > MAX_NUMBER)
    throw validationError('The number exceeds the allowed value');
  return total;
};
