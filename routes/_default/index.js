const url = require('url');

module.exports = {
  index
};

function* index() {
  this.body = {
    objects: url.resolve(this.app.context.config.baseUrl, '/objects')
  };
};
