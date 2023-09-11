const { Router } = require('express');
const cors = require('cors');
const deliveryRouter = require('./delivery');

const router = Router();

router.use(cors());

router.use('/', deliveryRouter);

module.exports = router;
