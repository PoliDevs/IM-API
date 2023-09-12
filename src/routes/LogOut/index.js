const { Router } = require('express');
const cors = require('cors');
const logoutEmployeeRouter = require('./logoutEmployee');
const logoutAccountRouter = require('./logoutAccount');

const router = Router();

router.use(cors());

router.use('/', logoutEmployeeRouter);
router.use('/', logoutAccountRouter);

module.exports = router;
