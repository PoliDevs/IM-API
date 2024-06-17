const mepa = require('express').Router();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const mercadopago = require('mercadopago');
const { Payment } = require('../../db');
// const { Order } = require('../../db');

mepa.use(express.json());
mepa.use(cors());
mepa.use(
  express.urlencoded({
    extended: true,
  })
);
// const {
//   ACCESS_TOKEN_MP, SUCCESS, FAILURE, NODE_ENV,
// } = process.env;
const { SUCCESS, FAILURE, NODE_ENV } = process.env;
// mercadopago.configure({
//   access_token: ACCESS_TOKEN_MP,
// });

mepa.post('/create-order', async (req, res) => {
  const { order, commerce, commerceId } = req.body;

  try {
    const payment = await Payment.findOne({
      where: {
        commerceId,
        type: 'mercadopago',
      },
    });
    console.log('payment', payment);
    if (!payment) {
      return res
        .status(401)
        .json({ error: 'Payment information not found for this commerce' });
    }
    const accessToken = payment.accesToken ? payment.accesToken : null;
    // const accessToken = bcrypt.compareSync(
    //   payment.accesToken,
    //   payment.accesToken,
    // )
    //   ? payment.accesToken
    //   : null;

    if (!accessToken) {
      return res.status(400).json({ error: 'Invalid access Token' });
    }

    console.log('accesstoken', accessToken);

    mercadopago.configure({
      access_token: accessToken,
    });

    const preference = {
      items: [
        {
          title: commerce.commerce,
          unit_price: Number(order.paid),
          currency_id: 'ARS',
          quantity: 1,
          picture_url:
            'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
          // appication_fee: 2.5,
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

    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    const isDevelopment = NODE_ENV === 'development';
    const baseUrl = isDevelopment
      ? 'https://sandbox.mercadopago.com.ar'
      : 'https://www.mercadopago.com.ar';
    const paymentURL = `${baseUrl}/checkout/v1/redirect?preference_id=${preferenceId}`;

    return res.json({ paymentURL });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error creating the payment' });
  }
});

// mepa.post('/create-order', (req, res) => {
//   const {
//     order, commerce,
//   } = req.body;
//   const preference = {
//     items: [
//       {
//         title: commerce.commerce,
//         unit_price: Number(order.paid),
//         currency_id: 'ARS',
//         quantity: 1,
//         picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
//         // appication_fee: 2.5,
//       },
//     ],
//     payer: {
//       name: order.accountname || order.name,
//       email: order.accountemail || order.googleemail,
//     },
//     back_urls: {
//       success: SUCCESS,
//       failure: FAILURE,
//       pending: '',
//     },
//     auto_return: 'approved',
//     notification_url: '',
//   };

//   mercadopago.preferences
//     .create(preference)
//     .then((response) => {
//       const preferenceId = response.body.id;
//       const isDevelopment = NODE_ENV === 'development';
//       const baseUrl = isDevelopment
//         ? 'https://sandbox.mercadopago.com.ar'
//         : 'https://www.mercadopago.com.ar';
//       // const sandboxPaymentURL = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
//       const paymentURL = `${baseUrl}/checkout/v1/redirect?preference_id=${preferenceId}`;

//       res.json({ paymentURL });
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.log(error);
//       res.status(500).json({ error: 'Error al crear el pago' });
//     });
// });

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
