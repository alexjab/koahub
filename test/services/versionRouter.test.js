const should = require('should');
const supertest = require('supertest');

const koa = require('koa');

const versionRouter = require('../../services/versionRouter.js');

describe('Services - versionRouter', () => {
  it('should use version v1', function* test() {
    function router1(app) {
      app.use(function*() {
        this.body = { version: 'v1' };
      });
    }
    function router2(app) {
      app.use(function*() {
        this.body = { version: 'v2' };
      });
    }
    const app = koa();
    app.use(function*(next) {
      this.version = 'v1';
      yield next;
    });
    app.use(versionRouter('v1', router1));
    app.use(versionRouter('v2', router2));

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('version', 'v1');
  });

  it('should use version v2', function* test() {
    function router1(app) {
      app.use(function*() {
        this.body = { version: 'v1' };
      });
    }
    function router2(app) {
      app.use(function*() {
        this.body = { version: 'v2' };
      });
    }
    const app = koa();
    app.use(function*(next) {
      this.version = 'v2';
      yield next;
    });
    app.use(versionRouter('v1', router1));
    app.use(versionRouter('v2', router2));

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('version', 'v2');
  });

  it('should go through top level middleware', function* test() {
    function router1(app) {
      app.use(function*() {
        this.body = { version: 'v1' };
      });
    }
    function router2(app) {
      app.use(function*(next) {
        yield next;
      });
    }
    const app = koa();
    app.use(function*(next) {
      this.version = 'v2';
      yield next;
    });
    app.use(versionRouter('v1', router1));
    app.use(versionRouter('v2', router2));
    app.use(function*() {
      this.body = { version: 'missed' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    result.body.should.have.property('version', 'missed');
  });
});
