const validationErr = require('../Errors').validationError;
const MAX_LENGTH = 1000;
const MAX_VALUE = 1000;

function validateInput(arr1, arr2) {
  if (arr1.length < 1 || arr1.length > MAX_LENGTH)
    throw validationErr('arr1 length does not meet the conditions');
  if (arr2.length < 1 || arr2.length > MAX_LENGTH)
    throw validationErr('arr2 length does not meet the conditions');
  if (
    arr1.some((item) => !Number.isInteger(item) || item > MAX_VALUE || item < 0)
  )
    throw validationErr('arr1 contains invalid elements');
  if (
    arr2.some((item) => !Number.isInteger(item) || item > MAX_VALUE || item < 0)
  )
    throw validationErr('arr2 contains invalid elements');
  if (arr2.some((item) => !arr1.includes(item)))
    throw validationErr('arr1 does not contain elements from the arr2');

  for (let i = 0; i < arr2.length - 1; i++) {
    for (let j = i + 1; j < arr2.length; j++) {
      if (arr2[i] === arr2[j])
        throw validationErr('arr2 elements are not unique');
    }
  }
}

module.exports = (arr1, arr2) => {
  const output = [];
  validateInput(arr1, arr2);
  const arr1Сlone = [...arr1]; // избегаем мутации аргументов функции
  arr2.forEach((base) => {
    arr1Сlone.forEach((item, index) => {
      if (item === base) {
        arr1Сlone[index] = null;
        output.push(item);
      }
    });
  });
  const rest = arr1Сlone.filter((i) => i !== null);
  rest.sort((a, b) => a - b);
  return output.concat(rest);
};
