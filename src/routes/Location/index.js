const { Router } = require('express');
const cors = require('cors');
const cityRouter = require('./city');
const stateRouter = require('./state');
const countryRouter = require('./country');

const router = Router();

router.use(cors());

router.use('/city', cityRouter);
router.use('/state', stateRouter);
router.use('/country', countryRouter);

module.exports = router;
