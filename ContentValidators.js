const contentError = require('./Errors').contentError;

module.exports = {
  romanValidate: (body) => {
    if (body.input === 'undefined')
      throw contentError("Required field 'input'");
    if (typeof body.input !== 'string')
      throw contentError('Value must be a string');
  },
  palindromeValidate: (body) => {
    if (body.input === 'undefined')
      throw contentError("Required field 'input'");
    if (typeof body.input !== 'number')
      throw contentError('Value must be a number');
  },
  arraySortValidate: (body) => {
    if (body.arr1 === 'undefined') throw contentError("Required field 'arr1'");
    if (body.arr2 === 'undefined') throw contentError("Required field 'arr2'");
    if (!Array.isArray(body.arr1)) throw contentError('arr1 must be an array');
    if (!Array.isArray(body.arr2)) throw contentError('arr2 must be an array');
  },
  nextIndexValidate: (body) => {
    if (body.nums === 'undefined') throw contentError("Required field 'nums'");
    if (body.target === 'undefined')
      throw contentError("Required field 'target'");
    if (!Array.isArray(body.nums)) throw contentError('nums must be an array');
  },
};
