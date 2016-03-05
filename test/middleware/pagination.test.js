const should = require('should');
const supertest = require('supertest');

const koa = require('koa');

const pagination = require('../../middleware/pagination.js');

describe('Middleware - pagination', () => {
  it('should set no Link header (pagination not enable for this route)', function* test() {
    const app = koa();
    app.use(pagination);
    app.use(function* error() {
      delete this.pagination;
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    should.not.exist(result.header.link);
  });

  it('should set the "first" page in the Link header (pagination instanciated as an empty object)', function* test() {
    const app = koa();
    app.use(pagination);
    app.use(function* error() {
      this.pagination = {};
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    should.exist(result.header.link);
    result.header.link.should.match(/<.*page=1.*>; rel="first"/);
  });

  it('should set the "first" page only to the Link header (pagination with "page" parameter = 1)', function* test() {
    const app = koa();
    app.use(pagination);
    app.use(function* error() {
      this.pagination = {
        page: 1
      };
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    should.exist(result.header.link);
    result.header.link.should.match(/<.*page=1.*>; rel="first"/);
    result.header.link.should.not.match(/<.*>; rel="previous"/);
  });

  it('should append the "first" and "previous" page to the Link header (pagination with "page" parameter = 2)', function* test() {
    const app = koa();
    app.use(pagination);
    app.use(function* error() {
      this.pagination = {
        page: 2
      };
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    should.exist(result.header.link);
    result.header.link.should.match(/<.*page=1.*>; rel="first"/);
    result.header.link.should.match(/<.*page=1.*>; rel="previous"/);
  });

  it('should append the "first" and "previous" page to the Link header (pagination with (page, perPage, total) = (5, 10, 212))', function* test() {
    const page = 5;
    const perPage = 10;
    const total = Math.random() * (198 - 66) + 66;

    const app = koa();
    app.use(pagination);
    app.use(function* error() {
      this.pagination = {
        page,
        perPage,
        total
      };
      this.body = { foo: 'bar' };
    });

    const request = supertest.agent(app.listen());

    const result = yield cb => request
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end(cb);

    should.exist(result.body);
    should.exist(result.header.link);
    result.header.link.should.match(/<.*page=1.*>; rel="first"/);
    result.header.link.should.match(new RegExp(`<.*page=${page - 1}.*>; rel="previous"`));
    result.header.link.should.match(new RegExp(`<.*page=${page + 1}.*>; rel="next"`));
    result.header.link.should.match(new RegExp(`<.*page=${Math.ceil(perPage / total)}.*>; rel="last"`));
  });
});

