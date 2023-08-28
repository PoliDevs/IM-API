const { Router } = require('express');
const cors = require('cors');
const loginEmployeeRouter = require('./loginEmployee');
const loginAccountRouter = require('./loginAccount');

const router = Router();

router.use(cors());

router.use('/', loginEmployeeRouter);
router.use('/', loginAccountRouter);

module.exports = router;
