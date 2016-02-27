const should = require('should');
const supertest = require('supertest');

const koa = require('koa');

const config = require('../../config');

const errorHandler = require('../../middleware/errorHandler.js');

describe('Middleware - errorHandler', () => {
  it('should return a formatted error 500 (original error message)', function* test() {
    const app = koa();
    app.use(errorHandler);
    app.use(function* error() {
      this.throw(400, 'Foo Bar');
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(400)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('message', 'Foo Bar');
  });

  it('should return a formatted error 500 (no-instructive error message)', function* test() {
    const originalEnv = config.env;
    config.env = 'production';

    const app = koa();
    app.use(errorHandler);
    app.use(function* error() {
      throw new Error('Foo Bar');
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(500)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('message', 'Internal Server Error');

    config.env = originalEnv;
  });

  it('should return a formatted error 500 (no-instructive error message)', function* test() {
    const app = koa();
    app.use(errorHandler);
    app.use(function* error() {
      throw new Error();
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(500)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('message', 'Internal Server Error');
  });
});

