const { Router } = require("express");

const commerceRouter = require("./commerce.js");
const commerceFactsRouter = require("./commerceFact.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", commerceRouter);
router.use("/fact", commerceFactsRouter);

module.exports = router;
