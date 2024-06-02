const tableService = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  TableService,
} = require('../../db');

tableService.use(express.json());
tableService.use(cors());
tableService.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadTableService = async (commerceId) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await TableService.create({
      type: 'Mesa',
      detail: 'Servicio de mesa',
      cost: 0,
      validity: '2030-12-31',
      commerceId: Number(commerceId),

    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadTableService,
};
