const posType = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  PosType,
} = require('../../db');

posType.use(express.json());
posType.use(cors());
posType.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadPosType = async (commerceId) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await PosType.create({
      type: 'Mesa',
      detail: 'Mesa',
      commerceId: Number(commerceId),

    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return created.id;
};

module.exports = {
  loadPosType,
};
