const commerceFact = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  CommerceFact,
} = require('../../db');

commerceFact.use(express.json());
commerceFact.use(cors());
commerceFact.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadCommerceFact = async (commerceJSON, commerceId) => {
  let created;
  try {
    let type = '';
    if (commerceJSON[0].tipoDeComida) {
      type = commerceJSON[0].tipoDeComida.toLowerCase();
    } else {
      type = '-';
    }
    // eslint-disable-next-line no-unused-vars
    created = await CommerceFact.create({
      type,
      detail: '',
      commerceId: Number(commerceId),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadCommerceFact,
};
