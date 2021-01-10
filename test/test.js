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
        // Тут у меня возникла проблема:
        // С одной стороны got при ответе сервера с кодом 4хх или 5хх бросает ошибку HTTPError
        // и у меня нет доступа к коду ответа и сообщению пока я её не перехвачу.
        // С другой стороны, если негативный тест не будет вызывать ошибку (передаст валидные данные)
        // то код отработает без ошибки и тест будет считаться пройденым.
        // Поэтому пришлось применить "костыль" в виде assert.equal(0, 1), который бросит AssertionError
        // если код дойдёт до этого места, а в блоке catch ловить эту ошибку и пробрасывать дальше с сообщением
        // вроде 'Expect error in server response'. Оно работает, но мне не нравится это решение :(
        // Я пытался заставить chai правильно обрабатывать ошибки, но assert.ifError обрабатывает синхронные ошибки.
        // Для работы с асинхронным кодом нужно подключать что-то типа chai-as-promised. А это ещё доп. зависимость и усложнение.
        // Стоит ли продолжать в этом направлении или сделать что-то другое?
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
