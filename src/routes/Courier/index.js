const { Router } = require('express');
const cors = require('cors');
const courierRouter = require('./courier');
const courierTypeRouter = require('./courierType');

const router = Router();

router.use(cors());

router.use('/', courierRouter);
router.use('/', courierTypeRouter);

module.exports = router;
