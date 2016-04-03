'use strict';

const json = require('koa-json');

let config = require('../config');

module.exports = function jsonPrettifier() {
  let pretty = false;
  if (!config.env) {
    pretty = true;
  }

  return json({ pretty });
};
