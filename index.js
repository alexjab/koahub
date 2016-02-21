const koa = require('koa');
const router = require('koa-route');

const app = koa();

/* Context */
app.context.config = require('./config');

/* Standard middleware */
app.use(require('./middleware/json')(app));

/* Routes */
const objects = require('./routes/objects');

app.use(router.get('/objects', objects.all));
app.use(router.get('/objects/:id', objects.one));

/* Default routes */
const _default = require('./routes/_default');
app.use(router.get('/', _default.index));

app.listen(3000);

module.exports = app;
