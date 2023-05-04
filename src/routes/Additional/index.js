const { Router } = require("express");

const additionalRouter = require("./additional.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", additionalRouter);

module.exports = router;
