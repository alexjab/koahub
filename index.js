'use strict';

const koa = require('koa');

const app = koa();

/* Some middleware */
app.use(require('./middleware/jsonPrettifier')());
app.use(require('./middleware/versionHandler'));
app.use(require('./middleware/callLogger'));
app.use(require('./middleware/errorHandler'));
app.use(require('./middleware/pagination'));

/* Routes */
require('./routes')(app);

app.use(require('./middleware/notFound'));

app.listen(3000);

module.exports = app;
