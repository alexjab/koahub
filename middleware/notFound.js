module.exports = function*(next) {
  this.throw(404, { message: 'Page not found' });
}

