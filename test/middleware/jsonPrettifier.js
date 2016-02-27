const should = require('should');
const supertest = require('supertest');
const rewire = require('rewire');

const koa = require('koa');

const jsonPrettifier = require('../../middleware/jsonPrettifier.js');

describe('Middleware - jsonPrettifier', () => {
  it('should print pretty json (no environment set)', function* test() {
    const app = koa();
    app.use(jsonPrettifier());
    app.use(function* body() {
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    console.log(result.body);
  });

  it('should print pretty json (test environment)', function* test() {
    const app = koa();
    const _jsonPrettifier = rewire('../../middleware/jsonPrettifier.js');
    _jsonPrettifier.__set__('config', { env: 'test' });

    app.use(_jsonPrettifier());
    app.use(function* body() {
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    console.log(result.body);
  });
});

