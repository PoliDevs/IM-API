const { Router } = require('express');
const cors = require('cors');
const paymentRouter = require('./payment');

const router = Router();

router.use(cors());

router.use('/', paymentRouter);

module.exports = router;
