const deliveries = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Delivery,
} = require('../../db');

deliveries.use(express.json());
deliveries.use(cors());
deliveries.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadDelivery = async (commerceId) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await Delivery.create({
      name: 'pedido ya',
      detail: 'peya',
      company: 'peya sa',
      commerceId: Number(commerceId),

    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadDelivery,
};
