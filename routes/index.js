const router = require('koa-route');

const objects = require('./objects');

const _default = require('./_default');

module.exports = function(app) {
  app.use(router.get('/objects', objects.getAll));
  app.use(router.get('/objects/:id', objects.getOne));

  app.use(router.get('/', _default.index));
};
