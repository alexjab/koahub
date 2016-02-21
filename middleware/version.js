'use strict';

const config = require('../config');

const versionRegex = new RegExp(`application\\/vnd.${config.vendor.names.snake}.(v\\d+)\\+json`);
const mediaHeader = `X-${config.vendor.names.camel}-Media-Type`;

module.exports = function*(next) {
  let version;

  try {
    version = this.headers.accept.match(versionRegex)[1];
  } catch(e) {
  } finally {
    version = version || config.versions.default;
  }

  this.version = version;

  yield next;

  this.set(mediaHeader, `koahub.${version}; format=json`);
};
