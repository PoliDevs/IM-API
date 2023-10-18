const payment = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Payment,
} = require('../../db');

payment.use(express.json());
payment.use(cors());
payment.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadPayment = async (commerceId) => {
  let created;
  try {
    const payments = {
      type: ['efectivo', 'mercadopago'],
      detail: ['pago en efectivo', 'mercadopago'],
    };
    // eslint-disable-next-line no-unused-vars
    await Promise.all(payments.type.map(async (element, index) => {
      created = await Payment.create({
        type: element,
        detail: payments.detail[index],
        commerceId: Number(commerceId),
      });
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadPayment,
};
