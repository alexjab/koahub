'use strict';

module.exports = function*(next) {
  let error;

  try {
    yield next;
  } catch (err) {
    error = err;
  }

  if (error) {
    const message = error.message || 'Internal Server Error';
    const details = error.details || [];
    const status = error.status || 500;

    this.status = status;
    this.body = { message, details };
  }
};
