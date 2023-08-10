const { Router } = require('express');
const cors = require('cors');
const additionalRouter = require('./additional');

const router = Router();

router.use(cors());

router.use('/', additionalRouter);

module.exports = router;
