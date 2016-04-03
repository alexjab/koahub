const Router = require('koa-router');
const router = new Router();

const pagination = require('../../../services/pagination');

const controller = require('./controller');

router.get('/objects', pagination, controller.getAll);
router.get('/objects/:id', controller.getOne);

module.exports = router;
