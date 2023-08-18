const { Router } = require('express');
const cors = require('cors');
const franchiseRouter = require('./franchise');
const franchiseTypeRouter = require('./franchiseType');

const router = Router();

router.use(cors());

router.use('/', franchiseRouter);
router.use('/', franchiseTypeRouter);

module.exports = router;
