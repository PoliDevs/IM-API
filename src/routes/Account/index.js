const { Router } = require("express");

const accountRouter = require("./account.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", accountRouter);

module.exports = router;
