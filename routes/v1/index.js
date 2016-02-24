const router = require('koa-route');

const objects = require('./objects/controller');
const _default = require('./_default/controller');

module.exports = function(app) {
  app.use(router.get('/objects', objects.getAll));
  app.use(router.get('/objects/:id', objects.getOne));

  app.use(router.get('/', _default.index));
};

