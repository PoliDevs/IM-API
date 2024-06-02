const { Router } = require('express');
const cors = require('cors');
const sectorRouter = require('./sector');

const router = Router();

router.use(cors());

router.use('/', sectorRouter);

module.exports = router;
