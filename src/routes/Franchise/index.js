const { Router } = require("express");

const franchiseRouter = require("./franchise.js");
const franchiseTypeRouter = require("./franchiseType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", franchiseRouter);
router.use("/", franchiseTypeRouter);

module.exports = router;
