// Inpired by: https://github.com/nswbmw/koa-version
// Main differences:
// - relies on this.version, which can be set however we want. 

const koa = require('koa');
const compose = require('koa-compose');

const versions = {};

module.exports = function version(version, route, app) {
  const _app = koa();

  route(_app);

  versions[version] = _app.middleware;

  return function* (upstream) {
    if (this.version !== version) {
      return yield* upstream;
    }

    const downstream = compose(versions[version]);
    yield* downstream.call(this, function *() {
      yield* upstream;
    }.call(this));
  }
}
