'use strict';

const debug = require('debug')('koahub');

const config = require('../config');

let versions = {};
config.versions.all.forEach(ver => { versions[ver] = ver; });

const versionRegex = new RegExp(`application\\/vnd.${config.vendor.names.snake}.(v\\d+)\\+json`);
const mediaHeader = `X-${config.vendor.names.camel}-Media-Type`;

module.exports = function* versionHandler(next) {
  let version;

  try {
    version = this.headers.accept.match(versionRegex)[1];
  } catch (e) {
    debug(`No version found in Accept header, defaulting to ${config.versions.current}`);
  } finally {
    version = versions[version] || config.versions.current;
  }

  this.version = version;

  yield next;

  this.set(mediaHeader, `koahub.${version}; format=json`);
};
