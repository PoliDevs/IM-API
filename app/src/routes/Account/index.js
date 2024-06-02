const { Router } = require('express');
const cors = require('cors');
const accountRouter = require('./account');

const router = Router();

router.use(cors());

router.use('/', accountRouter);

module.exports = router;
