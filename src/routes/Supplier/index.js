const { Router } = require('express');
const cors = require('cors');
const supplierRouter = require('./supplier');

const router = Router();

router.use(cors());

router.use('/', supplierRouter);

module.exports = router;
