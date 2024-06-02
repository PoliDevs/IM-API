const employeeType = require('express').Router();
const express = require('express');
const cors = require('cors');
const {
  EmployeeType,
} = require('../../db');

employeeType.use(express.json());
employeeType.use(cors());
employeeType.use(
  express.urlencoded({
    extended: true,
  }),
);

const loadEmployeeType = async (commerceId) => {
  let created;
  try {
    // eslint-disable-next-line no-unused-vars
    created = await EmployeeType.create({
      type: 'Employeer',
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
  loadEmployeeType,
};
