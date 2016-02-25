const version = require('../services/versionRouter');

const v1 = require('./v1');

module.exports = function routes(app) {
  app.use(version('v1', v1));
};
