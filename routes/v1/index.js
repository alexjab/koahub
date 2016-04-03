const objects = require('./objects/');
const _default = require('./_default/');

module.exports = function v1(app) {
  app.use(objects.routes());
  app.use(_default.routes());
};
