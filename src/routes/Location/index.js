const { Router } = require("express");

const cityRouter = require("./city.js");
const stateRouter = require("./state.js");
const countryRouter = require("./country.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/city", cityRouter);
router.use("/state", stateRouter);
router.use("/country", countryRouter);

module.exports = router;
