const { Router } = require('express');
const cors = require('cors');
const posRouter = require('./pos');
const posTypeRouter = require('./posType');

const router = Router();

router.use(cors());

router.use('/', posRouter);
router.use('/', posTypeRouter);

module.exports = router;
