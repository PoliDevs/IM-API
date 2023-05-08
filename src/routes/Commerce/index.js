const { Router } = require("express");

const commerceRouter = require("./commerce.js");
const commerceFactsRouter = require("./commerceFacts.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", commerceRouter);
router.use("/facts", commerceFactsRouter);

module.exports = router;
