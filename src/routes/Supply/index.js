const { Router } = require('express');
const cors = require('cors');
const supplyRouter = require('./supply');
const supplyTypeRouter = require('./supplyType');

const router = Router();

router.use(cors());

router.use('/', supplyRouter);
router.use('/supplyType', supplyTypeRouter);

module.exports = router;
