// Inspired by: https://github.com/nswbmw/koa-version
// Main differences:
//  - it relies on this.version (which can be set
//    however we want), and not on any specific header,
//    query or param.
//  - it does not use semver or anything like it,
//    and does simple string equality. In the case of an
//    API version, I fail to see the point of using
//    semver, since you probably don't want to roll
//    tons of different versions, at the risk of
//    confusing your audience.

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
