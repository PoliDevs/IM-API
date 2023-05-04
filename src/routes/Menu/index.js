const { Router } = require("express");

const menuRouter = require("./menu.js");
const menuTypeRouter = require("./menuType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", menuRouter);
router.use("/type", menuTypeRouter);

module.exports = router;
