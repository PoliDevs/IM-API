const { Router } = require("express");

const posRouter = require("./pos.js");
const posTypeRouter = require("./posType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", posRouter);
router.use("/", posTypeRouter);

module.exports = router;
