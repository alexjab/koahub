'use strict';

const json = require('koa-json');

let pretty = false;

module.exports = function (app) {
  if (!app.context.config.env) {
    pretty = true;
  }

  return json({ pretty });
}
