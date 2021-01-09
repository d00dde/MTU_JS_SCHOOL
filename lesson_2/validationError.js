module.exports = (message) => {
  const err = new Error();
  err.name = 'Validation error';
  err.message = message;
  return err;
};
