const { Router } = require('express');
const cors = require('cors');
const menuRouter = require('./menu');
const menuTypeRouter = require('./menuType');

const router = Router();

router.use(cors());

router.use('/', menuRouter);
router.use('/', menuTypeRouter);

module.exports = router;
