const { assert } = require('chai');
const got = require('got');
const { HOST, PORT } = require('../config');

const fixtures = require('./fixtures');

fixtures.forEach(({ route, positive, negative }) => {
  const url = `${HOST}:${PORT}${route}`;
  describe(`Route '${route}'. Positive:`, () => {
    positive.forEach(({ name, input, value }) => {
      it(name, async () => {
        const resp = await request(url, input);
        assert.deepEqual(resp.body.result, value);
      });
    });
  });
  describe(`Route '${route}'. Negative:`, () => {
    negative.forEach(({ name, input, message, code = 400 }) => {
      it(name, async () => {
        const resp = await request(url, input);
        assert.equal(resp.statusCode, code);
        assert.equal(resp.body.message, message);
      });
    });
  });
});

async function request(url, input) {
  return await got.post(url, {
    json: formatInput(input),
    responseType: 'json',
    throwHttpErrors: false,
  });
}

function formatInput(input) {
  if (typeof input === 'object') {
    return { ...input };
  }
  return { input };
}
