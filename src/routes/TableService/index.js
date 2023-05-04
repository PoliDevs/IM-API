const { Router } = require("express");

const tableServiceRouter = require("./tableService.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", tableServiceRouter);

module.exports = router;
