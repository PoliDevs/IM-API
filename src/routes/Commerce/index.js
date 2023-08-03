const { Router } = require('express');
const cors = require('cors');
const commerceRouter = require('./commerce');
const commerceFactsRouter = require('./commerceFact');

const router = Router();

router.use(cors());

router.use('/', commerceRouter);
router.use('/', commerceFactsRouter);

module.exports = router;
