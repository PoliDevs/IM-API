const { Router } = require("express");

const productRouter = require("./product.js");
const productTypeRouter = require("./productType.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", productRouter);
router.use("/type", productTypeRouter);

module.exports = router;
