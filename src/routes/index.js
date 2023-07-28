const { Router } = require("express");

const accountRouter = require("./Account");
const additionalRouter = require("./Additional");
const businessRouter = require("./Business");
const businessTypeRouter = require("./Business/businessType");
const commerceRouter = require("./Commerce");
const dishRouter = require("./Dish");
const dishTypeRouter = require("./Dish/dishType");
const franchiseRouter = require("./Franchise");
const franchiseTypeRouter = require("./Franchise/franchiseType");
const locationRouter = require("./Location");
const menuRouter = require("./Menu");
const orderRouter = require("./Order");
const paymentRouter = require("./Payment");
const posRouter = require("./Pos");
const posTypeRouter = require("./Pos/posType");
const productRouter = require("./Product");
const recipeRouter = require("./Recipe");
const supplyRouter = require("./Supply");
const tableServiceRouter = require("./TableService");
const employeeRouter = require("./Employee");
const employeeTypeRouter = require("./Employee/employeeType")

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/account", accountRouter);
router.use("/additional", additionalRouter);
router.use("/business", businessRouter);
router.use("/businessType", businessTypeRouter);
router.use("/commerce", commerceRouter);
router.use("/dish", dishRouter);
router.use("/employee", employeeRouter);
router.use("/employeeType", employeeTypeRouter);
router.use("/franchiseType", franchiseTypeRouter);
router.use("/franchise", franchiseRouter);
router.use("/location", locationRouter);
router.use("/menu", menuRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/pos", posRouter);
router.use("/posType", posTypeRouter);
router.use("/product", productRouter);
router.use("/recipe", recipeRouter);
router.use("/supply", supplyRouter);
router.use("/tableService", tableServiceRouter);

module.exports = router;
