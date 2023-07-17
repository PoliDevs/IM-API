const { Router } = require("express");

const supplyRouter = require("./supply.js");
const supplyTypeRouter = require("./supplyType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", supplyRouter);
router.use("/supplyType", supplyTypeRouter);

module.exports = router;
