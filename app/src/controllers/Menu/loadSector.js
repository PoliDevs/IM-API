const sector = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  Sector,
} = require('../../db');

sector.use(express.json());
sector.use(cors());
sector.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadSector = async (commerceId, newTableService) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await Sector.create({
      name: 'Ventas',
      detail: 'Ventas',
      commerceId: Number(commerceId),
      tableServiceId: Number(newTableService),

    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadSector,
};
