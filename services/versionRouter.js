/* Inspired by: https://github.com/nswbmw/koa-version
 * Main differences:
 *  - it relies on this.version (which can be set
 *    however we want), and not on any specific header,
 *    query or param.
 *  - it does not use semver or anything like it,
 *    and does simple string equality. In the case of an
 *    API version, I fail to see the point of using
 *    semver, since you probably don't want to roll
 *    tons of different versions, at the risk of
 *    confusing your audience.
 * Here is how it works:
 * - the router is applied to a new, separate, "virtual" koa app,
 *   which chains all the middleware of the router when calling app.use
 *   (the router usually expects to get the main app as
 *   parameter but gets this valid new app instead),
 * - if the version does not match, we just keep going
 *   through the remaining middleware, usually other
 *   "versioned" routers,
 * - if the version matches, then we call all the middleware
 *   of the router (joined together in one method by
 *   compose), then we go back to going through the rest
 *   of the middleware.
 */

const koa = require('koa');
const compose = require('koa-compose');

const versions = {};

module.exports = function versionRouter(version, router) {
  const _app = koa();
  router(_app);
  versions[version] = compose(_app.middleware);

  return function* routeRequest(upstream) {
    if (this.version !== version) {
      return yield* upstream;
    }

    const downstream = versions[version];
    return yield* downstream.call(this, function* callUpstream() {
      yield* upstream;
    }.call(this));
  };
};
