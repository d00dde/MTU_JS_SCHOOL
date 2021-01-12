const validationErr = require('../Errors').validationError;

function validateInput(nums, target) {
  if (nums.some((item) => !Number.isInteger(item)))
    throw validationErr('nums contains invalid elements');
  if (!Number.isInteger(target))
    throw validationErr('target must be an integer');
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      throw validationErr('nums must be sorted correctly');
    }
  }
}

module.exports = (nums, target) => {
  validateInput(nums, target);
  for (let i = 0; i < nums.length; i++) {
    if (target <= nums[i]) return i;
  }
  return nums.length;
};
