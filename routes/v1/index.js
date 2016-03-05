const router = require('koa-route');

const pagination = require('../../services/pagination');

const objects = require('./objects/controller');
const _default = require('./_default/controller');

module.exports = function v1(app) {
  app.use(router.get('/objects', pagination(objects.getAll)));
  app.use(router.get('/objects/:id', objects.getOne));

  app.use(router.get('/', _default.index));
};
