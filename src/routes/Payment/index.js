const { Router } = require("express");

const paymentRouter = require("./payment.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", paymentRouter);

module.exports = router;
