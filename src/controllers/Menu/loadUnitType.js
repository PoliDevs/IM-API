const unyt = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  UnitType,
} = require('../../db');

unyt.use(express.json());
unyt.use(cors());
unyt.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadUnitType = async (commerceId) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await UnitType.create({
      unit: 'unidad',
      detail: 'unidad',
      commerceId: Number(commerceId),

    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadUnitType,
};
