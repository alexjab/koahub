'use strict';

const koa = require('koa');
const router = require('koa-route');

const app = koa();

/* Some middleware */
app.use(require('./middleware/json'));
app.use(require('./middleware/version'));
app.use(require('./middleware/callLogger'));
app.use(require('./middleware/errorHandler'));

/* Routes */
require('./routes')(app);

app.use(require('./middleware/notFound'));

app.listen(3000);

module.exports = app;
