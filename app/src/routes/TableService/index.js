const { Router } = require('express');
const cors = require('cors');
const tableServiceRouter = require('./tableservice');

const router = Router();

router.use(cors());

router.use('/', tableServiceRouter);

module.exports = router;
