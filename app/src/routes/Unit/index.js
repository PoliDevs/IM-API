const { Router } = require('express');
const cors = require('cors');
const unitRouter = require('./unit');

const router = Router();

router.use(cors());

router.use('/', unitRouter);

module.exports = router;
