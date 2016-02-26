const should = require('should');
const supertest = require('supertest');
const rewire = require('rewire');

const koa = require('koa');
const router = require('koa-route');

const versionHandler = require('../../middleware/versionHandler');

describe('Services - versionHandler', () => {
  it('should return v1 (no version specified)', function* test() {
    const app = new koa();
    app.use(versionHandler);
    app.use(function*() {
      this.body = { version: this.version };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('version', 'v1');
  });

  it('should return v2 (v2 specifed in the headers)', function* test() {
    const _versionHandler = rewire('../../middleware/versionHandler');
    _versionHandler.__set__('versions', {
      v1: 'v1',
      v2: 'v2'
    });

    const app = new koa();
    app.use(_versionHandler);
    app.use(function*() {
      this.body = { version: this.version };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .set('Accept', 'application/vnd.koahub.v2+json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('version', 'v2');
  });
});
