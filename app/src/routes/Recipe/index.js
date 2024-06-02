const { Router } = require('express');
const cors = require('cors');
const recipeRouter = require('./recipe');

const router = Router();

router.use(cors());

router.use('/', recipeRouter);

module.exports = router;
