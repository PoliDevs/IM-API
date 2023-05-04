const { Router } = require("express");

const supplyRouter = require("./supply.js");
const suppliersRouter = require("./suppliers.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", supplyRouter);
router.use("/suppliers", suppliersRouter);

module.exports = router;
