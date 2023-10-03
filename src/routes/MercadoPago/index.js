const { Router } = require('express');
const cors = require('cors');
const mercadoPagoRouter = require('./mercadopago');

const router = Router();

router.use(cors());

router.use('/', mercadoPagoRouter);

module.exports = router;
