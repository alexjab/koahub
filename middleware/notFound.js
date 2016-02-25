module.exports = function* notFound() {
  this.throw(404, { message: 'Page not found' });
};

