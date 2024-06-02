const { Router } = require('express');
const cors = require('cors');
const orderRouter = require('./order');

const router = Router();

router.use(cors());

router.use('/', orderRouter);

module.exports = router;
