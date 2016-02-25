const should = require('should');
const supertest = require('supertest');

const koa = require('koa');

const errorHandler = require('../../middleware/errorHandler.js');
const notFound = require('../../middleware/notFound.js');

describe('Middleware - notFound', () => {
  it('should log the query', function* test() {
    const app = new koa();
    app.use(errorHandler);
    app.use(notFound);

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .end(cb);

    should.exist(result.body);
  });
});

