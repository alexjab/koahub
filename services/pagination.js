const compose = require('koa-compose');

module.exports = function*(next) {
  this.pagination = {
    page: this.query.page || 1,
    perPage: this.query.per_page || 25
  };

  yield next;
};
