const { Router } = require('express');
const cors = require('cors');
const employeeRouter = require('./employee');
const employeeTypeRouter = require('./employeeType');

const router = Router();

router.use(cors());

router.use('/', employeeRouter);
router.use('/', employeeTypeRouter);

module.exports = router;
