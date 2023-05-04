const { Router } = require("express");

const employeeRouter = require("./employee.js");
const employeeTypeRouter = require("./employeeType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", employeeRouter);
router.use("/type", employeeTypeRouter);

module.exports = router;
