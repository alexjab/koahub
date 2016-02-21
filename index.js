const koa = require('koa');
const router = require('koa-route');

const app = koa();

/* Some middleware */
app.use(require('./middleware/json'));
app.use(require('./middleware/version'));

/* Routes */
require('./routes')(app);

app.listen(3000);

module.exports = app;
