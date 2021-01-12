module.exports = {
  validationError: (message) => {
    const err = new Error();
    err.name = 'ValidationError';
    err.message = message;
    return err;
  },
  contentError: (message) => {
    const err = new Error();
    err.name = 'ContentError';
    err.message = message;
    return err;
  },
};
