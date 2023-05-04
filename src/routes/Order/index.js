const { Router } = require("express");

const orderRouter = require("./order.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", orderRouter);

module.exports = router;
