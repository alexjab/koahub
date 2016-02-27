const should = require('should');
const supertest = require('supertest');

const app = require('../../../index.js');

const request = supertest.agent(app.listen());

describe('_default API', () => {
  describe('GET / - Get all basic routes', () => {
    it('should get all objects', function* test() {
      const result = yield cb => request
        .get('/')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .end(cb);

      should.exist(result.body);
      result.body.should.have.property('objects');
    });
  });
});

