const mepa = require('express').Router();
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const mercadopago = require('mercadopago');
// const { Order } = require('../../db');

mepa.use(express.json());
mepa.use(cors());
mepa.use(
  express.urlencoded({
    extended: true,
  }),
);
const {
  ACCESS_TOKEN_MP, SUCCESS, FAILURE, NODE_ENV,
} = process.env;
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

mepa.post('/create-order', (req, res) => {
  const {
    order, commerce,
  } = req.body;
  const preference = {
    items: [
      {
        title: commerce.commerce,
        unit_price: Number(order.paid),
        currency_id: 'ARS',
        quantity: 1,
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
      },
    ],
    payer: {
      name: order.accountname || order.name,
      email: order.accountemail || order.googleemail,
    },
    back_urls: {
      success: SUCCESS,
      failure: FAILURE,
      pending: '',
    },
    auto_return: 'approved',
    notification_url: '',
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const preferenceId = response.body.id;
      const isDevelopment = NODE_ENV === 'development';
      const baseUrl = isDevelopment
        ? 'https://sandbox.mercadopago.com.ar'
        : 'https://www.mercadopago.com.ar';
      // const sandboxPaymentURL = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
      const paymentURL = `${baseUrl}/checkout/v1/redirect?preference_id=${preferenceId}`;

      res.json({ paymentURL });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'Error al crear el pago' });
    });
});

mepa.get('/success', async (req, res) => {
  // eslint-disable-next-line indent, no-console
  console.log('Pago exitoso:');
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
    ExternalReference: req.query.external_reference,
    PaymentType: req.query.payment_type,
  });
});

mepa.get('/failure', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Pago fallido:', req.body);
  res.send('Pago fallido');
});

mepa.get('/notification', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Notificación de pago:', req.body);
  res.send('Notificación de pago');
});

// eslint-disable-next-line no-unused-vars
mepa.get('/favicon.ico', (req, res) => {
  // No hacer nada en respuesta a la solicitud de favicon.ico
});

mepa.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = mepa;
