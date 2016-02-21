'use strict';

const json = require('koa-json');

const config = require('../config');

let pretty = false;
if (!config.env) {
  pretty = true;
}

module.exports = json({ pretty });
