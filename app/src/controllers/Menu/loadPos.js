const pos = require('express').Router();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
  Pos,
} = require('../../db');

pos.use(express.json());
pos.use(cors());
pos.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadPos = async (commerceId, newSector, posTypeId, tableServiceId, commerceJSON) => {
  let newPos;
  try {
    // eslint-disable-next-line prefer-const
    let arrayPos = [];
    const { URL_QR } = process.env;
    const { mesas } = commerceJSON[0];

    let mesa = 0;
    for (let i = 0; i < Number(mesas); i += 1) {
      mesa = i + 1;
      const nuevoObjeto = {
        qrCode: `${URL_QR}/${commerceId}/${newSector}/${mesa}`,
        posTypeId: Number(posTypeId),
        capacity: 20,
        sectorId: Number(newSector),
        name: mesa,
        tableServiceId: Number(tableServiceId),
        detail: '',
      };
      arrayPos.push(nuevoObjeto);
    }

    newPos = await Pos.bulkCreate(arrayPos);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return newPos;
};

module.exports = {
  loadPos,
};
