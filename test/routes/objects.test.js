const should = require('should');
const supertest = require('supertest');

const app = require('../../index.js');

const request = supertest.agent(app.listen())

describe('Objects API', function() {
  const objectsUrl = '/objects';

  describe('GET /objects - Get all objects', function() {
    it('should get all objects', function* () {
      const result = yield cb =>
        request
          .get(objectsUrl)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end(cb);

      should.exist(result.body);
    });

    it('should get one object', function* () {
      const result = yield cb =>
        request
          .get(objectsUrl + '/1')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end(cb);

      should.exist(result.body);
    });
  });
});
