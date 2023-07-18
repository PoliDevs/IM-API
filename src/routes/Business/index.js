const { Router } = require("express");

const businessRouter = require("./business.js");
const businessTypeRouter = require("./businessType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", businessRouter);
router.use("/businessTsype", businessTypeRouter);

module.exports = router;


