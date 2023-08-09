const { Router } = require('express');
const cors = require('cors');
const bankRouter = require('./bank');

const router = Router();

router.use(cors());

router.use('/', bankRouter);

module.exports = router;
