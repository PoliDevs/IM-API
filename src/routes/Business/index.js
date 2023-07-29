const { Router } = require('express');
const cors = require('cors');
const businessRouter = require('./business');
const businessTypeRouter = require('./businessType');

const router = Router();

router.use(cors());

router.use('/', businessRouter);
router.use('/', businessTypeRouter);

module.exports = router;
