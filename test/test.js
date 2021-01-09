const { assert } = require('chai');
const got = require('got');
const { HOST, PORT } = require('../config');

const fixtures = require('./fixtures');

fixtures.forEach(({ route, positive, negative }) => {
  const url = `${HOST}:${PORT}${route}`;
  describe(`Route '${route}'. Positive:`, () => {
    positive.forEach(({ name, input, value }) => {
      it(name, async () => {
        const resp = await got.post(url, {
          json: formatInput(input),
          responseType: 'json',
        });
        assert.deepEqual(resp.body.result, value);
      });
    });
  });
  describe(`Route '${route}'. Negative:`, () => {
    negative.forEach(({ name, input, message, code = 400 }) => {
      it(name, async () => {
        try {
          await got.post(url, {
            json: formatInput(input),
            responseType: 'json',
          });
          assert.equal(0, 1);
        } catch (err) {
          if (err.name === 'AssertionError') {
            err.message = 'Expect error in server response';
            throw new Error(err);
          }
          assert.equal(err.response.statusCode, code);
          assert.equal(err.response.body.message, message);
        }
      });
    });
  });
});

function formatInput(input) {
  if (typeof input === 'object') {
    return { ...input };
  }
  return { input };
}
