const { Router } = require("express");

const dishRouter = require("./dish.js");
const dishTypeRouter = require("./dishType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", dishRouter);
router.use("/type", dishTypeRouter);

module.exports = router;
