const { Router } = require("express");

const supplierRouter = require("./supplier.js");


const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", supplierRouter);


module.exports = router;
