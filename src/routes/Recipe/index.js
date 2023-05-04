const { Router } = require("express");

const recipeRouter = require("./recipe.js");

const cors = require("cors");

const router = Router();

router.use(cors());

router.use("/", recipeRouter);

module.exports = router;
