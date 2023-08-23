const { Router } = require('express');
const cors = require('cors');
const commerceRouter = require('./commerce');
const commerceFactsRouter = require('./commerceFact');
const commercialPlanRouter = require('./commercialPlan');

const router = Router();

router.use(cors());

router.use('/', commerceRouter);
router.use('/', commerceFactsRouter);
router.use('/', commercialPlanRouter);

module.exports = router;
