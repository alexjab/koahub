'use strict';

const config = require('../config');

module.exports = function* errorHandler(next) {
  let error;

  try {
    yield next;
  } catch (err) {
    error = err;
  }

  if (error) {
    console.log(error.stack);

    // If we are in a production environment, and the error
    // is an unknown error (i.e., not manually thrown), then
    // we need to hide the information.
    if (config.env === 'production' && !error.status) {
      error.message = 'Internal Server Error';
    }

    const message = error.message || 'Internal Server Error';
    const details = error.details || [];
    const status = error.status || 500;

    this.status = status;
    this.body = { message, details };
  }
};
