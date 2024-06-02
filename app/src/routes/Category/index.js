const { Router } = require('express');
const cors = require('cors');
const categoryRouter = require('./category');

const router = Router();

router.use(cors());

router.use('/', categoryRouter);

module.exports = router;
