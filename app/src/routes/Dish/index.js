const { Router } = require('express');
const cors = require('cors');
const dishRouter = require('./dish');
const dishTypeRouter = require('./dishType');

const router = Router();

router.use(cors());

router.use('/', dishRouter);
router.use('/', dishTypeRouter);

module.exports = router;
