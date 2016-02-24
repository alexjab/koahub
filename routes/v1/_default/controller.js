const url = require('url');

const config = require('../../../config');

module.exports.index = function* index(next) {
  this.body = {
    objects: url.resolve(config.urls.base, '/objects')
  };
};
