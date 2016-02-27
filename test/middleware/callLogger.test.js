const should = require('should');
const supertest = require('supertest');

const koa = require('koa');

const config = require('../../config');

const callLogger = require('../../middleware/callLogger.js');

describe('Middleware - callLogger', () => {
  it('should log the query', function* test() {
    const app = koa();
    app.use(callLogger);
    app.use(function* error() {
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
  });

  it('should not log the query (not local environment)', function* test() {
    config.env = 'preproduction';

    const app = koa();
    app.use(callLogger);
    app.use(function* error() {
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);

    config.env = undefined;
  });
});
