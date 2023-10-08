const commerce = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Commerce,
} = require('../../db');

commerce.use(express.json());
commerce.use(cors());
commerce.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadCommerce = async (commerceJSON) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await Commerce.create({
      name: commerceJSON[0].name.toLowerCase(),
      neighborhood: commerceJSON[0].neighborhood,
      address: commerceJSON[0].address,
      workSchedule: commerceJSON[0].workSchedule,
      email: commerceJSON[0].email,
      phono: commerceJSON[0].phono,
      franchiseId: null,
      commercialPlanId: 2,
      businessId: null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadCommerce,
};
