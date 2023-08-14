const { Router } = require('express');
const cors = require('cors');
const productRouter = require('./product');
const productTypeRouter = require('./productType');

const router = Router();

router.use(cors());

router.use('/', productRouter);
router.use('/', productTypeRouter);

module.exports = router;
