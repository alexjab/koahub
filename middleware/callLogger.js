const config = require('../config');

module.exports = function* callLogger(next) {
  if (!config.env) {
    const start = Date.now();
    yield next;
    console.log('%s %s %s %sms', this.method, this.url, this.status, Date.now() - start);
  } else {
    yield next;
  }
};
